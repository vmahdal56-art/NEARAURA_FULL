package com.nearaura.app.ui
import com.google.firebase.auth.ktx.auth
import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.functions.ktx.functions
import com.google.firebase.ktx.Firebase
import com.nearaura.app.databinding.ActivityLoginBinding

class LoginActivity : AppCompatActivity() {

    private lateinit var binding: ActivityLoginBinding
    private lateinit var auth: FirebaseAuth

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityLoginBinding.inflate(layoutInflater)
        setContentView(binding.root)

        auth = FirebaseAuth.getInstance()

        // 🛡️ MAHDAL METAL: Čistá registrace/login přes telefon
        binding.sendCodeButton.setOnClickListener {
            val phoneNumber = binding.countryCodePicker.selectedCountryCodeWithPlus + binding.phoneNumberEditText.text.toString()
            if (phoneNumber.isNotBlank()) {
                val intent = Intent(this, PhoneVerificationActivity::class.java)
                intent.putExtra("PHONE_NUMBER", phoneNumber)
                startActivity(intent)
            } else {
                Toast.makeText(this, "Zadej platné číslo.", Toast.LENGTH_SHORT).show()
            }
        }
    }

    override fun onStart() {
        super.onStart()
        val currentUser = auth.currentUser
        // Pokud je uživatel už ověřen (má platný token z Firebase Auth),
        // nejde rovnou do MainActivity, ale projde filtrem!
        if (currentUser != null) {
            evaluateGatekeeper()
        }
    }

  // ---------------------------------------------------------
    // 🛡️ MAHDAL METAL: Výhybka (Gatekeeper)
    // ---------------------------------------------------------
    private fun evaluateGatekeeper() {
        Firebase.functions.getHttpsCallable("checkAuraGate").call()
            .addOnSuccessListener { result ->
                try {
                    // MAHDAL METAL FIX: Volání Java metody .getData() s hrubým přetypováním
                    val resultMap = result.getData() as HashMap<String, Any>
                    val action = resultMap["action"] as? String

                    when (action) {
                        "KICK_OUT" -> {
                            Toast.makeText(this, "Zákon pole. Karanténa 7 dní.", Toast.LENGTH_LONG).show()
                            auth.signOut() 
                        }
                        "GO_TO_BIO" -> {
                            startActivity(Intent(this, ProfileSetupActivity::class.java))
                            finish()
                        }
                        "GO_TO_SCANNER" -> {
                            startActivity(Intent(this, DemoScannerActivity::class.java))
                            finish()
                        }
                        "GO_TO_ORCHARD" -> {
                            startActivity(Intent(this, MainActivity::class.java))
                            finish()
                        }
                        else -> {
                            android.util.Log.e("MAHDAL_METAL", "Neznámá odpověď: $action")
                            auth.signOut()
                        }
                    }
                } catch (e: Exception) {
                    android.util.Log.e("MAHDAL_METAL", "Chyba parsování odpovědi brány", e)
                    auth.signOut()
                }
            }
            .addOnFailureListener { e ->
                android.util.Log.e("MAHDAL_METAL", "Selhání spojení", e)
                Toast.makeText(this, "Chyba při ověření aury.", Toast.LENGTH_SHORT).show()
                auth.signOut()
            }
    }
}