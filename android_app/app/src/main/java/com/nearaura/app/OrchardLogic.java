package com.nearaura.app;

public class OrchardLogic {
    private static final long LOCK_MS = 48 * 60 * 60 * 1000;
    
    public static boolean isIntentLocked(long lastChangeTimestamp) {
        return (System.currentTimeMillis() - lastChangeTimestamp) < LOCK_MS;
    }

    public static String getAuraColor(int score) {
        if (score > 900) return "#FFD700"; // Sovereign Gold
        if (score > 700) return "#E6E6FA"; // Elite Lavender
        return "#FFFFFF"; // Access White
    }
}
