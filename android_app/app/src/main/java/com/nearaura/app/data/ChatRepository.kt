package com.nearaura.app.data

import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.database.*
import com.nearaura.app.crypto.EncryptionManager
import kotlinx.coroutines.channels.awaitClose
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.callbackFlow
import java.util.Date

/**
 * Repository for handling encrypted group chat messages using Realtime Database.
 */
class ChatRepository(
    private val auth: FirebaseAuth,
    private val rtdb: DatabaseReference,
    private val encryptionManager: EncryptionManager
) {

    // --- MOCK DATA for Group Encryption Demo ---
    private val mockGroupSymmetricKey = "GROUP_SECRET_KEY_12345678901234567890123456789012"
    private val mockSharedIV = "MTIzNDU2Nzg5MDEyMzQ1Ng=="
    private val mockGroupMembers = mapOf("userA_id" to "PUBKEY_A", "userB_id" to "PUBKEY_B")
    private val mockUserPrivateKey = "PRIVATEKEY_A_SECRET"

    private fun getMessagesRef(chatId: String): DatabaseReference = rtdb.child("chats").child(chatId).child("messages")

    fun sendEncryptedGroupMessage(chatId: String, plaintext: String) {
        val currentUserId = auth.currentUser?.uid ?: return

        // 1. Encrypt the message content
        val ciphertext = encryptionManager.encrypt(plaintext, mockGroupSymmetricKey, mockSharedIV)

        // 2. Encrypt the Group Symmetric Key for each member
        val encryptedKeyMap = mutableMapOf<String, String>()
        mockGroupMembers.forEach { (userId, publicKey) ->
            val encryptedKey = encryptionManager.encryptSymmetricKeyWithPublicKey(mockGroupSymmetricKey, publicKey)
            encryptedKeyMap[userId] = encryptedKey
        }

        // 3. Prepare and send the message payload
        val messageRef = getMessagesRef(chatId).push()
        val message = ChatMessage(
            id = messageRef.key,
            senderId = currentUserId,
            ciphertext = ciphertext,
            iv = mockSharedIV,
            encryptedKeys = encryptedKeyMap,
            timestamp = Date().time
        )
        messageRef.setValue(message)
    }

    fun getMessagesFlow(chatId: String): Flow<List<ChatMessage>> = callbackFlow {
        val currentUserId = auth.currentUser?.uid ?: return@callbackFlow

        val listener = object : ValueEventListener {
            override fun onDataChange(snapshot: DataSnapshot) {
                val messages = snapshot.children.mapNotNull { child ->
                    val encryptedMessage = child.getValue(ChatMessage::class.java)?.copy(id = child.key)
                    encryptedMessage?.decryptedText = try {
                        val userEncryptedKey = encryptedMessage?.encryptedKeys?.get(currentUserId)
                        if (userEncryptedKey == null) {
                            "[Encrypted: Key Missing]"
                        } else {
                            val groupKey = encryptionManager.decryptSymmetricKeyWithPrivateKey(userEncryptedKey, mockUserPrivateKey)
                            encryptionManager.decrypt(encryptedMessage.ciphertext, groupKey, encryptedMessage.iv)
                        }
                    } catch (e: Exception) {
                        "[Decryption Failed]"
                    }
                    encryptedMessage
                }.sortedBy { it.timestamp }
                trySend(messages)
            }

            override fun onCancelled(error: DatabaseError) {
                close(error.toException())
            }
        }
        getMessagesRef(chatId).addValueEventListener(listener)
        awaitClose { getMessagesRef(chatId).removeEventListener(listener) }
    }
}