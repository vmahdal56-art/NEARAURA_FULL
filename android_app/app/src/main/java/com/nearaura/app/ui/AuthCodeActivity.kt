package com.nearaura.app.ui

import android.os.Bundle
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.google.firebase.functions.FirebaseFunctions
import com.google.firebase.functions.ktx.functions
import com.google.firebase.ktx.Firebase
import com.nearaura.app.R

class AuthCodeActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_auth_code) 

        Firebase.functions.getHttpsCallable("generateWebAccessCode").call()
            .addOnSuccessListener { result ->
                // MAHDAL METAL FIX: Kotlin a Firebase někdy vyžadují explicitní Java-style přístup u Callable Result. 
                // Vytáhneme z resultu rovnou HashMap.
                try {
                    val resultMap = result.getData() as HashMap<String, Any>
                    val code = resultMap["code"] as? String
                    
                    if (code != null) {
                        findViewById<TextView>(R.id.codeDisplay).text = code
                    } else {
                        Toast.makeText(this, "Chyba: Kód nenalezen.", Toast.LENGTH_SHORT).show()
                    }
                } catch (e: Exception) {
                    android.util.Log.e("MAHDAL_METAL", "Chyba parsování kódu", e)
                    Toast.makeText(this, "Chyba struktury dat.", Toast.LENGTH_SHORT).show()
                }
            }
            .addOnFailureListener { 
                Toast.makeText(this, "Přístup zamítnut.", Toast.LENGTH_SHORT).show()
                finish()
            }
    }
}