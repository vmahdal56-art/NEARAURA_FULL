package com.nearaura.app.ui

import android.os.Bundle
import android.widget.CheckBox
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.FirebaseFirestore
import com.nearaura.app.databinding.ActivityAuraFlavorBinding
import java.util.concurrent.TimeUnit

class AuraFlavorActivity : AppCompatActivity() {

    private lateinit var binding: ActivityAuraFlavorBinding
    private val firestore by lazy { FirebaseFirestore.getInstance() }
    private val auth by lazy { FirebaseAuth.getInstance() }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityAuraFlavorBinding.inflate(layoutInflater)
        setContentView(binding.root)

        setupCheckboxListeners()
        binding.buttonSaveFlavor.setOnClickListener { saveFlavors() }

        checkIntentLock()
    }

    private fun setupCheckboxListeners() {
        binding.checkboxPineapple.setOnCheckedChangeListener { _, isChecked ->
            if (isChecked) {
                binding.checkboxBanana.isEnabled = false
                binding.checkboxPeach.isEnabled = false
                binding.checkboxBanana.alpha = 0.5f
                binding.checkboxPeach.alpha = 0.5f
            } else {
                binding.checkboxBanana.isEnabled = true
                binding.checkboxPeach.isEnabled = true
                binding.checkboxBanana.alpha = 1.0f
                binding.checkboxPeach.alpha = 1.0f
            }
        }

        val casualListener = { _: CheckBox, isChecked: Boolean ->
            if (isChecked) {
                binding.checkboxPineapple.isEnabled = false
                binding.checkboxPineapple.alpha = 0.5f
            } else if (!binding.checkboxBanana.isChecked && !binding.checkboxPeach.isChecked) {
                binding.checkboxPineapple.isEnabled = true
                binding.checkboxPineapple.alpha = 1.0f
            }
        }

        binding.checkboxBanana.setOnCheckedChangeListener { _, isChecked ->
            casualListener(binding.checkboxBanana, isChecked)
        }

        binding.checkboxPeach.setOnCheckedChangeListener { _, isChecked ->
            casualListener(binding.checkboxPeach, isChecked)
        }
    }

    private fun checkIntentLock() {
        val userId = auth.currentUser?.uid ?: return

        firestore.collection("users").document(userId).get().addOnSuccessListener { document ->
            val lastIntentUpdate = document.getTimestamp("intentLastUpdatedAt")?.toDate()?.time ?: 0
            val fortyEightHoursInMillis = TimeUnit.HOURS.toMillis(48)
            val remainingTime = (lastIntentUpdate + fortyEightHoursInMillis) - System.currentTimeMillis()

            if (remainingTime > 0) {
                binding.buttonSaveFlavor.isEnabled = false
                val hours = TimeUnit.MILLISECONDS.toHours(remainingTime)
                binding.buttonSaveFlavor.text = "Your Aura is locked. You can change your intent in ${hours} hours."
            }
        }
    }

    private fun saveFlavors() {
        val userId = auth.currentUser?.uid
        if (userId == null) {
            Toast.makeText(this, "You must be logged in", Toast.LENGTH_SHORT).show()
            return
        }

        firestore.collection("users").document(userId).get().addOnSuccessListener { document ->
            val lastIntentUpdate = document.getTimestamp("intentLastUpdatedAt")?.toDate()?.time ?: 0
            val fortyEightHoursInMillis = TimeUnit.HOURS.toMillis(48)

            if (System.currentTimeMillis() - lastIntentUpdate < fortyEightHoursInMillis) {
                Toast.makeText(this, "You can only change your intent once every 48 hours.", Toast.LENGTH_SHORT).show()
                return@addOnSuccessListener
            }

            val selectedFlavors = mutableListOf<String>()
            if (binding.checkboxPineapple.isChecked) selectedFlavors.add("pineapple")
            if (binding.checkboxBanana.isChecked) selectedFlavors.add("banana")
            if (binding.checkboxPeach.isChecked) selectedFlavors.add("peach")

            if (selectedFlavors.isEmpty()) {
                Toast.makeText(this, "Please select a flavor", Toast.LENGTH_SHORT).show()
                return@addOnSuccessListener
            }

            firestore.collection("users").document(userId)
                .update("auraFlavors", selectedFlavors, "intentLastUpdatedAt", com.google.firebase.firestore.FieldValue.serverTimestamp())
                .addOnSuccessListener {
                    Toast.makeText(this, "Flavors saved!", Toast.LENGTH_SHORT).show()
                    finish()
                }
                .addOnFailureListener { e ->
                    Toast.makeText(this, "Failed to save flavors: ${e.message}", Toast.LENGTH_SHORT).show()
                }
        }
    }
}
