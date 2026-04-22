package com.nearaura.app.ui

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import com.nearaura.app.R
import com.nearaura.app.dna.DNAVault

class DemoScannerActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        // 1. Nastavíme hodně surový vzhled (ideálně černé pozadí)
        setContentView(R.layout.activity_demo_scanner) // Budeš muset vytvořit jednoduché XML s černým pozadím

        val statusText = findViewById<TextView>(R.id.tv_demo_status)
        val scanButton = findViewById<Button>(R.id.btn_demo_scan)

        statusText.text = "AURA_OS v${DNAVault.VERSION}\nAWAITING HARDWARE HANDSHAKE..."

        scanButton.setOnClickListener {
            statusText.text = "SCANNING LEDGER...\nDNA MATCH: AUTHENTIC\n\nBOOTING RADAR..."
            
            // Počkáme 2 vteřiny, ať to má efekt
            scanButton.postDelayed({
                // Skočíme rovnou na Radar nebo Discovery (bez Firebase loginu)
                startActivity(Intent(this, DemoPreviewActivity::class.java))
            }, 2000)
        }
    }
}