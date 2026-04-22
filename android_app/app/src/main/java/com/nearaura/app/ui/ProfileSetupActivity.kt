package com.nearaura.app.ui

import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.MutableLiveData

class ProfileSetupActivity : AppCompatActivity() {

    // FIX: Declare the status tracker at the class level
    private val uploadStatus = MutableLiveData<String>()

    private fun handleUpload() {
        uploadStatus.value = "Uploading to the Orchard..."
    }
}