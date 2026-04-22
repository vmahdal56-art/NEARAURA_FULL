package com.nearaura.app.ui

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.google.android.material.button.MaterialButton
import com.nearaura.app.databinding.ActivityGenderBinding
import com.nearaura.app.ui.InterestsActivity

class GenderActivity : AppCompatActivity() {

    private lateinit var binding: ActivityGenderBinding
    private var selectedGender: MaterialButton? = null
    private var selectedPreference: MaterialButton? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityGenderBinding.inflate(layoutInflater)
        setContentView(binding.root)

        setupListeners()
        updateNextButtonState()
    }

    private fun setupListeners() {
        binding.buttonBack.setOnClickListener { finish() }

        val genderButtons = listOf(binding.buttonGenderMale, binding.buttonGenderFemale, )
        genderButtons.forEach { button ->
            button.setOnClickListener {
                selectButton(button, genderButtons, isGender = true)
            }
        }

        val preferenceButtons = listOf(binding.buttonShowMeMale, binding.buttonShowMeFemale, binding.buttonShowMeEveryone)
        preferenceButtons.forEach { button ->
            button.setOnClickListener {
                selectButton(button, preferenceButtons, isGender = false)
            }
        }

        binding.buttonNext.setOnClickListener {
            startActivity(Intent(this, InterestsActivity::class.java))
        }
    }

    private fun selectButton(clickedButton: MaterialButton, group: List<MaterialButton>, isGender: Boolean) {
        group.forEach { it.isChecked = false }
        clickedButton.isChecked = true

        if (isGender) {
            selectedGender = clickedButton
        } else {
            selectedPreference = clickedButton
        }
        updateNextButtonState()
    }

    private fun updateNextButtonState() {
        val isEnabled = selectedGender != null && selectedPreference != null
        binding.buttonNext.isEnabled = isEnabled
        binding.buttonNext.alpha = if (isEnabled) 1.0f else 0.5f
    }
}