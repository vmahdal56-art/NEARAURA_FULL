package com.nearaura.app.logic

import android.app.Activity
import android.util.Log

class AdManager {
    // Standard Ads with Flow Protection
    fun showInterstitialAd(activity: Activity, isPremium: Boolean) {
        if (isPremium) {
            Log.d("NearAura_Ads", "Flow Protected: skipping ad.")
            return 
        }
        Log.d("NearAura_Ads", "Showing Interstitial Ad.")
    }

    // NEW: 1-Hour Aura Boost Reward Ad
    fun showRewardAd(activity: Activity, onRewardEarned: (Int) -> Unit) {
        Log.d("NearAura_Ads", "Loading Rewarded Video for Aura Boost...")
        
        // This simulates the Google AdMob Reward Callback
        // In the real APK, this triggers the 1-hour boost in Firebase
        val rewardAmount = 60 // 60 minutes of boost
        onRewardEarned(rewardAmount)
    }
}
