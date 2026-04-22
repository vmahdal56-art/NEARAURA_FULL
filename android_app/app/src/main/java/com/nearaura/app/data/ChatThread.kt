package com.nearaura.app.data

import com.google.firebase.firestore.ServerTimestamp
import java.util.Date

data class ChatThread(
    val id: String = "",
    val otherUserId: String = "",
    val otherUserName: String = "",
    val otherUserProfilePictureUrl: String? = null,
    val lastMessage: String = "",
    @ServerTimestamp val timestamp: Date? = null
)