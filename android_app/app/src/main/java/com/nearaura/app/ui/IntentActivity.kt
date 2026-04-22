package com.nearaura.app.ui

import android.content.Intent
import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.FirebaseFirestore
import com.nearaura.app.data.UserIntent
import com.nearaura.app.databinding.ActivityIntentBinding

class IntentActivity : AppCompatActivity() {

    private lateinit var binding: ActivityIntentBinding
    private val firestore by lazy { FirebaseFirestore.getInstance() }
    private val auth by lazy { FirebaseAuth.getInstance() }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityIntentBinding.inflate(layoutInflater)
        setContentView(binding.root)

        setupListeners()
    }

    private fun setupListeners() {
        binding.cardDating.setOnClickListener { saveIntent(UserIntent.DATING.name) }
        binding.cardFriends.setOnClickListener { saveIntent(UserIntent.FRIENDS.name) }
        binding.cardCommunity.setOnClickListener { saveIntent(UserIntent.COMMUNITY.name) }
    }

    private fun saveIntent(intent: String) {
        val uid = auth.currentUser?.uid
        if (uid == null) {
            Toast.makeText(this, "You must be logged in", Toast.LENGTH_SHORT).show()
            return
        }

        firestore.collection("users").document(uid)
            .update("currentIntent", intent)
            .addOnSuccessListener {
                Toast.makeText(this, "Intent saved!", Toast.LENGTH_SHORT).show()
                // Proceed to the next step in the onboarding flow
                startActivity(Intent(this, BioActivity::class.java)) 
                finish()
            }
            .addOnFailureListener { e ->
                Toast.makeText(this, "Failed to save intent: ${e.message}", Toast.LENGTH_SHORT).show()
            }
    }
}