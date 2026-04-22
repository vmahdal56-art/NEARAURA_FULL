const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { setGlobalOptions } = require("firebase-functions/v2");
const admin = require("firebase-admin");

admin.initializeApp();

// Set global options to use a closer region if needed
setGlobalOptions({ region: "us-central1" });

/**
 * Trigger: New user signup
 * Action: Initialize the Firestore profile for the NearAura app
 */
exports.onUserCreated = onDocumentCreated("users/{userId}", (event) => {
    const userId = event.params.userId;
    const snapshot = event.data;
    if (!snapshot) return null;

    console.log(`Initializing NearAura profile for: ${userId}`);

    return snapshot.ref.set({
        auraBalance: 100,
        status: "active",
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        preferences: {
            discoveryEnabled: true,
            notifications: true
        }
    }, { merge: true });
});

/**
 * Placeholder for Match/Aura interaction logic
 */
exports.processAuraInteraction = onDocumentCreated("interactions/{id}", (event) => {
    // Requirements from fullnearaura.doc logic go here
    console.log("Processing interaction...");
    return null;
});
