package com.nearaura.app.dna

/**
 * 🔱 NEARAURA MASTER VAULT (ANDROID)
 * STATUS: 102% DNA | COLOR SYNCED | SOURCE OF TRUTH
 */

object DNAVault {
    const val VERSION = "5.0 (Titan)"
    const val INITIALS = "JV JM PM LA PM LH YM VM"
    const val MOTTO = "Truth is the only currency."

    object Legacy {
        const val GUARDIAN_EMAIL = "pmahdal@gmail.com"
        const val SUCCESSOR_EMAIL = "alimilamia@yahoo.fr"
        const val INACTIVITY_LIMIT_MS = 7776000000L
    }

    data class JarmilaTarget(
        val id: String, 
        val targetName: String, 
        val charity: String, 
        val pct: Double, 
        val colorHex: String
    )

    // 💰 TOTAL TITHE: 10% (Rozděleno na 4 díly po 2.5%)
    val JARMILA_FUND = listOf(
        JarmilaTarget("father", "FATHER", "Epilepsy Charity", 0.025, "#3B82F6"), // Blue
        JarmilaTarget("mother", "MOTHER", "Cancer Charity", 0.025, "#DC2626"),   // Red
        JarmilaTarget("brother", "BROTHER", "Alcoholism Recovery", 0.025, "#22C55E"), // Green
        JarmilaTarget("children", "CHILDREN", "Colitis • Depression • Heart", 0.025, "#F97316") // Orange
    )

    data class SovereignFruit(
        val id: String, 
        val label: String, 
        val sub: String, 
        val freq: Int, 
        val icon: String,
        val colorHex: String // 🔥 NOVÉ: Přidáno pro UI Sync
    )

    val ORCHARD = listOf(
        SovereignFruit("hendy", "Hendy", "Royal Soul", 963, "👑", "#22D3EE"),      // Cyan
        SovereignFruit("pineapple", "Pineapple", "Serious", 432, "🍍", "#FACC15"), // Yellow
        SovereignFruit("pear", "Pear", "Family/Taken", 528, "🍐", "#A3E635"),      // Lime
        SovereignFruit("mango", "Mango", "Queer Space", 639, "🥭", "#FB923C"),     // Orange
        SovereignFruit("banana", "Banana", "Intimacy M", 417, "🍌", "#FEF08A"),    // Light Yellow
        SovereignFruit("peach", "Peach", "Intimacy F", 417, "🍑", "#F472B6"),      // Pink
        SovereignFruit("orange", "Orange", "Friends", 396, "🍊", "#F97316"),       // Deep Orange
        SovereignFruit("grapes", "Grapes", "Groups/Work", 741, "🍇", "#A855F7"),   // Purple
        SovereignFruit("coconut", "Coconut", "Help/DIY", 174, "🥥", "#D6D3D1"),    // Stone
        SovereignFruit("melon", "Melon", "Hobby/Sport", 528, "🍉", "#22C55E"),     // Green
        SovereignFruit("cherry", "Cherry", "Meetup Now", 852, "🍒", "#DC2626"),    // Red
        SovereignFruit("youth", "Youth", "15-18 Only", 111, "👻", "#FFFFFF")       // White
    )
}