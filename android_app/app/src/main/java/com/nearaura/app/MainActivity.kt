package com.nearaura.app

import android.app.usage.UsageStatsManager
import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.provider.Settings
import androidx.appcompat.app.AppCompatActivity
import java.util.*

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        
        // 🔱 START THE HEARTBEAT (The Service)
        val serviceIntent = Intent(this, LocationService::class.java)
        startForegroundService(serviceIntent)
    }

    companion object {
        // [DNA] Jedno zařízení = Jeden život.
        fun getHardwareId(context: Context): String {
            return Settings.Secure.getString(context.contentResolver, Settings.Secure.ANDROID_ID) ?: "unknown_geezer"
        }

        // [DNA] Měření času u displeje (v minutách)
        fun getDailyScreenTime(context: Context): Long {
            val usageStatsManager = context.getSystemService(Context.USAGE_STATS_SERVICE) as UsageStatsManager
            val calendar = Calendar.getInstance()
            calendar.set(Calendar.HOUR_OF_DAY, 0)
            calendar.set(Calendar.MINUTE, 0)
            calendar.set(Calendar.SECOND, 0)
            
            val stats = usageStatsManager.queryAndAggregateUsageStats(calendar.timeInMillis, System.currentTimeMillis())
            var totalTime = 0L
            stats.forEach { (_, usageStats) ->
                totalTime += usageStats.totalTimeInForeground
            }
            return totalTime / 1000 / 60 
        }
    }
}
