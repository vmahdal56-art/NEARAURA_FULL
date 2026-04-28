package com.nearaura.app.ui

import androidx.appcompat.app.AppCompatActivity
import android.content.Intent
import android.os.Bundle
import android.view.View

import androidx.navigation.fragment.NavHostFragment
import androidx.navigation.ui.setupWithNavController
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.FirebaseFirestore
import com.nearaura.app.BuildConfig
import com.nearaura.app.R
import com.nearaura.app.analytics.AnalyticsManager
import com.nearaura.app.databinding.ActivityMainBinding
import com.nearaura.app.dna.DNAVault

// 🔱 MAHDAL METAL: Čistá architektura (AppCompat kvůli Material liště)
class MainActivity : AppCompatActivity() {

    private val analyticsManager = AnalyticsManager()
    private lateinit var binding: ActivityMainBinding
    private val firestore by lazy { FirebaseFirestore.getInstance() }
    private val auth by lazy { FirebaseAuth.getInstance() }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        // ---------------------------------------------------------
        // 🛡️ OCELOVÝ VYHAZOVAČ (ZÁKON PONKU: BEZ KLÍČŮ NEJEDEŠ)
        // ---------------------------------------------------------
        if (auth.currentUser == null) {
            // Nemá klíče? Hned ho kopni na LoginActivity (kde je logo, terms atd.)
            val intent = Intent(this@MainActivity, LoginActivity::class.java)
            intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
            startActivity(intent)
            finish() // Zastaví běh MainActivity, aby se neukázala prázdná krabice
            return
        }
        // ---------------------------------------------------------
        
        // 🔱 102% DNA CHECK: Log Orchard Version
        val orchardVersion = DNAVault.VERSION // "5.0 (Titan)"
        
        // 🔥 OCELOVÝ JISTIČ (DEMO MÓD PRO INDIEGOGO) 🔥
        if (BuildConfig.IS_DEMO_MODE) {
            val intent = Intent(this@MainActivity, DemoScannerActivity::class.java)
            this@MainActivity.startActivity(intent)
            this@MainActivity.finish() 
            return   
        }

        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        analyticsManager.trackInstall()
        checkVerificationStatus()
        setupDirectorPanel()

        // ---------------------------------------------------------
        // 🔱 MAHDAL METAL NAVIGACE (Ocelová Převodovka)
        // ---------------------------------------------------------
        // 1. Najdeme mozek navigace v našem XML
        val navHostFragment = supportFragmentManager.findFragmentById(R.id.main_content_frame) as NavHostFragment
        val navController = navHostFragment.navController

        // 2. Svářečkou napojíme spodní lištu přímo na mozek. 
        binding.bottomNavigationBar.setupWithNavController(navController)
        // ---------------------------------------------------------
    }

    private fun checkVerificationStatus() {
        val userId = auth.currentUser?.uid ?: return
        firestore.collection("users").document(userId).get()
            .addOnSuccessListener { document ->
                if (document != null) {
                    val isVerified = document.getBoolean("isVerified") ?: false
                    val verificationStatus = document.getString("verificationStatus")
                    if (!isVerified) {
                        if(verificationStatus == "rejected") {
                            val intent = Intent(this@MainActivity, IntegrityFailedActivity::class.java)
                            intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
                            this@MainActivity.startActivity(intent)
                            this@MainActivity.finish()
                        } else {
                            val intent = Intent(this@MainActivity, VerificationActivity::class.java)
                            intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
                            this@MainActivity.startActivity(intent)
                            this@MainActivity.finish()
                        }
                    }
                }
            }
            .addOnFailureListener {
                // Handle error
            }
    }

    private fun setupDirectorPanel() {
        val userId = auth.currentUser?.uid
        if (userId == "YOUR_UID") { 
            binding.directorPanelButton.visibility = View.VISIBLE
            binding.directorPanelButton.setOnClickListener {
                startActivity(Intent(this@MainActivity, DirectorControlPanelActivity::class.java))
            }
        }
    }
}