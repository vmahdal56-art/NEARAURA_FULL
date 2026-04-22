package com.nearaura.app.engine
import android.media.AudioManager
import android.media.ToneGenerator

/**
 * 🔊 AUDIO ENGINE (ANDROID)
 * Generuje čisté frekvence. Žádné MP3.
 */
object AudioEngine {
    private val toneGen = ToneGenerator(AudioManager.STREAM_MUSIC, 100)

    fun playTone(freq: Int) {
        // Simulace frekvence pomocí ToneGenerator (zjednodušené pro start)
        // V plné verzi zde bude AudioTrack pro přesných 432Hz
        toneGen.startTone(ToneGenerator.TONE_DTMF_1, 200) 
    }
    
    fun playLockSound() {
        toneGen.startTone(ToneGenerator.TONE_CDMA_PIP, 150)
    }
}
