package com.nearaura.ui.custom

import android.content.Context
import android.graphics.Color
import android.util.AttributeSet
import android.view.LayoutInflater
import android.widget.LinearLayout
import android.widget.ProgressBar
import android.widget.TextView
import com.nearaura.R
import java.util.concurrent.TimeUnit

class LegacyTrackerView @JvmOverloads constructor(
    context: Context, attrs: AttributeSet? = null, defStyleAttr: Int = 0
) : LinearLayout(context, attrs, defStyleAttr) {

    init {
        orientation = VERTICAL
        setBackgroundColor(Color.parseColor("#0B0D11")) // Void Black
        setPadding(40, 40, 40, 40)
        
        // Add Title
        val title = TextView(context).apply {
            text = "PATH TO ELITE"
            setTextColor(Color.parseColor("#F97316")) // Shiny Orange
            textSize = 18f
            setPadding(0, 0, 0, 20)
        }
        addView(title)
    }

    fun updateProgress(createdAtTimestamp: Long, currentLogins: Int) {
        removeAllViews() // Refresh for update
        
        // 1. Calculate Tenure (365 Days)
        val diffInMs = System.currentTimeMillis() - createdAtTimestamp
        val daysActive = TimeUnit.MILLISECONDS.toDays(diffInMs).toInt()
        val tenurePercent = ((daysActive.toFloat() / 365f) * 100).toInt().coerceAtMost(100)

        // 2. Calculate Logins (50 Logins)
        val loginPercent = ((currentLogins.toFloat() / 50f) * 100).toInt().coerceAtMost(100)

        // Render Tenure UI
        addProgressSection("Tenure: $daysActive / 365 Days", tenurePercent, "#F97316")
        
        // Render Login UI
        addProgressSection("Logins: $currentLogins / 50", loginPercent, "#22D3EE")
        
        if (tenurePercent >= 100 && loginPercent >= 100) {
            val eliteMsg = TextView(context).apply {
                text = "STATUS: ELITE ELIGIBLE"
                setTextColor(Color.WHITE)
                textAlignment = TEXT_ALIGNMENT_CENTER
                setPadding(0, 20, 0, 0)
            }
            addView(eliteMsg)
        }
    }

    private fun addProgressSection(label: String, progress: Int, colorHex: String) {
        val txt = TextView(context).apply {
            text = label
            setTextColor(Color.LTGRAY)
        }
        val pb = ProgressBar(context, null, android.R.attr.progressBarStyleHorizontal).apply {
            max = 100
            setProgress(progress)
            progressTintList = android.content.res.ColorStateList.valueOf(Color.parseColor(colorHex))
            scaleY = 2f
        }
        addView(txt)
        addView(pb)
    }
}
