package com.nearaura.app.ui

import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.FirebaseFirestore

class DirectorControlPanelActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val auth = FirebaseAuth.getInstance()
        val firestore = FirebaseFirestore.getInstance()
        val uid = auth.currentUser?.uid ?: return finish()
        
        firestore.collection("users").document(uid).get().addOnSuccessListener { doc ->
            if (doc.getString("role") == "Director") {
                Toast.makeText(this, "Welcome Director", Toast.LENGTH_SHORT).show()
            } else {
                finish()
            }
        }
    }
}