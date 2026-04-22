package com.nearaura.app.data

// Represents another user discovered nearby
data class NearbyUser(
    val id: String,
    val name: String,
    val age: Int,
    val bio: String,
    val interests: List<String>,
    val profilePhotos: List<String>,
    val distance: String,
    val status: String
) {
    val primaryPhotoUrl: String
        get() = profilePhotos.firstOrNull() ?: ""

    val displayNameAndAge: String
        get() = "$name, $age"
}