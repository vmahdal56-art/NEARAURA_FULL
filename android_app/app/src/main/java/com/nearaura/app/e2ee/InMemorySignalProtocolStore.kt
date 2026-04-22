package com.nearaura.app.e2ee

import org.whispersystems.libsignal.IdentityKey
import org.whispersystems.libsignal.IdentityKeyPair
import org.whispersystems.libsignal.SignalProtocolAddress
import org.whispersystems.libsignal.state.IdentityKeyStore
import org.whispersystems.libsignal.state.PreKeyRecord
import org.whispersystems.libsignal.state.SessionRecord
import org.whispersystems.libsignal.state.SignalProtocolStore
import org.whispersystems.libsignal.state.SignedPreKeyRecord

class InMemorySignalProtocolStore : SignalProtocolStore {

    private var identityKeyPair: IdentityKeyPair? = null
    private var localRegistrationId: Int? = null
    private val preKeys = mutableMapOf<Int, PreKeyRecord>()
    private val signedPreKeys = mutableMapOf<Int, SignedPreKeyRecord>()
    private val sessions = mutableMapOf<SignalProtocolAddress, SessionRecord>()
    private val identityKeys = mutableMapOf<SignalProtocolAddress, IdentityKey>()

    fun storeIdentityKeyPair(identityKeyPair: IdentityKeyPair) {
        this.identityKeyPair = identityKeyPair
    }

    fun storeLocalRegistrationId(registrationId: Int) {
        this.localRegistrationId = registrationId
    }

    override fun getIdentityKeyPair(): IdentityKeyPair {
        return identityKeyPair!!
    }

    override fun getLocalRegistrationId(): Int {
        return localRegistrationId!!
    }

    override fun saveIdentity(address: SignalProtocolAddress, identityKey: IdentityKey): Boolean {
        identityKeys[address] = identityKey
        return true
    }

    override fun isTrustedIdentity(address: SignalProtocolAddress, identityKey: IdentityKey, direction: IdentityKeyStore.Direction): Boolean {
        return true
    }

    override fun getIdentity(address: SignalProtocolAddress): IdentityKey? {
        return identityKeys[address]
    }

    override fun loadPreKey(preKeyId: Int): PreKeyRecord {
        return preKeys[preKeyId]!!
    }

    override fun storePreKey(preKeyId: Int, record: PreKeyRecord) {
        preKeys[preKeyId] = record
    }

    override fun containsPreKey(preKeyId: Int): Boolean {
        return preKeys.containsKey(preKeyId)
    }

    override fun removePreKey(preKeyId: Int) {
        preKeys.remove(preKeyId)
    }

    override fun loadSession(address: SignalProtocolAddress): SessionRecord {
        return sessions[address] ?: SessionRecord()
    }

    override fun getSubDeviceSessions(name: String): List<Int> {
        return emptyList()
    }

    override fun storeSession(address: SignalProtocolAddress, record: SessionRecord) {
        sessions[address] = record
    }

    override fun containsSession(address: SignalProtocolAddress): Boolean {
        return sessions.containsKey(address)
    }

    override fun deleteSession(address: SignalProtocolAddress) {
        sessions.remove(address)
    }

    override fun deleteAllSessions(name: String) {
        sessions.clear()
    }

    override fun loadSignedPreKey(signedPreKeyId: Int): SignedPreKeyRecord {
        return signedPreKeys[signedPreKeyId]!!
    }

    override fun loadSignedPreKeys(): List<SignedPreKeyRecord> {
        return signedPreKeys.values.toList()
    }

    override fun storeSignedPreKey(signedPreKeyId: Int, record: SignedPreKeyRecord) {
        signedPreKeys[signedPreKeyId] = record
    }

    override fun containsSignedPreKey(signedPreKeyId: Int): Boolean {
        return signedPreKeys.containsKey(signedPreKeyId)
    }

    override fun removeSignedPreKey(signedPreKeyId: Int) {
        signedPreKeys.remove(signedPreKeyId)
    }
}