package com.nearaura.app.crypto

import android.util.Base64
import javax.crypto.Cipher
import javax.crypto.spec.IvParameterSpec
import javax.crypto.spec.SecretKeySpec

/**
 * Handles symmetric (AES) encryption/decryption for E2EE chat.
 * NOTE: Asymmetric operations are mocked for conceptual clarity.
 */
class EncryptionManager {

    private val algorithm = "AES/CBC/PKCS5Padding"
    private val keyAlgorithm = "AES"

    fun encrypt(plaintext: String, base64Key: String, base64IV: String): String {
        val keyBytes = Base64.decode(base64Key, Base64.DEFAULT)
        val ivBytes = Base64.decode(base64IV, Base64.DEFAULT)
        val key = SecretKeySpec(keyBytes, keyAlgorithm)
        val iv = IvParameterSpec(ivBytes)
        val cipher = Cipher.getInstance(algorithm)
        cipher.init(Cipher.ENCRYPT_MODE, key, iv)
        val encryptedBytes = cipher.doFinal(plaintext.toByteArray(Charsets.UTF_8))
        return Base64.encodeToString(encryptedBytes, Base64.NO_WRAP)
    }

    fun decrypt(base64Ciphertext: String, base64Key: String, base64IV: String): String {
        val keyBytes = Base64.decode(base64Key, Base64.DEFAULT)
        val ivBytes = Base64.decode(base64IV, Base64.DEFAULT)
        val encryptedBytes = Base64.decode(base64Ciphertext, Base64.DEFAULT)
        val key = SecretKeySpec(keyBytes, keyAlgorithm)
        val iv = IvParameterSpec(ivBytes)
        val cipher = Cipher.getInstance(algorithm)
        cipher.init(Cipher.DECRYPT_MODE, key, iv)
        val decryptedBytes = cipher.doFinal(encryptedBytes)
        return String(decryptedBytes, Charsets.UTF_8)
    }

    // --- MOCKED Asymmetric Operations for Group Key Transport ---

    fun encryptSymmetricKeyWithPublicKey(base64SymmetricKey: String, recipientPublicKey: String): String {
        // MOCK: In a real app, this would use RSA/ECC to encrypt the key.
        return "GSK_Encrypted_For_$recipientPublicKey"
    }

    fun decryptSymmetricKeyWithPrivateKey(base64EncryptedKey: String, userPrivateKey: String): String {
        // MOCK: Simulate decryption.
        if (base64EncryptedKey.startsWith("GSK_Encrypted_For_")) {
            // Return the known mock Group Symmetric Key.
            return "GROUP_SECRET_KEY_12345678901234567890123456789012"
        }
        throw IllegalStateException("Mock decryption failed.")
    }
}