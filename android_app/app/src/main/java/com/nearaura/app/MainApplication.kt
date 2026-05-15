package com.nearaura.app

import android.app.Application
import com.facebook.FacebookSdk
import com.facebook.appevents.AppEventsLogger
import com.google.firebase.FirebaseApp
import com.google.firebase.appcheck.ktx.appCheck
import com.google.firebase.appcheck.playintegrity.PlayIntegrityAppCheckProviderFactory
import com.google.firebase.ktx.Firebase

// (Nechal jsem ti tady Hilt, jestli ho používáš, pokud to hodí chybu, smaž ho)
// import dagger.hilt.android.HiltAndroidApp 
// @HiltAndroidApp

class MainApplication : Application() {

    override fun onCreate() {
        super.onCreate()
        
        // ---------------------------------------------------------
        // 🛡️ MAHDAL METAL: Zažehnutí Facebook motoru hned po startu
        // ---------------------------------------------------------
        //FacebookSdk.setApplicationId("999999999999999")
        //FacebookSdk.sdkInitialize(applicationContext)
        //AppEventsLogger.activateApp(this)
        // ---------------------------------------------------------

        // Původní Firebase a Play Integrity
        FirebaseApp.initializeApp(this)
        Firebase.appCheck.installAppCheckProviderFactory(
            PlayIntegrityAppCheckProviderFactory.getInstance()
        )
    }
}