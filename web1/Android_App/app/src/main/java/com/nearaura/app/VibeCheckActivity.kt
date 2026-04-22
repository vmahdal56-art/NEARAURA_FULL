package com.nearaura.app

import android.os.Bundle
import android.os.CountDownTimer
import androidx.appcompat.app.AppCompatActivity
import android.widget.TextView

class VibeCheckActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_vibe_check)

        val timerText = findViewById<TextView>(R.id.vibeTimer)

        // THE 15-SECOND INTEGRITY GATE
        object : CountDownTimer(15000, 1000) {
            override fun onTick(millisUntilFinished: Long) {
                timerText.text = "Recording: ${millisUntilFinished / 1000}s"
            }

            override fun onFinish() {
                // TODO: Upload to Firebase Storage / NearAura_Functions
                finish()
            }
        }.start()
    }
}
