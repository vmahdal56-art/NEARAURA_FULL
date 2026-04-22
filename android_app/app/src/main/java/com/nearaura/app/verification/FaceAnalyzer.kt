package com.nearaura.app.verification

import android.annotation.SuppressLint
import androidx.camera.core.ImageAnalysis
import androidx.camera.core.ImageProxy
import com.google.mlkit.vision.common.InputImage
import com.google.mlkit.vision.face.FaceDetection
import com.google.mlkit.vision.face.FaceDetectorOptions

class FaceAnalyzer(private val listener: (result: LivenessResult) -> Unit) : ImageAnalysis.Analyzer {

    private val detector = FaceDetection.getClient(
        FaceDetectorOptions.Builder()
            .setPerformanceMode(FaceDetectorOptions.PERFORMANCE_MODE_FAST)
            .setClassificationMode(FaceDetectorOptions.CLASSIFICATION_MODE_ALL)
            .build()
    )

    private var hasTurnedLeft = false
    private var hasTurnedRight = false

    @SuppressLint("UnsafeOptInUsageError")
    override fun analyze(imageProxy: ImageProxy) {
        val mediaImage = imageProxy.image
        if (mediaImage != null) {
            val image = InputImage.fromMediaImage(mediaImage, imageProxy.imageInfo.rotationDegrees)

            detector.process(image)
                .addOnSuccessListener { faces ->
                    if (faces.isNotEmpty()) {
                        val face = faces[0]

                        // Liveness Check: Has the user turned their head?
                        if (face.headEulerAngleY > 20) { // Turned right
                            hasTurnedRight = true
                        }
                        if (face.headEulerAngleY < -20) { // Turned left
                            hasTurnedLeft = true
                        }

                        if (hasTurnedLeft && hasTurnedRight) {
                            listener(LivenessResult.SUCCESS)
                            detector.close()
                        }
                    }
                }
                .addOnFailureListener { e ->
                    listener(LivenessResult.FAILURE)
                }
                .addOnCompleteListener { 
                    imageProxy.close()
                }
        }
    }
}

enum class LivenessResult {
    SUCCESS,
    FAILURE
}