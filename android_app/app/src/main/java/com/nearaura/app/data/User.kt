package com.nearaura.app.data

import androidx.recyclerview.widget.DiffUtil

/**
 * Updated Intent System to match UI references
 */
enum class UserIntent {
    DATING, 
    FRIENDS,    // Changed from FRIENDSHIP to match ProfileFragment
    COMMUNITY   // Changed from NETWORKING to match ProfileFragment
}

data class User(
    val uid: String = "",
    val name: String = "", // 🔱 PŘIDÁNO: ProfileAdapter tohle nutně potřebuje
    val userName: String = "", // 🔱 PŘIDÁNO: RadarUserAdapter tohle hledá
    val displayName: String = "",
    val vibeVideoUrl: String = "",
    val profilePhotoUrls: List<String> = emptyList(),
    val auraFlavors: List<String> = emptyList(),
    val auraScore: Int = 0, // 🔱 PŘIDÁNO: OrchardGridAdapter na tom minule kleknul
    val isVerified: Boolean = false,
    val isMegaBoosted: Boolean = false,
    val isDatingModeEnabled: Boolean = false,
    val interests: List<String> = emptyList(),
    val currentIntent: String = UserIntent.FRIENDS.name // 🔱 OPRAVENO: Ukládáme jako čistý text, ať to neřve při kompilaci!
)

class UserDiffCallback : DiffUtil.ItemCallback<User>() {
    override fun areItemsTheSame(oldItem: User, newItem: User): Boolean = oldItem.uid == newItem.uid
    override fun areContentsTheSame(oldItem: User, newItem: User): Boolean = oldItem == newItem
}