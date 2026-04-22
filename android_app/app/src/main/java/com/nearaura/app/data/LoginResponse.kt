package com.nearaura.app.data

// This is what your server sends back after a successful login.
data class LoginResponse(
    val token: String,
    val user: User
)
    