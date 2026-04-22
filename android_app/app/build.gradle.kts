plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
    id("com.google.gms.google-services")
}

android {
    namespace = "com.nearaura.app"
    compileSdk = 34
    defaultConfig {
        applicationId = "com.nearaura.app"
        minSdk = 24
        targetSdk = 34
        versionCode = 1
        versionName = "1.0"
        multiDexEnabled = true
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_11
        targetCompatibility = JavaVersion.VERSION_11
    }
    kotlinOptions {
        jvmTarget = "11"
    }
}

dependencies {
    implementation(platform("com.google.firebase:firebase-bom:33.7.0"))
    implementation("com.google.firebase:firebase-database-ktx")
    implementation("com.firebase:geofire-android-common:3.2.0")
    implementation("org.whispersystems:signal-protocol-android:2.8.1")
    implementation("androidx.appcompat:appcompat:1.6.1")
    implementation("com.google.android.material:material:1.11.0")
    // --- 🔱 CHYBĚJÍCÍ MOTOROVÉ DÍLY (KOTLIN & LIFECYCLE) ---
    implementation("androidx.lifecycle:lifecycle-viewmodel-ktx:2.6.2")
    implementation("androidx.lifecycle:lifecycle-livedata-ktx:2.6.2")

    // --- 🔱 CHYBĚJÍCÍ FIREBASE TRUBKY ---
    implementation("com.google.firebase:firebase-firestore-ktx")
    implementation("com.google.firebase:firebase-functions-ktx")

    // --- 🔱 CHYBĚJÍCÍ OPTIKA (Kamera a ML Kit pro FaceAnalyzer) ---
    implementation("androidx.camera:camera-core:1.3.1")
    implementation("com.google.mlkit:face-detection:16.1.5")
    // --- 🔱 CHYBĚJÍCÍ LOGIKA A RADAR ---
    implementation("androidx.fragment:fragment-ktx:1.6.2")
    implementation("com.github.imperiumlabs:GeoFirestore-Android:v1.5.0")
    implementation("com.squareup.okhttp3:okhttp:4.11.0")
    implementation("com.google.guava:guava:32.1.3-android")
    implementation("com.google.firebase:firebase-analytics-ktx")
}