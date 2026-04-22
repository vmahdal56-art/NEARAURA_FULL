package com.nearaura.app.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import androidx.lifecycle.MutableLiveData
import com.nearaura.app.repository.MainRepository
import com.nearaura.app.utils.Resource
import com.nearaura.app.data.User
import kotlinx.coroutines.launch

class MainViewModel(private val repository: MainRepository) : ViewModel() {

    fun startGeoScan(sharedViewModel: SharedScanViewModel) {
        viewModelScope.launch {
            val liveData = sharedViewModel.bleDiscoveredUsers as? MutableLiveData<Resource<List<User>>>
            liveData?.postValue(Resource.Loading())

            try {
                // Using the actual method found in your MainRepository.kt
                val users = repository.getUsers(isDatingMode = false)
                liveData?.postValue(Resource.Success(users))
            } catch (e: Exception) {
                liveData?.postValue(Resource.Error("Scan failed: ${e.message}"))
            }
        }
    }
}
