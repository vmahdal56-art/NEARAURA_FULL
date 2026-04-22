package com.nearaura.app.analytics

import android.os.Bundle

class AnalyticsManager {
    fun trackInstall() {}
    fun trackUserVerified(eventName: String = "user_verified", bundle: Bundle? = null) {}
}