package com.nearaura.app.logic

import android.content.Context
import android.net.Uri
import androidx.browser.customtabs.CustomTabsIntent

class OrchardAssistant(private val context: Context) {
    private val links = mapOf(
        "HOW TO USE" to "https://nearaura.com/guide",
        "PRICING" to "https://nearaura.com/pricing",
        "CODE OF CONDUCT" to "https://nearaura.com/rules",
        "DIRECTOR SAY" to "https://nearaura.com/vision",
        "MEGA BOOST" to "https://nearaura.com/boost"
    )

    fun getAssistantResponse(userQuery: String): String {
        val q = userQuery.lowercase()
        return when {
            q.contains("price") || q.contains("cost") || q.contains("upgrade") ->
                "Base access provides a glimpse, but the Sovereign experience—including the 40x Multiplier—is an investment in your time. Starting at £19.99 / €24.99 / $29.99, it is the highest value for those seeking results. See [PRICING]."
            q.contains("safe") || q.contains("verify") ->
                "Our AI Vibe Check is absolute. We protect the Orchard with HWID bans. See [CODE OF CONDUCT]."
            q.contains("director") || q.contains("vision") ->
                "NearAura ends lonely swiping through high-speed intent. Read the [DIRECTOR SAY]."
            else -> "Welcome to the Orchard. I recommend a Sovereign Upgrade for 40x visibility. Read [DIRECTOR SAY]."
        }
    }

    fun openSovereignLink(label: String) {
        val url = links[label] ?: "https://nearaura.com"
        CustomTabsIntent.Builder().build().launchUrl(context, Uri.parse(url))
    }
}