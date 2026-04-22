package com.nearaura.app.ui

import android.content.Intent
import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.FirebaseFirestore
import com.nearaura.app.data.Broadcast
import com.nearaura.app.databinding.ActivityStartBroadcastBinding

class StartBroadcastActivity : AppCompatActivity() {

    private lateinit var binding: ActivityStartBroadcastBinding
    private val firestore by lazy { FirebaseFirestore.getInstance() }
    private val auth by lazy { FirebaseAuth.getInstance() }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityStartBroadcastBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.startBroadcastNowButton.setOnClickListener { createBroadcast() }
    }

    private fun createBroadcast() {
        val topic = binding.broadcastTopicEditText.text.toString().trim()
        val currentUser = auth.currentUser

        if (topic.isEmpty()) {
            Toast.makeText(this, "Please enter a topic for your broadcast", Toast.LENGTH_SHORT).show()
            return
        }

        if (currentUser == null) {
            Toast.makeText(this, "You must be logged in to start a broadcast", Toast.LENGTH_SHORT).show()
            return
        }

        val broadcastId = firestore.collection("broadcasts").document().id
        val broadcast = Broadcast(
            id = broadcastId,
            creatorId = currentUser.uid,
            creatorName = currentUser.displayName ?: "Anonymous",
            topic = topic,
            participants = listOf(currentUser.uid)
        )

        firestore.collection("broadcasts").document(broadcastId).set(broadcast)
            .addOnSuccessListener {
                Toast.makeText(this, "Broadcast started!", Toast.LENGTH_SHORT).show()
                val intent = Intent(this, BroadcastActivity::class.java)
                intent.putExtra("BROADCAST_ID", broadcastId)
                startActivity(intent)
                finish()
            }
            .addOnFailureListener { e ->
                Toast.makeText(this, "Failed to start broadcast: ${e.message}", Toast.LENGTH_SHORT).show()
            }
    }
}