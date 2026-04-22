package com.nearaura.app.data

import com.google.firebase.firestore.DocumentId
import java.util.Date

data class ChatListItem(
    @DocumentId
    val chatId: String = "",
    val otherUserId: String = "",
    val otherUserName: String = "",
    val otherUserPhotoUrl: String = "",
    val lastMessage: String = "",
    val timestamp: Date = Date(),
    val unreadCount: Int = 0
)