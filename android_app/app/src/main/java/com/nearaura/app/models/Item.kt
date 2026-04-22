package com.nearaura.app.models // This should match the package you just created

/**
 * This data class represents a single discoverable item (e.g., a user profile)
 * that your API returns.
 *
 * TODO: You should update the properties (id, name, imageUrl) to match
 * what your server actually sends in the JSON response.
 */
data class Item(
    val id: String,
    val name: String,
    val imageUrl: String
    // Add other properties here, for example:
    // val age: Int,
    // val bio: String
)
    