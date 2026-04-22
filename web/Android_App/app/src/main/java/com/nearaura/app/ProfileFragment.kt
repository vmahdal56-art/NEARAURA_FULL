
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

// ORCHARD INTEGRITY: 48-Hour Vault Timer
fun checkIntentVault(lastUpdateMillis: Long) {
    val fortyEightHours = 48 * 60 * 60 * 1000
    val now = System.currentTimeMillis()
    val remaining = fortyEightHours - (now - lastUpdateMillis)

    val intentButton = view?.findViewById<android.widget.Button>(R.id.btnUpdateIntent)
    val timerText = view?.findViewById<android.widget.TextView>(R.id.vaultTimer)

    if (remaining > 0) {
        intentButton?.isEnabled = false
        intentButton?.alpha = 0.5f
        val hours = remaining / (1000 * 60 * 60)
        timerText?.text = "Orchard Vault Locked: ${hours}h remaining"
        timerText?.visibility = android.view.View.VISIBLE
    } else {
        intentButton?.isEnabled = true
        intentButton?.alpha = 1.0f
        timerText?.visibility = android.view.View.GONE
    }
}
