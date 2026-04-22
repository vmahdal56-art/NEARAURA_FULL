package com.nearaura.app.ui

import android.content.Intent
import android.os.Bundle
import android.text.Editable
import android.text.TextWatcher
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import com.nearaura.app.databinding.ActivityBioBinding
class BioActivity : AppCompatActivity() {

    private lateinit var binding: ActivityBioBinding
    private val minBioLength = 50

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityBioBinding.inflate(layoutInflater)
        setContentView(binding.root)

        setupListeners()
        updateNextButtonState()
    }

    private fun setupListeners() {
        binding.buttonBack.setOnClickListener { finish() }

        binding.editTextBio.addTextChangedListener(object : TextWatcher {
            override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {}
            override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {
                updateNextButtonState()
            }
            override fun afterTextChanged(s: Editable?) {}
        })

        binding.buttonNext.setOnClickListener {
            startActivity(Intent(this, ProfileSetupActivity::class.java))
        }
    }

    private fun updateNextButtonState() {
        val currentLength = binding.editTextBio.text?.trim()?.length ?: 0
        val isEnabled = currentLength >= minBioLength
        binding.buttonNext.isEnabled = isEnabled
        binding.buttonNext.alpha = if (isEnabled) 1.0f else 0.5f
        binding.textMinCharsWarning.visibility = if (currentLength > 0 && !isEnabled) View.VISIBLE else View.INVISIBLE
    }
}