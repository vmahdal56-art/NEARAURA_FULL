package com.nearaura.app;

import org.signal.libsignal.metadata.ProtocolStore;
import org.signal.libsignal.protocol.IdentityKeyPair;
import org.signal.libsignal.protocol.KeyHelper;
import org.signal.libsignal.protocol.state.PreKeyRecord;
import org.signal.libsignal.protocol.state.SignedPreKeyRecord;
import java.util.List;

public class EncryptionEngine {
    // Generates the unique "Identity" for this installation of NearAura
    public static IdentityKeyPair generateIdentity() {
        return KeyHelper.generateIdentityKeyPair();
    }

    // Generates the "One-Time Use" keys for the E2EE Handshake
    public static List<PreKeyRecord> generatePreKeys() {
        return KeyHelper.generatePreKeys(0, 100);
    }
}
