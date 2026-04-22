package com.nearaura.app.data

import com.google.firebase.firestore.ServerTimestamp
import java.util.Date

data class Broadcast(
    val id: String = "",
    val creatorId: String = "",
    val creatorName: String = "",
    val topic: String = "",
    @ServerTimestamp val createdAt: Date? = null,
    val participants: List<String> = emptyList()
)