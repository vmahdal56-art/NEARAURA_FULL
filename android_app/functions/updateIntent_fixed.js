exports.updateIntent = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'You must be logged in.');
  }

  const uid = context.auth.uid;
  const newFruits = data.auraFlavors;
  const userRef = db.collection('users').doc(uid);
  
  // THE CORE TEAM - JV, JM, PM, LA, PM, LH, YM, VM
  const CORE_TEAM_INITIALS = ["JV", "JM", "PM", "LA", "LH", "YM", "VM"];

  if (!newFruits || newFruits.length === 0 || newFruits.length > 2) {
    throw new functions.https.HttpsError('invalid-argument', 'Select 1 or 2 fruits.');
  }

  const userDoc = await userRef.get();
  if (!userDoc.exists) {
    throw new functions.https.HttpsError('not-found', 'User not found.');
  }

  const userData = userDoc.data();
  const userInitials = userData.initials || ""; // Assumes you store initials in the doc
  const isCoreTeam = CORE_TEAM_INITIALS.includes(userInitials.toUpperCase());

  // Only enforce the 48-hour lock if NOT in Core Team
  if (!isCoreTeam && userData.intentLastUpdatedAt) {
    const fortyEightHoursInMillis = 172800000;
    const now = Date.now();
    const lastUpdatedMillis = userData.intentLastUpdatedAt.toMillis();

    if (now - lastUpdatedMillis < fortyEightHoursInMillis) {
      throw new functions.https.HttpsError('failed-precondition', '48-hour lock active.');
    }
  }

  await userRef.update({
    auraFlavors: newFruits,
    intentLastUpdatedAt: admin.firestore.FieldValue.serverTimestamp()
  });

  return { success: true };
});
