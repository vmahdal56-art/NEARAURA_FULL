package com.nearaura.app.ui

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.FirebaseFirestore
import com.google.firebase.firestore.Query
import com.nearaura.app.data.Message
import com.nearaura.app.databinding.ActivityBroadcastBinding

class BroadcastActivity : AppCompatActivity() {

    private lateinit var binding: ActivityBroadcastBinding
    private lateinit var chatAdapter: ChatAdapter
    private val messages = mutableListOf<Message>()

    private val firestore by lazy { FirebaseFirestore.getInstance() }
    private val auth by lazy { FirebaseAuth.getInstance() }

    private var broadcastId: String? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityBroadcastBinding.inflate(layoutInflater)
        setContentView(binding.root)

        broadcastId = intent.getStringExtra("BROADCAST_ID")
        if (broadcastId == null) {
            finish()
            return
        }

        setupRecyclerView()
        setupSendButton()
        fetchBroadcastInfo()
        listenForMessages()
    }

    private fun setupRecyclerView() {
        chatAdapter = ChatAdapter(messages) // We can reuse the same adapter for now
        binding.broadcastChatRecyclerView.apply {
            layoutManager = LinearLayoutManager(this@BroadcastActivity).apply {
                stackFromEnd = true
            }
            adapter = chatAdapter
        }
    }

    private fun setupSendButton() {
        binding.sendButton.setOnClickListener {
            val messageText = binding.messageEditText.text.toString().trim()
            if (messageText.isNotEmpty()) {
                sendMessage(messageText)
            }
        }
    }

    private fun fetchBroadcastInfo(){
        broadcastId?.let {
            firestore.collection("broadcasts").document(it).get()
                .addOnSuccessListener { doc ->
                    binding.topicTextView.text = doc.getString("topic") ?: "Broadcast"
                }
        }
    }

    private fun listenForMessages() {
        broadcastId?.let {
            firestore.collection("broadcasts").document(it).collection("messages")
                .orderBy("timestamp", Query.Direction.ASCENDING)
                .addSnapshotListener { snapshots, e ->
                    if (e != null) { return@addSnapshotListener }

                    for (doc in snapshots!!.documentChanges) {
                        if (doc.type == com.google.firebase.firestore.DocumentChange.Type.ADDED) {
                            val message = doc.document.toObject(Message::class.java)
                            messages.add(message)
                            chatAdapter.notifyItemInserted(messages.size - 1)
                            binding.broadcastChatRecyclerView.scrollToPosition(messages.size - 1)
                        }
                    }
                }
        }
    }

    private fun sendMessage(text: String) {
        val currentUserId = auth.currentUser?.uid ?: return
        val roomId = broadcastId ?: return

        val messageId = firestore.collection("broadcasts").document(roomId).collection("messages").document().id
        val message = Message(
            id = messageId,
            senderId = currentUserId,
            text = text
            // receiverId is not needed for a group broadcast
        )

        firestore.collection("broadcasts").document(roomId).collection("messages").document(messageId).set(message)
            .addOnSuccessListener { binding.messageEditText.text.clear() }
    }
}