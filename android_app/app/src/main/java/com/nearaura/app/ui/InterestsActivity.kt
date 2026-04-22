package com.nearaura.app.ui

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.google.android.material.chip.Chip
import com.nearaura.app.databinding.ActivityInterestsBinding

class InterestsActivity : AppCompatActivity() {

    private lateinit var binding: ActivityInterestsBinding
    private val selectedInterests = mutableListOf<String>()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityInterestsBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // Interests can be dynamically populated from a remote config or a local list
        val interests = listOf("Photography", "Hiking", "Reading", "Gaming", "Cooking", "Movies", "Music", "Sports")

        for (interest in interests) {
            val chip = Chip(this)
            chip.text = interest
            chip.isCheckable = true
            chip.setOnCheckedChangeListener { _, isChecked ->
                if (isChecked) {
                    selectedInterests.add(interest)
                } else {
                    selectedInterests.remove(interest)
                }
            }
            binding.interestsChipGroup.addView(chip)
        }

        binding.buttonNext.setOnClickListener {
            // Save interests to user profile
            // For now, we just move to the next screen
            startActivity(Intent(this, BioActivity::class.java))
        }
    }
}