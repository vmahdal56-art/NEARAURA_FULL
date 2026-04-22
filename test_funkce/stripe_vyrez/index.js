const {onRequest} = require("firebase-functions/v2/https");
const {onDocumentCreated} = require("firebase-functions/v2/firestore");
const {onDocumentUpdated} = require("firebase-functions/v2/firestore");
const {onSchedule} = require("firebase-functions/v2/scheduler");
const {onCall} = require("firebase-functions/v2/https");

const admin = require("firebase-admin");
const { Faker, en } = require("@faker-js/faker");
const { Storage } = require("@google-cloud/storage");
const { ImageAnnotatorClient } = require('@google-cloud/vision');
const sharp = require("sharp");
const path = require("path");
const os = require("os");
const fs = require("fs");
const busboy = require("busboy");
const axios = require('axios');
const nodemailer = require('nodemailer');

admin.initializeApp();

const db = admin.firestore();
const storage = new Storage();
const visionClient = new ImageAnnotatorClient();
const faker = new Faker({ locale: [en] });

const BUCKET_NAME = "huddleme.appspot.com";
const NUM_PLACEHOLDERS_TO_CREATE = 15;
const SCATTER_RADIUS_DEGREES = 0.1;
const REAL_USER_THRESHOLD_FOR_CLEANUP = 20000;

// --- E2EE Key Management Placeholders ---
exports.publishPreKeyBundle = onCall({ region: "us-central1" }, async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "You must be logged in.");
  }
  const uid = context.auth.uid;
  const bundle = data.bundle;
  await db.collection("preKeyBundles").doc(uid).set({ bundle });
  return { success: true };
});

exports.getPreKeyBundle = onCall({ region: "us-central1" }, async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "You must be logged in.");
  }
  const userId = data.userId;
  const doc = await db.collection("preKeyBundles").doc(userId).get();
  if (!doc.exists) {
    throw new functions.https.HttpsError("not-found", "Pre-key bundle not found for this user.");
  }
  return { bundle: doc.data().bundle };
});

// --- File Upload ---
exports.uploadProfilePhoto = onRequest({ region: "us-central1" }, async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "POST");
  res.set("Access-Control-Allow-Headers", "Content-Type, X-Firebase-AppCheck");

  const appCheckToken = req.header("X-Firebase-AppCheck");
  if (!appCheckToken) {
    res.status(401).send("Unauthorized: No App Check token provided.");
    return;
  }

  try {
    await admin.appCheck().verifyToken(appCheckToken);
  } catch (err) {
    res.status(401).send("Unauthorized: Invalid App Check token.");
    return;
  }

  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const bb = busboy({ headers: req.headers });
  const tmpdir = os.tmpdir();
  let uploadData = null;
  const fields = {};

  bb.on('field', (fieldname, val) => { fields[fieldname] = val; });

  bb.on("file", (fieldname, file, { filename, mimeType }) => {
    const filepath = path.join(tmpdir, filename);
    const writeStream = fs.createWriteStream(filepath);
    file.pipe(writeStream);
    file.on("end", () => { uploadData = { filepath, mimeType }; });
  });

  bb.on("finish", async () => {
    if (!uploadData) { return res.status(400).send("No file uploaded."); }
    const bucket = storage.bucket(BUCKET_NAME);
    const { filepath, mimeType } = uploadData;
    const destination = `temp_uploads/${Date.now()}_${path.basename(filepath)}`;

    try {
      const compressedImageBuffer = await sharp(filepath).resize({ width: 800 }).jpeg({ quality: 80 }).toBuffer();
      const fileRef = bucket.file(destination);
      await fileRef.save(compressedImageBuffer, { metadata: { contentType: mimeType } });
      fs.unlinkSync(filepath);
      return res.status(200).json({ filePath: destination });
    } catch (error) {
      console.error("Upload failed: ", error);
      if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
      return res.status(500).send("Upload failed.");
    }
  });

  bb.end(req.rawBody);
});

// --- AI and User Management ---
exports.verifyPhotosWithAI = onCall({ region: "us-central1" }, async (data, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError("unauthenticated", "You must be logged in.");
    }
    const userId = context.auth.uid;
    const { filePath } = data;

    if (!filePath) {
        throw new functions.https.HttpsError("invalid-argument", "File path must be provided.");
    }

    const bucket = storage.bucket(BUCKET_NAME);
    const tempFile = bucket.file(filePath);

    try {
        const [result] = await visionClient.annotateImage({
            image: { source: { imageUri: `gs://${BUCKET_NAME}/${filePath}` } },
            features: [{ type: 'FACE_DETECTION' }, { type: 'SAFE_SEARCH_DETECTION' }],
        });

        const faceAnnotations = result.faceAnnotations;
        const safeSearch = result.safeSearchAnnotation;

        const isSafe = safeSearch.adult !== 'VERY_LIKELY' && safeSearch.racy !== 'VERY_LIKELY' && safeSearch.violence !== 'VERY_LIKELY';
        const hasExactlyOneFace = faceAnnotations.length === 1;

        if (isSafe && hasExactlyOneFace) {
            const newDestination = `profile_images/${userId}/${path.basename(filePath)}`;
            await tempFile.move(newDestination);
            const publicFile = bucket.file(newDestination);
            await publicFile.makePublic();
            const publicUrl = publicFile.publicUrl();

            await db.collection("users").doc(userId).update({
                isAiVerified: true,
                profilePhotoUrls: { '0': publicUrl }
            });
            return { success: true, message: "AI verification successful!", imageUrl: publicUrl };
        } else {
            await tempFile.delete();
            let reason = "Photo does not meet community guidelines.";
            if (!hasExactlyOneFace) reason = "Photo must contain exactly one face.";
            if (!isSafe) reason = "Photo contains inappropriate content.";
            throw new functions.https.HttpsError("invalid-argument", reason);
        }
    } catch (error) {
        console.error(`AI verification failed for user: ${userId}`, error);
        // Attempt to delete the temp file on error as well
        try { await tempFile.delete(); } catch (e) { console.error("Failed to delete temp file on error", e); }
        throw new functions.https.HttpsError("internal", "Could not process image verification.");
    }
});


exports.getPlaceholderUsers = onRequest({ region: "us-central1" }, async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "Content-Type, X-Firebase-AppCheck");

  const appCheckToken = req.header("X-Firebase-AppCheck");
  if (!appCheckToken) {
    res.status(401).send("Unauthorized: No App Check token provided.");
    return;
  }

  try {
    await admin.appCheck().verifyToken(appCheckToken);
  } catch (err) {
    res.status(401).send("Unauthorized: Invalid App Check token.");
    return;
  }

  try {
    const usersSnapshot = await db.collection("users").where("isPlaceholder", "===", true).limit(20).get();
    const userList = usersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return res.status(200).json(userList);
  } catch (error) {
    console.error("Failed to fetch placeholder users:", error);
    return res.status(500).send("Failed to fetch users.");
  }
});

// --- Placeholder User Generation ---
exports.populateNearbyUsers = onDocumentCreated({ document: "user_locations/{userId}", region: "us-central1" }, async (event) => {
    const snap = event.data;
    if (!snap) {
        console.log("No data associated with the event");
        return;
    }
    const userId = event.params.userId;
    const userDoc = await db.collection("users").doc(userId).get();
    if (userDoc.exists && userDoc.data().isPlaceholder === true) return null;

    const centerPoint = snap.data().g.geopoint;
    const promises = [];
    const deletionDate = new Date();
    deletionDate.setDate(deletionDate.getDate() + 90);

    for (let i = 0; i < NUM_PLACEHOLDERS_TO_CREATE; i++) {
        const placeholderId = `placeholder_${userId}_${i}`;
        const lat = centerPoint.latitude + (Math.random() - 0.5) * 2 * SCATTER_RADIUS_DEGREES;
        const lon = centerPoint.longitude + (Math.random() - 0.5) * 2 * SCATTER_RADIUS_DEGREES;
        const newUser = {
            uid: placeholderId,
            name: faker.person.firstName(),
            bio: faker.lorem.sentence(),
            gender: faker.person.sex(),
            birthDate: faker.date.birthdate({ min: 18, max: 40, mode: "age" }).toISOString().split("T")[0],
            profilePhotoUrls: { "0": faker.image.avatar() },
            isPlaceholder: true,
            deleteAt: admin.firestore.Timestamp.fromDate(deletionDate),
            currentIntent: faker.helpers.arrayElement(["DATING", "FRIENDS", "COMMUNITY"]),
        };
        const locationData = { g: { geopoint: new admin.firestore.GeoPoint(lat, lon) } };
        promises.push(db.collection("users").doc(placeholderId).set(newUser));
        promises.push(db.collection("user_locations").doc(placeholderId).set(locationData));
    }
    await Promise.all(promises);
});

// --- Scheduled Tasks ---
exports.cleanupPlaceholdersOnGrowth = onSchedule({ schedule: "every 24 hours", region: "us-central1" }, async (event) => {
  const statsDoc = await db.collection("app_stats").doc("user_count").get();
  const realUserCount = statsDoc.exists ? statsDoc.data().count : 0;
  if (realUserCount < REAL_USER_THRESHOLD_FOR_CLEANUP) return null;

  const query = db.collection("users").where("isPlaceholder", "==", true);
  const snapshot = await query.get();
  if (snapshot.empty) return null;

  const batch = db.batch();
  snapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
    batch.delete(db.collection("user_locations").doc(doc.id));
  });
  await batch.commit();
});

exports.checkAndDeactivateBoosts = onSchedule({ schedule: "every 5 minutes", region: "us-central1" }, async (event) => {
  const now = admin.firestore.Timestamp.now();
  const query = db.collection("users").where("isBoosted", "==", true).where("boostExpiresAt", "<=", now);
  const snapshot = await query.get();
  if (snapshot.empty) return null;

  const batch = db.batch();
  snapshot.docs.forEach((doc) => batch.update(doc.ref, { isBoosted: false }));
  await batch.commit();
});

// --- User Activity and Notifications ---
exports.activateBoost = onCall({ region: "us-central1" }, async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "You must be logged in.");
  }
  const userId = context.auth.uid;
  const expirationTime = new Date(new Date().getTime() + 30 * 60 * 1000);
  await db.collection("users").doc(userId).update({
    isBoosted: true,
    boostExpiresAt: admin.firestore.Timestamp.fromDate(expirationTime),
  });
  return { success: true };
});

exports.notifySlackOnReferralLimit = onDocumentUpdated({ document: "users/{userId}", region: "us-central1" }, async (event) => {
    if (!event.data) {
        console.log("No data associated with the event");
        return;
    }
    const newValue = event.data.after.data();
    const previousValue = event.data.before.data();

    if (newValue.referralCount >= 10 && previousValue.referralCount < 10) {
        const slackUrl = 'YOUR_SLACK_WEBHOOK_URL'; // Make sure to set this
        await axios.post(slackUrl, {
            text: `🚀 *New Elite Founder!* \n *${newValue.name}* just reached 10 referrals! \n Email: ${newValue.email}`
        });
    }
});

// --- Email Notifications ---
let mailTransport;
const active24User = process.env.ACTIVE24_USER;
const active24Pass = process.env.ACTIVE24_PASS;

if (active24User && active24Pass) {
    mailTransport = nodemailer.createTransport({
        host: 'smtp.active24.cz',
        port: 465,
        secure: true, // use SSL
        auth: {
            user: active24User,
            pass: active24Pass,
        },
    });
} else {
    console.warn("Active24 email configuration not set in environment variables. Email notifications will be disabled.");
}

exports.sendLeadAlertEmail = onDocumentCreated({ document: "waitlist/{leadId}", region: "us-central1" }, async (event) => {
    if (!mailTransport) {
        console.log("Email transport not configured. Skipping sending lead alert email.");
        return;
    }
    const snap = event.data;
    if (!snap) {
        console.log("No data associated with the event");
        return;
    }
    const newLead = snap.data();
    const email = newLead.email;

    const mailOptions = {
        from: `"NearAura Lead Alert" <${active24User}>`,
        to: active24User,
        subject: '🚀 New Waitlist Sign-up! A new user has joined the Orchard!',
        html: `<h3>🚀 New Waitlist Sign-up!</h3>
               <p>A new user has signed up for the NearAura waitlist.</p>
               <ul>
                   <li><strong>Email:</strong> ${email}</li>
                   <li><strong>Source:</strong> ${newLead.source || 'N/A'}</li>
                   <li><strong>Timestamp:</strong> ${newLead.timestamp.toDate().toUTCString()}</li>
               </ul>
               <p>Time to send a personal welcome message!</p>`,
    };

    try {
        await mailTransport.sendMail(mailOptions);
        console.log(`New founder notification email sent via Active24 for user: ${email}`);
    } catch(error) {
        console.error('There was an error while sending the email:', error);
    }
});

// --- Monetization ---
exports.createStripeCheckout = onCall({ region: "us-central1" }, async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "You must be logged in.");
  }
  const stripe = require("stripe")(process.env.STRIPE_SECRET);
  const { priceId, successUrl, cancelUrl } = data;

  const sessionOptions = {
    payment_method_types: ["card"],
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: { firebase_uid: context.auth.uid },
  };

  if (priceId === "price_pro_monthly") {
    sessionOptions.subscription_data = { trial_period_days: 7 };
  }

  const session = await stripe.checkout.sessions.create(sessionOptions);
  return { sessionId: session.id };
});

exports.stripeWebhook = onRequest({ region: "us-central1" }, async (req, res) => {
    const stripe = require("stripe")(process.env.STRIPE_SECRET);
    const signature = req.headers["stripe-signature"];
    let event;

    try {
        const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
        event = stripe.webhooks.constructEvent(req.rawBody, signature, webhookSecret);
    } catch (err) {
        console.error("Webhook signature verification failed.", err);
        return res.sendStatus(400);
    }

    if (event.type === "checkout.session.completed" || event.type === "invoice.payment_succeeded") {
        const session = event.data.object;
        const userId = session.metadata.firebase_uid;
        const subscription = await stripe.subscriptions.retrieve(session.subscription);
        const tier = getTierFromPriceId(subscription.items.data[0].price.id);
        await updateUserSubscription(userId, {
            tier,
            status: subscription.status,
            expiresAt: admin.firestore.Timestamp.fromMillis(subscription.current_period_end * 1000),
            provider: "stripe",
        });
    }
    res.sendStatus(200);
});

exports.validateGooglePlayPurchase = onCall({ region: "us-central1" }, async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "You must be logged in.");
  }
  const { purchaseToken, subscriptionId } = data;
  const tier = getTierFromSubscriptionId(subscriptionId);
  const expiryTime = new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000);
  await updateUserSubscription(context.auth.uid, {
    tier,
    status: "active",
    expiresAt: admin.firestore.Timestamp.fromDate(expiryTime),
    provider: "google_pay",
  });
  return { success: true };
});

// --- Helper Functions ---
async function updateUserSubscription(userId, subData) {
  await db.collection("users").doc(userId).update({ subscription: subData });
}

function getTierFromPriceId(priceId) {
  if (priceId === "price_pro_monthly") return "pro";
  if (priceId === "price_top_monthly") return "top";
  return "free";
}

function getTierFromSubscriptionId(subscriptionId) {
  if (subscriptionId === "nearaura_pro_monthly") return "pro";
  if (subscriptionId === "nearaura_top_monthly") return "top";
  return "free";
}
