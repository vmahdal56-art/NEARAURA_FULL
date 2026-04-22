const { onCall, onRequest } = require("firebase-functions/v2/https");
const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const admin = require("firebase-admin");

if (!admin.apps.length) admin.initializeApp();
const db = admin.firestore();

// THE TEAM: JV, JM, PM, LA, PM, LH, YM, VM
const DIRECTORS = ["JV", "JM", "PM", "LA", "LH", "YM", "VM"];

// --- THE ELITE MASTER ENGINE ---
async function evaluateEliteStatus(uid) {
    const userRef = db.collection("users").doc(uid);
    const doc = await userRef.get();
    const data = doc.data();
    
    const now = Date.now();
    const oneYearInMs = 365 * 24 * 60 * 60 * 1000;
    
    const isLoyal = (data.loginCount >= 50) && ((now - data.createdAt?.toMillis()) >= oneYearInMs);
    const isInvestor = data.isFounder && data.hasMegaBoost;
    const isDirector = DIRECTORS.some(initial => data.displayName?.startsWith(initial));

    if (isInvestor || isLoyal || isDirector) {
        await userRef.update({
            status: "ELITE",
            isElite: true,
            tier: isDirector ? "DIRECTOR" : (isInvestor ? "SOVEREIGN_ALPHA" : "LEGACY"),
            specialBadge: "LONDON_ELITE_2026"
        });
    }
}

// 1. TRACK FOUNDERS (First 1,000 - Directors don't count towards the cap)
exports.trackFounder = onDocumentCreated("users/{userId}", async (event) => {
    const statsRef = db.collection("metadata").doc("launch_stats");
    const userRef = event.data.ref;
    const userData = event.data.data();
    
    const isDirector = DIRECTORS.some(initial => userData.displayName?.startsWith(initial));

    return await db.runTransaction(async (transaction) => {
        const stats = await transaction.get(statsRef);
        const count = stats.exists ? stats.data().founderCount : 0;
        
        if (isDirector) {
            // Directors get Founder status for free without affecting the 1,000 count
            transaction.update(userRef, { 
                isFounder: true, 
                status: "DIRECTOR", 
                createdAt: admin.firestore.FieldValue.serverTimestamp(),
                loginCount: 1 
            });
        } else if (count < 1000) {
            transaction.update(userRef, { 
                isFounder: true, 
                status: "FOUNDER",
                createdAt: admin.firestore.FieldValue.serverTimestamp(),
                loginCount: 1 
            });
            transaction.set(statsRef, { founderCount: count + 1 }, { merge: true });
        } else {
            transaction.update(userRef, { 
                isFounder: false, 
                status: "STANDARD",
                createdAt: admin.firestore.FieldValue.serverTimestamp(),
                loginCount: 1 
            });
        }
    });
});

// 2. MEGABOOST & LOGIN UPDATES
exports.onUserLogin = onCall(async (request) => {
    const uid = request.auth.uid;
    await db.collection("users").doc(uid).update({
        loginCount: admin.firestore.FieldValue.increment(1),
        lastLogin: admin.firestore.FieldValue.serverTimestamp()
    });
    return await evaluateEliteStatus(uid);
});

exports.verifyPurchase = onCall(async (request) => {
    const { productId } = request.data;
    if (productId.includes("megaboost")) {
        await db.collection("users").doc(request.auth.uid).update({ hasMegaBoost: true });
        await evaluateEliteStatus(request.auth.uid);
    }
    return { success: true };
});

// 3. COUNTER API for nearaura.com/launch
exports.getLaunchStats = onRequest((req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    db.collection("metadata").doc("launch_stats").get().then(doc => {
        res.json({ remaining: 1000 - (doc.data()?.founderCount || 0) });
    });
});

// LONDON GEOGRAPHY: Center of the Launch (Trafalgar Square)
const LONDON_LAT = 51.5074;
const LONDON_LON = -0.1278;
const MAX_RADIUS_KM = 10.0;

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

// SECURE LOCATION SYNC: Purge coordinates every 15 minutes
exports.syncUserLocation = onCall(async (request) => {
    const { lat, lon } = request.data;
    const uid = request.auth.uid;
    
    const distance = calculateDistance(lat, lon, LONDON_LAT, LONDON_LON);
    const inLondon = distance <= MAX_RADIUS_KM;

    await db.collection("users").doc(uid).update({
        lastKnownLocation: new admin.firestore.GeoPoint(lat, lon),
        lastLocationUpdate: admin.firestore.FieldValue.serverTimestamp(),
        isWithinLaunchZone: inLondon
    });

    return { inLondon, distance: Math.round(distance * 10) / 10 };
});

// AUTO-PURGE: Privacy Rule - Wipe location history every 15 minutes
exports.locationJanitor = exports.onUserLogin = onCall(async (request) => {
    const fifteenMinsAgo = new Date(Date.now() - 15 * 60 * 1000);
    const staleUsers = await db.collection("users")
        .where("lastLocationUpdate", "<", fifteenMinsAgo)
        .get();

    const batch = db.batch();
    staleUsers.forEach(doc => {
        batch.update(doc.ref, { lastKnownLocation: null });
    });
    await batch.commit();
    console.log("Privacy Purge: Wiped stale location data.");
});
