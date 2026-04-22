package com.nearaura.app.viewmodel
import com.nearaura.app.repository.MainRepository

import android.net.Uri
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.launch

class ProfileViewModel(private val repository: MainRepository) : ViewModel() {

    fun uploadProfilePhoto(uri: Uri, slotIndex: Int) {
        viewModelScope.launch {
            // In a real app, you would get the file from the URI
            // For now, we will just pass a placeholder
            // repository.uploadProfilePhoto(File(uri.path!!), slotIndex)
        }
    }
}