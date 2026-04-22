package com.nearaura.app.data

import java.util.Date

/**
 * Data class for an END-TO-END ENCRYPTED group chat message.
 */
data class ChatMessage(
    val id: String? = null,
    val senderId: String = "",
    val ciphertext: String = "",
    val iv: String = "",
    // Key: Recipient User ID, Value: Group Key encrypted with Recipient's Public Key
    val encryptedKeys: Map<String, String> = emptyMap(),
    val timestamp: Long = Date().time
) {
    // Transient field to hold the decrypted message locally after processing
    @Transient var decryptedText: String? = null
}