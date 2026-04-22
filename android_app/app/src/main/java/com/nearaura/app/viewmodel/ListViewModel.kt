package com.nearaura.app.viewmodel

import androidx.lifecycle.LiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.liveData
import com.nearaura.app.data.User
import com.nearaura.app.network.Resource
import com.nearaura.app.repository.MainRepository
import kotlinx.coroutines.Dispatchers

class ListViewModel(private val mainRepository: MainRepository) : ViewModel() {

    fun fetchUsers(
        isDatingMode: Boolean = false, 
        interests: List<String> = emptyList(),
        minAge: Int? = null,
        maxAge: Int? = null,
        distance: Int? = null
    ): LiveData<Resource<List<User>>> = liveData(Dispatchers.IO) {
        emit(Resource.Loading())
        try {
            val users = mainRepository.getUsers(isDatingMode, interests, minAge, maxAge, distance)
            emit(Resource.Success(users))
        } catch (e: Exception) {
            emit(Resource.Error("Failed to fetch users: ${e.message}"))
        }
    }
}