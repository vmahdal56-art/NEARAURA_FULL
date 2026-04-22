package com.nearaura.app.viewmodel

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.nearaura.app.data.User // Import the User model
import com.nearaura.app.network.Resource

/**
 * A ViewModel scoped to the MainActivity to share full User objects between fragments.
 */
class SharedScanViewModel : ViewModel() {

    // This LiveData will now be updated with the full User objects.
    private val _bleDiscoveredUsers = MutableLiveData<Resource<List<User>>>()
    val bleDiscoveredUsers: LiveData<Resource<List<User>>> = _bleDiscoveredUsers

    fun postBleUsers(result: Resource<List<User>>) {
        _bleDiscoveredUsers.postValue(result)
    }
}
