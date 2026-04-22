const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { setGlobalOptions } = require("firebase-functions/v2");
const admin = require("firebase-admin");

admin.initializeApp();
setGlobalOptions({ region: "us-central1" });

const DIRECTORS = ['JV', 'JM', 'PM', 'LA', 'LH', 'YM', 'VM'];

// LONDON EXCLUSIVE LAUNCH: Track spots and enforce region
exports.onUserCreated = onDocumentCreated("users/{userId}", async (event) => {
    const snapshot = event.data;
    if (!snapshot) return null;

    const statsRef = admin.firestore().collection('stats').doc('launch');
    
    return admin.firestore().runTransaction(async (transaction) => {
        const statsDoc = await transaction.get(statsRef);
        const currentSpots = statsDoc.exists ? statsDoc.data().remainingSpots : 500;
        
        transaction.update(statsRef, { 
            remainingSpots: Math.max(0, currentSpots - 1),
            lastJoined: admin.firestore.FieldValue.serverTimestamp()
        });

        return transaction.set(snapshot.ref, {
            region: "London", // Phase 1 Lock
            isSovereign: DIRECTORS.includes(snapshot.id),
            vaultLockedUntil: admin.firestore.Timestamp.fromDate(new Date(Date.now() + 48 * 60 * 60 * 1000))
        }, { merge: true });
    });
});
