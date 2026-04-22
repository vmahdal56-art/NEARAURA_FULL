package com.nearaura.app.ui

import android.os.Bundle
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import com.nearaura.app.R

class DemoPreviewActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_demo_preview)

        // Surový výstup pro investory
        val previewText = findViewById<TextView>(R.id.tv_demo_preview_status)
        previewText.text = "ORCHARD RADAR ACTIVE\n\n[ INDIEGOGO DEMO MODE ]\n\nNO PLASTIC. NO NOISE.\nJUST TRUTH AND AURA."
    }
}