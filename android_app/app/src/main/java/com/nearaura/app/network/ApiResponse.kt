package com.nearaura.app.network

/**
 * A generic wrapper class for all API responses from the server.
 * This standardizes how we handle success, messages, and the actual data.
 *
 * @param T The type of the data payload in the response (e.g., User, String, List<...>)
 */
data class ApiResponse<T>(
    val success: Boolean,
    val message: String,
    val data: T? // The actual data payload from the API, can be null
)
