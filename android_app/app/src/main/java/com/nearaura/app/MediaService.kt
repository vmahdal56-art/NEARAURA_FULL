package com.nearaura.app

import android.content.Context
import android.media.MediaPlayer
import android.media.MediaRecorder
import android.net.Uri
import java.io.File
import java.io.IOException

class MediaService(private val context: Context) {

    private var mediaRecorder: MediaRecorder? = null
    private var mediaPlayer: MediaPlayer? = null
    private var outputFile: File? = null

    fun startRecording() {
        outputFile = File.createTempFile("vibe_", ".mp4", context.cacheDir)
        mediaRecorder = MediaRecorder().apply {
            setAudioSource(MediaRecorder.AudioSource.MIC)
            setVideoSource(MediaRecorder.VideoSource.CAMERA)
            setOutputFormat(MediaRecorder.OutputFormat.MPEG_4)
            setAudioEncoder(MediaRecorder.AudioEncoder.AAC)
            setVideoEncoder(MediaRecorder.VideoEncoder.H264)
            setOutputFile(outputFile?.absolutePath)
            setVideoSize(640, 480)
            setVideoFrameRate(30)
            setMaxDuration(15000) // 15 seconds
            try {
                prepare()
                start()
            } catch (e: IOException) {
                // Handle exception
            }
        }
    }

    fun stopRecording(): String? {
        mediaRecorder?.apply {
            stop()
            release()
        }
        mediaRecorder = null
        return outputFile?.absolutePath
    }

    fun playVibe(url: String) {
        mediaPlayer = MediaPlayer().apply {
            try {
                setDataSource(context, Uri.parse(url))
                prepare()
                start()
            } catch (e: IOException) {
                // Handle exception
            }
        }
    }

    fun stopPlayback() {
        mediaPlayer?.release()
        mediaPlayer = null
    }
}