package com.nearaura.orchard.ui

import android.view.View
import android.widget.ImageView

class IntentPickerLogic(
    private val pineappleIcon: ImageView,
    private val bananaIcon: ImageView,
    private val peachIcon: ImageView
) {
    fun onPineappleSelected() {
        // Selection Guardrail: Dim and disable Casual fruits
        bananaIcon.alpha = 0.2f
        bananaIcon.isEnabled = false
        peachIcon.alpha = 0.2f
        peachIcon.isEnabled = false
        
        pineappleIcon.alpha = 1.0f
        // Logic to trigger the 48-Hour Vault in the DB
    }
}
