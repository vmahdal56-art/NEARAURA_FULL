package com.nearaura.app.ui

import android.animation.Animator
import android.animation.AnimatorListenerAdapter
import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.Button
import android.widget.CheckBox
import android.widget.LinearLayout
import androidx.appcompat.app.AppCompatActivity
import com.nearaura.app.R

class HumanityDeclarationActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_humanity_declaration)

        val humanityCheckbox = findViewById<CheckBox>(R.id.humanity_checkbox)
        val continueButton = findViewById<Button>(R.id.continue_button)
        val signatureLayout = findViewById<LinearLayout>(R.id.signature_layout)

        humanityCheckbox.setOnCheckedChangeListener { _, isChecked ->
            continueButton.isEnabled = isChecked
            if (isChecked) {
                // Fade in the signature
                signatureLayout.animate()
                    .alpha(1f)
                    .setDuration(500) // 500ms fade
                    .setListener(null)
            } else {
                // Hide it instantly
                signatureLayout.alpha = 0f
            }
        }

        continueButton.setOnClickListener {
            if (humanityCheckbox.isChecked) {
                // Navigate to the main part of the app
                val intent = Intent(this, MainActivity::class.java)
                intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
                startActivity(intent)
                finish()
            }
        }
    }
}