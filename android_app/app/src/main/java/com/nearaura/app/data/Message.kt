package com.nearaura.app.data

import com.google.firebase.firestore.ServerTimestamp
import java.util.Date

data class Message(
    val id: String = "",
    val senderId: String = "",
    val receiverId: String = "",
    val text: String = "",
    @ServerTimestamp val timestamp: Date? = null
)