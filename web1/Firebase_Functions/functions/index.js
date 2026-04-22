const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.syncPenalty = functions.https.onCall(async (data, context) => {
    const uid = context.auth.uid;
    const userRef = admin.firestore().collection('users').doc(uid);
    return admin.firestore().runTransaction(async (t) => {
        const doc = await t.get(userRef);
        const newScore = (doc.data().aura || 100) - 50;
        t.update(userRef, { aura: Math.max(0, newScore), lastPenalty: admin.firestore.FieldValue.serverTimestamp() });
        return { aura: newScore };
    });
});
