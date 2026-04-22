package com.nearaura.app.data

import com.google.firebase.firestore.GeoPoint
import com.google.firebase.firestore.ServerTimestamp
import java.util.Date

data class Meetup(
    val id: String = "",
    val creatorId: String = "",
    val title: String = "",
    val description: String = "",
    val location: GeoPoint? = null,
    val locationName: String = "",
    @ServerTimestamp val createdAt: Date? = null,
    val eventTime: Date? = null,
    val attendees: List<String> = emptyList()
)