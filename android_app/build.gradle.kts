// Top-level build file where you can add configuration options common to all sub-projects/modules.
// Tento soubor je v kořenovém adresáři: NearAura/build.gradle.kts

plugins {
    // Android App Plugin - verze pro celý projekt
    id("com.android.application") version "8.13.1" apply false

    // Kotlin Android Plugin - verze pro celý projekt
    id("org.jetbrains.kotlin.android") version "1.9.24" apply false
    // ... other plugins
    // Google Services Plugin (pro Firebase) - verze pro celý projekt
    id("com.google.gms.google-services") version "4.4.2" apply false

    // Ujistěte se, že tento řádek zde je
    id("com.google.dagger.hilt.android") version "2.48" apply false

    
    // --- 🔱 MAHDAL METAL CRASHLYTICS SVÁR 🔱 ---
    id("com.google.firebase.crashlytics") version "2.9.9" apply false
}