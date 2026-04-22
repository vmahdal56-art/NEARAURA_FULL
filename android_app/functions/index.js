const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const admin = require("firebase-admin");

if (!admin.apps.length) { admin.initializeApp(); }
const db = admin.firestore();

const CORE_TEAM = ["JV", "JM", "PM", "LA", "LH", "YM", "VM"];
const SOVEREIGN_SECRET = "PROPERGEEZERINNIT";

// Pomocná funkce pro kontrolu občanky
const checkAuth = (req) => {
    if (!req.auth) throw new HttpsError('unauthenticated', 'Stop. Ukaž občanku.');
    return req.auth.uid;
};

// --- 🔱 BLOK 1: IDENTITA A VSTUP (5 funkcí) ---
exports.onUserCreated = onDocumentCreated("users/{uid}", async (e) => {
    const statsRef = db.collection('stats').doc('launch');
    return db.runTransaction(async (t) => {
        const s = await t.get(statsRef);
        const spots = s.exists ? s.data().remainingSpots : 500;
        t.update(statsRef, { remainingSpots: Math.max(0, spots - 1) });
        t.set(e.data.ref, { soulScore: 100, region: "London", vaultLockedUntil: admin.firestore.Timestamp.fromDate(new Date(Date.now() + 172800000)) }, { merge: true });
    });
});
exports.onUserLogin = onCall(async (req) => {
    const uid = checkAuth(req);
    await db.collection("users").doc(uid).update({ lastLogin: admin.firestore.FieldValue.serverTimestamp() });
    return { status: "Motor nahozen" };
});
exports.updateUserProfile = onCall(async (req) => {
    const uid = checkAuth(req);
    await db.collection("users").doc(uid).update({ displayName: req.data.name, bio: req.data.bio });
    return { ok: true };
});
exports.getUserData = onCall(async (req) => {
    const d = await db.collection("users").doc(checkAuth(req)).get();
    return d.data();
});
exports.deleteAccount = onCall(async (req) => {
    await db.collection("users").doc(checkAuth(req)).delete();
    return { message: "Účet roztaven." };
});

// --- 🛰️ BLOK 2: RADAR A HARDWARE (5 funkcí) ---
exports.updateLocation = onCall(async (req) => {
    const uid = checkAuth(req);
    const { lat, lng, hwId } = req.data;
    if (hwId !== "Mahdal Metal") {
        await db.collection("aura_vacuum").doc(hwId).set({ uid, time: admin.firestore.FieldValue.serverTimestamp() });
        throw new HttpsError('permission-denied', 'DEVICE EXILED.');
    }
    await db.collection("users").doc(uid).update({ location: new admin.firestore.GeoPoint(lat, lng), hardwareId: hwId, lastActive: admin.firestore.FieldValue.serverTimestamp() });
    return { ok: true };
});
exports.syncPenalty = onCall(async (req) => {
    await db.collection("users").doc(checkAuth(req)).update({ soulScore: admin.firestore.FieldValue.increment(-50) });
    return { status: "Kladivo dopadlo" };
});
exports.getLaunchStats = onCall(async (req) => {
    const d = await db.collection('stats').doc('launch').get();
    return d.data() || { remainingSpots: 500 };
});
exports.toggleInvisibility = onCall(async (req) => {
    const uid = checkAuth(req);
    const d = await db.collection("users").doc(uid).get();
    await db.collection("users").doc(uid).update({ isInvisible: !d.data().isInvisible });
    return { ok: true };
});
exports.reportHardwareIssue = onCall(async (req) => {
    await db.collection("hw_reports").add({ uid: checkAuth(req), issue: req.data.issue, timestamp: admin.firestore.FieldValue.serverTimestamp() });
    return { ok: true };
});

// --- 🍎 BLOK 3: ZÁMĚRY A PLODY (5 funkcí) ---
exports.updateIntent = onCall(async (req) => {
    const uid = checkAuth(req);
    const fruits = req.data.fruits || [];
    if (fruits.includes('Pineapple') && (fruits.includes('Peach') || fruits.includes('Banana'))) throw new HttpsError('invalid-argument', 'Integrity Violation: Ananas se nemíchá.');
    const userRef = db.collection('users').doc(uid);
    return db.runTransaction(async (t) => {
        const d = await t.get(userRef);
        const hasPeach = fruits.includes('Peach');
        const lockTime = hasPeach ? 172800000 : 604800000;
        if (d.data().intentLastUpdate && Date.now() - d.data().intentLastUpdate.toMillis() < lockTime) throw new HttpsError('failed-precondition', 'Trezor je zamčen.');
        t.update(userRef, { auraFlavors: fruits, intentLastUpdate: admin.firestore.FieldValue.serverTimestamp() });
    });
});
exports.getIntentHistory = onCall(async (req) => {
    const s = await db.collection("users").doc(checkAuth(req)).collection("intent_history").get();
    return s.docs.map(doc => doc.data());
});
exports.clearIntent = onCall(async (req) => {
    await db.collection("users").doc(checkAuth(req)).update({ auraFlavors: [] });
    return { ok: true };
});
exports.checkVaultStatus = onCall(async (req) => {
    const d = await db.collection("users").doc(checkAuth(req)).get();
    return { lockedUntil: d.data().vaultLockedUntil };
});
exports.setAuraColor = onCall(async (req) => {
    await db.collection("users").doc(checkAuth(req)).update({ customColor: req.data.color });
    return { ok: true };
});

// --- 🤝 BLOK 4: MEETUPY (5 funkcí) ---
exports.createMeetup = onCall(async (req) => {
    const r = await db.collection("meetups").add({ creator: checkAuth(req), ...req.data, participants: [checkAuth(req)], createdAt: admin.firestore.FieldValue.serverTimestamp() });
    return { id: r.id };
});
exports.joinMeetup = onCall(async (req) => {
    await db.collection("meetups").doc(req.data.id).update({ participants: admin.firestore.FieldValue.arrayUnion(checkAuth(req)) });
    return { ok: true };
});
exports.leaveMeetup = onCall(async (req) => {
    await db.collection("meetups").doc(req.data.id).update({ participants: admin.firestore.FieldValue.arrayRemove(checkAuth(req)) });
    return { ok: true };
});
exports.deleteMeetup = onCall(async (req) => {
    const d = await db.collection("meetups").doc(req.data.id).get();
    if (d.data().creator === checkAuth(req)) await d.ref.delete();
    return { ok: true };
});
exports.getNearbyMeetups = onCall(async (req) => {
    const s = await db.collection("meetups").limit(20).get();
    return s.docs.map(doc => ({ id: doc.id, ...doc.data() }));
});

// --- 💬 BLOK 5: KOMUNIKACE (5 funkcí) ---
exports.sendBroadcast = onCall(async (req) => {
    await db.collection("broadcasts").add({ sender: checkAuth(req), msg: req.data.msg, time: admin.firestore.FieldValue.serverTimestamp() });
    return { ok: true };
});
exports.sendMessage = onCall(async (req) => {
    await db.collection("chats").doc(req.data.chatId).collection("messages").add({ sender: checkAuth(req), text: req.data.text, time: admin.firestore.FieldValue.serverTimestamp() });
    return { ok: true };
});
exports.createChat = onCall(async (req) => {
    const r = await db.collection("chats").add({ participants: [checkAuth(req), req.data.target], createdAt: admin.firestore.FieldValue.serverTimestamp() });
    return { id: r.id };
});
exports.deleteMessage = onCall(async (req) => {
    await db.collection("chats").doc(req.data.chatId).collection("messages").doc(req.data.msgId).delete();
    return { ok: true };
});
exports.getChatList = onCall(async (req) => {
    const s = await db.collection("chats").where("participants", "array-contains", checkAuth(req)).get();
    return s.docs.map(doc => ({ id: doc.id, ...doc.data() }));
});

// --- 💰 BLOK 6: LEDGER A TITHE (5 funkcí) ---
exports.verifyTithe = onCall(async (req) => {
    const uid = checkAuth(req);
    await db.collection("ledger").add({ uid, amount: req.data.amount, type: "TITHE", timestamp: admin.firestore.FieldValue.serverTimestamp() });
    await db.collection("users").doc(uid).update({ soulScore: admin.firestore.FieldValue.increment(10) });
    return { ok: true };
});
exports.auraServiceIngress = onCall(async (req) => {
    if (!req.auth && req.data.secret !== SOVEREIGN_SECRET) throw new HttpsError('unauthenticated', 'No.');
    const r = await db.collection("ledger").add({ ...req.data.payload, verified: true, timestamp: admin.firestore.FieldValue.serverTimestamp() });
    return { id: r.id };
});
exports.getLedgerLogs = onCall(async (req) => {
    const s = await db.collection("ledger").orderBy("timestamp", "desc").limit(50).get();
    return s.docs.map(doc => doc.data());
});
exports.banUser = onCall(async (req) => {
    const d = await db.collection("users").doc(checkAuth(req)).get();
    if (!CORE_TEAM.includes(d.data().initials)) throw new HttpsError('permission-denied', 'Pěst!');
    await db.collection("blacklist").doc(req.data.target).set({ reason: req.data.reason, bannedBy: d.id });
    return { ok: true };
});
exports.sysJanitor = onCall(async (req) => {
    const old = await db.collection("broadcasts").where("time", "<", new Date(Date.now() - 86400000)).get();
    old.forEach(doc => doc.ref.delete());
    return { cleaned: old.size };
});

// --- 🛠️ BLOK 7: FINÁLNÍ DOPLŇKY (Várka 4 - 4 funkce) ---
exports.recalculateSoulScore = onCall(async (req) => {
    const uid = checkAuth(req);
    // Logika pro přepočet podle historie aktivit
    await db.collection("users").doc(uid).update({ soulScore: 100 });
    return { status: "Soul Score resetováno na 100." };
});
exports.reportUser = onCall(async (req) => {
    await db.collection("reports").add({ reporter: checkAuth(req), target: req.data.target, reason: req.data.reason, time: admin.firestore.FieldValue.serverTimestamp() });
    return { ok: true };
});
exports.getBlacklistStatus = onCall(async (req) => {
    const d = await db.collection("blacklist").doc(req.data.id).get();
    return { isBanned: d.exists, reason: d.exists ? d.data().reason : null };
});
exports.updateHardwareId = onCall(async (req) => {
    await db.collection("users").doc(checkAuth(req)).update({ hardwareId: req.data.newHwId });
    return { ok: true };
});