package com.nearaura.app.ui

import android.content.Intent
import android.os.Bundle
import android.view.View
import androidx.fragment.app.FragmentActivity // 🔱 MAHDAL METAL: Správná deska pro Fragmenty bez XML Theme
import androidx.fragment.app.Fragment
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.FirebaseFirestore
import com.nearaura.app.BuildConfig
import com.nearaura.app.R
import com.nearaura.app.analytics.AnalyticsManager
import com.nearaura.app.databinding.ActivityMainBinding
import com.nearaura.app.dna.DNAVault

// 🔱 MAHDAL METAL: Dědíme přímo z FragmentActivity, žádný namby-pamby AppCompat
class MainActivity : FragmentActivity() {

    private val analyticsManager = AnalyticsManager()
    private lateinit var binding: ActivityMainBinding
    private val firestore by lazy { FirebaseFirestore.getInstance() }
    private val auth by lazy { FirebaseAuth.getInstance() }

    private val discoveryFragment = DiscoveryFragment()
    private val meetupsFragment = MeetupsFragment()
    private val broadcastsFragment = BroadcastsFragment()
    private val chatsFragment = ChatsFragment()
    private val profileFragment = ProfileFragment()
    private val supportFragment = SupportFragment()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        // 🔱 102% DNA CHECK: Log Orchard Version
        val orchardVersion = DNAVault.VERSION // "5.0 (Titan)"
        
        // Zakomentováno pro jistotu čistého buildu. Až bude AnalyticsManager připravený, můžeš odkomentovat.
        // analyticsManager.trackUserVerified("system_boot", Bundle().apply {
        //     putString("dna_version", orchardVersion)
        //     putString("motto", DNAVault.MOTTO)
        // })

        // 🔥 OCELOVÝ JISTIČ (DEMO MÓD PRO INDIEGOGO) 🔥
        if (BuildConfig.IS_DEMO_MODE) {
            // 🔱 MAHDAL METAL: Správný zápis Intentu v Kotlinu
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

        if (savedInstanceState == null) {
            replaceFragment(discoveryFragment)
        }

        binding.bottomNavigationBar.setOnItemSelectedListener { item ->
            when (item.itemId) {
                R.id.navigation_discovery -> replaceFragment(discoveryFragment)
                R.id.navigation_meetups -> replaceFragment(meetupsFragment)
                R.id.navigation_broadcasts -> replaceFragment(broadcastsFragment)
                R.id.navigation_chats -> replaceFragment(chatsFragment)
                R.id.navigation_profile -> replaceFragment(profileFragment)
              
            }
            true
        }
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
                            // 🔱 MAHDAL METAL: Správný zápis Intentu
                            val intent = Intent(this@MainActivity, IntegrityFailedActivity::class.java)
                            intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
                            this@MainActivity.startActivity(intent)
                            this@MainActivity.finish()
                        } else {
                            // 🔱 MAHDAL METAL: Správný zápis Intentu
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
                // 🔱 MAHDAL METAL: Správný zápis Intentu
                startActivity(Intent(this@MainActivity, DirectorControlPanelActivity::class.java))
            }
        }
    }

    private fun replaceFragment(fragment: Fragment) {
        // 🔱 MAHDAL METAL: FragmentActivity tohle zná
        supportFragmentManager.beginTransaction()
            .replace(R.id.main_content_frame, fragment)
            .commit()
    }
}