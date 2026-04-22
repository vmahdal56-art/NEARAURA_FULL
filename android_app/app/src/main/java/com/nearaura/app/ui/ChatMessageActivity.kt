package com.nearaura.app.ui

import android.os.Bundle
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.FirebaseFirestore
import com.google.firebase.firestore.Query
import com.nearaura.app.data.Message
import com.nearaura.app.databinding.ActivityChatMessageBinding
import com.nearaura.app.e2ee.SignalProtocolHelper
import org.whispersystems.libsignal.SignalProtocolAddress
import org.whispersystems.libsignal.protocol.PreKeySignalMessage
import java.util.Calendar
import java.util.Date

class ChatMessageActivity : AppCompatActivity() {

    private lateinit var binding: ActivityChatMessageBinding
    private lateinit var chatAdapter: ChatAdapter
    private val messages = mutableListOf<Message>()

    private val firestore by lazy { FirebaseFirestore.getInstance() }
    private val auth by lazy { FirebaseAuth.getInstance() }

    private var otherUserId: String? = null
    private var chatRoomId: String? = null

    private lateinit var signalHelper: SignalProtocolHelper

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityChatMessageBinding.inflate(layoutInflater)
        setContentView(binding.root)

        otherUserId = intent.getStringExtra("OTHER_USER_ID")
        if (otherUserId == null) {
            finish()
            return
        }

        val otherUserAddress = SignalProtocolAddress(otherUserId, 1)
        signalHelper = SignalProtocolHelper(this, otherUserAddress)
        signalHelper.register()

        setupRecyclerView()
        setupSendButton()
        getOrCreateChatRoom()
    }

    private fun setupRecyclerView() {
        chatAdapter = ChatAdapter(messages)
        binding.chatRecyclerView.apply {
            layoutManager = LinearLayoutManager(this@ChatMessageActivity).apply {
                stackFromEnd = true
            }
            adapter = chatAdapter
        }
    }

    private fun setupSendButton() {
        binding.sendButton.setOnClickListener {
            val messageText = binding.messageEditText.text.toString().trim()
            if (messageText.isNotEmpty()) {
                val currentUserId = auth.currentUser?.uid ?: return@setOnClickListener

                firestore.collection("users").document(currentUserId).get().addOnSuccessListener { userDoc ->
                    val isVerified = userDoc.getString("verificationStatus") == "verified"
                    val dailyMessageCount = userDoc.getLong("dailyMessageCount") ?: 0
                    val lastMessageTimestamp = userDoc.getTimestamp("lastMessageTimestamp")

                    val calendar = Calendar.getInstance()
                    val today = calendar.get(Calendar.DAY_OF_YEAR)

                    calendar.time = lastMessageTimestamp?.toDate() ?: Date(0)
                    val lastMessageDay = calendar.get(Calendar.DAY_OF_YEAR)

                    if (isVerified || (today != lastMessageDay || dailyMessageCount < 5)) {
                        if (today != lastMessageDay) {
                            firestore.collection("users").document(currentUserId)
                                .update("dailyMessageCount", 0)
                        }
                        sendMessage(messageText)
                    } else {
                        showUpgradePrompt("You've reached your daily Guest limit. Verify now for unlimited Auras.")
                    }
                }
            }
        }
    }

    private fun getOrCreateChatRoom() {
        val currentUserId = auth.currentUser?.uid ?: return
        val otherId = otherUserId ?: return
        val chatRoomMembers = listOf(currentUserId, otherId).sorted()
        chatRoomId = chatRoomMembers.joinToString("_")
        listenForMessages()
    }

    private fun listenForMessages() {
        chatRoomId?.let {
            firestore.collection("chats").document(it).collection("messages")
                .orderBy("timestamp", Query.Direction.ASCENDING)
                .addSnapshotListener { snapshots, e ->
                    if (e != null) { return@addSnapshotListener }

                    for (doc in snapshots!!.documentChanges) {
                        if (doc.type == com.google.firebase.firestore.DocumentChange.Type.ADDED) {
                            val message = doc.document.toObject(Message::class.java)
                            val decryptedText = try {
                                val preKeySignalMessage = PreKeySignalMessage(message.text.toByteArray())
                                signalHelper.decrypt(preKeySignalMessage)
                            } catch (e: Exception) {
                                "[Could not decrypt message]"
                            }
                            val decryptedMessage = message.copy(text = decryptedText)
                            messages.add(decryptedMessage)
                            chatAdapter.notifyItemInserted(messages.size - 1)
                            binding.chatRecyclerView.scrollToPosition(messages.size - 1)
                        }
                    }
                }
        }
    }

    private fun sendMessage(text: String) {
        val currentUserId = auth.currentUser?.uid ?: return
        val otherId = otherUserId ?: return
        val roomId = chatRoomId ?: return

        val encryptedCiphertext = signalHelper.encrypt(text)
        val encryptedText = String(encryptedCiphertext.serialize())

        val messageId = firestore.collection("chats").document(roomId).collection("messages").document().id
        val message = Message(
            id = messageId,
            senderId = currentUserId,
            receiverId = otherId,
            text = encryptedText
        )

        firestore.collection("chats").document(roomId).collection("messages").document(messageId).set(message)
            .addOnSuccessListener { 
                binding.messageEditText.text.clear()
                firestore.collection("users").document(currentUserId).get().addOnSuccessListener { userDoc ->
                    val isVerified = userDoc.getString("verificationStatus") == "verified"
                    if(!isVerified) {
                        val dailyMessageCount = userDoc.getLong("dailyMessageCount") ?: 0
                        firestore.collection("users").document(currentUserId)
                            .update("dailyMessageCount", dailyMessageCount + 1, "lastMessageTimestamp", com.google.firebase.Timestamp.now())
                    }
                }
            }
    }

    private fun showUpgradePrompt(message: String) {
        AlertDialog.Builder(this)
            .setTitle("Sovereign Gate")
            .setMessage(message)
            .setPositiveButton("Verify Now") { _, _ ->
                // Here you would start the verification activity
            }
            .setNegativeButton("Later", null)
            .show()
    }
}