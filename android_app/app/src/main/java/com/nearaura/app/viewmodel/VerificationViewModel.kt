package com.nearaura.app.viewmodel

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.google.firebase.functions.FirebaseFunctions
import com.nearaura.app.network.Resource
import kotlinx.coroutines.launch

class VerificationViewModel : ViewModel() {

    private val functions = FirebaseFunctions.getInstance()

    private val _aiVerificationResult = MutableLiveData<Resource<Boolean>>()
    val aiVerificationResult: LiveData<Resource<Boolean>> = _aiVerificationResult

    fun verifyPhotosWithAI() {
        viewModelScope.launch {
            _aiVerificationResult.postValue(Resource.Loading())
            functions.getHttpsCallable("verifyPhotosWithAI").call()
                .addOnSuccessListener { 
                    _aiVerificationResult.postValue(Resource.Success(true))
                }
                .addOnFailureListener { e ->
                    _aiVerificationResult.postValue(Resource.Error(e.message ?: "Unknown error"))
                }
        }
    }
}