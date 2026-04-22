package com.nearaura.app.repository

import com.google.firebase.firestore.FirebaseFirestore
import com.google.firebase.firestore.Query
import com.nearaura.app.data.User
import kotlinx.coroutines.tasks.await
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow

class MainRepository(private val firestore: FirebaseFirestore) {

    // This is a simplified implementation. 
    // For a real-world app, you would also pass the user's location to filter by distance.
    suspend fun getUsers(isDatingMode: Boolean, interests: List<String> = emptyList(), minAge: Int? = null, maxAge: Int? = null, distance: Int? = null): List<User> {
        var query: Query = firestore.collection("users")

        if (isDatingMode) {
            query = query.whereEqualTo("isDatingModeEnabled", true)
        } else if (interests.isNotEmpty()) {
            query = query.whereArrayContainsAny("interests", interests)
        }

        // Note: Firestore does not support range filters on multiple fields.
        // A more complex solution (e.g., using a backend function or denormalizing data) 
        // would be needed to filter by both age and distance effectively.
        // For now, we will demonstrate filtering by age.
        if (minAge != null && maxAge != null) {
            // This requires having an 'age' field in your Firestore documents.
            // You would calculate and store this when the user's birthDate is set.
            query = query.whereGreaterThanOrEqualTo("age", minAge)
                         .whereLessThanOrEqualTo("age", maxAge)
        }

        val snapshot = query.limit(20).get().await()
        return snapshot.toObjects(User::class.java)
    }

    // 🔱 NOVÁ OCEL PRO PROFILE VIEW MODEL
    fun getUser(uid: String): Flow<User?> = flow {
        try {
            val snapshot = firestore.collection("users").document(uid).get().await()
            val user = snapshot.toObject(User::class.java)
            emit(user)
        } catch (e: Exception) {
            emit(null)
        }
    }
}