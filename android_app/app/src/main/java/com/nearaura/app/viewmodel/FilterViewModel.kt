package com.nearaura.app.viewmodel

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel

data class FilterState(
    val minAge: Int = 18,
    val maxAge: Int = 35,
    val distance: Int = 50
)

class FilterViewModel : ViewModel() {

    private val _filterState = MutableLiveData<FilterState>()
    val filterState: LiveData<FilterState> = _filterState

    fun applyFilters(minAge: Int, maxAge: Int, distance: Int) {
        _filterState.value = FilterState(minAge, maxAge, distance)
    }
}