package com.nearaura.app.e2ee

import android.content.Context
import org.whispersystems.libsignal.IdentityKeyPair
import org.whispersystems.libsignal.SignalProtocolAddress
import org.whispersystems.libsignal.ecc.Curve
import org.whispersystems.libsignal.ecc.ECKeyPair
import org.whispersystems.libsignal.protocol.CiphertextMessage
import org.whispersystems.libsignal.protocol.PreKeySignalMessage
import org.whispersystems.libsignal.protocol.SignalMessage
import org.whispersystems.libsignal.state.PreKeyBundle
import org.whispersystems.libsignal.state.PreKeyRecord
import org.whispersystems.libsignal.state.SignalProtocolStore
import org.whispersystems.libsignal.state.SignedPreKeyRecord
import org.whispersystems.libsignal.util.KeyHelper

class SignalProtocolHelper(context: Context, private val remoteAddress: SignalProtocolAddress) {

    private val store: InMemorySignalProtocolStore = InMemorySignalProtocolStore()

    // This is called once when the user registers
    fun register(): PreKeyBundle {
        val identityKeyPair: IdentityKeyPair = KeyHelper.generateIdentityKeyPair()
        val registrationId: Int = KeyHelper.generateRegistrationId(false)
        val preKeys: List<PreKeyRecord> = KeyHelper.generatePreKeys(0, 100)
        val signedPreKey: SignedPreKeyRecord = KeyHelper.generateSignedPreKey(identityKeyPair, 0)

        store.storeIdentityKeyPair(identityKeyPair)
        store.storeLocalRegistrationId(registrationId)
        preKeys.forEach { store.storePreKey(it.id, it) }
        store.storeSignedPreKey(signedPreKey.id, signedPreKey)

        // This bundle would be published to your server
        return PreKeyBundle(
            registrationId,
            remoteAddress.deviceId,
            preKeys[0].id,
            preKeys[0].keyPair.publicKey,
            signedPreKey.id,
            signedPreKey.keyPair.publicKey,
            signedPreKey.signature,
            identityKeyPair.publicKey
        )
    }

    fun processPreKeyBundle(preKeyBundle: PreKeyBundle) {
        val sessionBuilder = org.whispersystems.libsignal.SessionBuilder(store, remoteAddress)
        sessionBuilder.process(preKeyBundle)
    }

    fun encrypt(message: String): CiphertextMessage {
        val sessionCipher = org.whispersystems.libsignal.SessionCipher(store, remoteAddress)
        return sessionCipher.encrypt(message.toByteArray())
    }

    fun decrypt(ciphertextMessage: CiphertextMessage): String {
        val sessionCipher = org.whispersystems.libsignal.SessionCipher(store, remoteAddress)
        val plaintext = if (ciphertextMessage.type == CiphertextMessage.PREKEY_TYPE) {
            sessionCipher.decrypt(PreKeySignalMessage(ciphertextMessage.serialize()))
        } else {
            sessionCipher.decrypt(SignalMessage(ciphertextMessage.serialize()))
        }
        return String(plaintext)
    }
}