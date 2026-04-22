
// SOVEREIGN ENGINE: Update Legacy Progress
fun syncLegacyStatus(user: User) {
    val tracker = view?.findViewById<com.nearaura.ui.custom.LegacyTrackerView>(R.id.legacyTracker)
    
    // Check if the user is a Director (JV, JM, PM, LA, PM, LH, YM, VM)
    val directors = listOf("JV", "JM", "PM", "LA", "LH", "YM", "VM")
    val isDirector = directors.any { user.displayName.startsWith(it) }

    if (isDirector) {
        tracker?.visibility = android.view.View.GONE
        // Show Gold Elite Badge instead (Implementation in DNA)
    } else {
        user.createdAt?.let { timestamp ->
            tracker?.updateProgress(timestamp.seconds * 1000, user.loginCount)
        }
    }
}
