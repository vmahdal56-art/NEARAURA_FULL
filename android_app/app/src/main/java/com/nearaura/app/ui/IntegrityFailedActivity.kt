package com.nearaura.app.ui

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.FirebaseFirestore
import com.nearaura.app.databinding.ActivityIntegrityFailedBinding

class IntegrityFailedActivity : AppCompatActivity() {

    private lateinit var binding: ActivityIntegrityFailedBinding
    private val auth by lazy { FirebaseAuth.getInstance() }
    private val firestore by lazy { FirebaseFirestore.getInstance() }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityIntegrityFailedBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.buttonTryAgain.setOnClickListener {
            resetVerificationStatus()
        }
    }

    private fun resetVerificationStatus() {
        val userId = auth.currentUser?.uid ?: return
        firestore.collection("users").document(userId)
            .update("verificationStatus", null)
            .addOnSuccessListener {
                val intent = Intent(this, VerificationActivity::class.java)
                intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
                startActivity(intent)
                finish()
            }
    }
}
