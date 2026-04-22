package com.nearaura.app.ui

import android.app.DatePickerDialog
import android.app.TimePickerDialog
import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.FirebaseFirestore
import com.google.firebase.firestore.GeoPoint
import com.nearaura.app.data.Meetup
import com.nearaura.app.databinding.ActivityProposeMeetupBinding
import java.text.SimpleDateFormat
import java.util.Calendar
import java.util.Locale

class ProposeMeetupActivity : AppCompatActivity() {

    private lateinit var binding: ActivityProposeMeetupBinding
    private val firestore by lazy { FirebaseFirestore.getInstance() }
    private val auth by lazy { FirebaseAuth.getInstance() }
    private val calendar = Calendar.getInstance()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityProposeMeetupBinding.inflate(layoutInflater)
        setContentView(binding.root)

        setupListeners()
    }

    private fun setupListeners() {
        binding.meetupDateEditText.setOnClickListener { showDatePicker() }
        binding.meetupTimeEditText.setOnClickListener { showTimePicker() }
        binding.createMeetupButton.setOnClickListener { createMeetup() }
    }

    private fun showDatePicker() {
        val datePicker = DatePickerDialog(
            this,
            { _, year, month, dayOfMonth ->
                calendar.set(Calendar.YEAR, year)
                calendar.set(Calendar.MONTH, month)
                calendar.set(Calendar.DAY_OF_MONTH, dayOfMonth)
                updateDateInView()
            },
            calendar.get(Calendar.YEAR),
            calendar.get(Calendar.MONTH),
            calendar.get(Calendar.DAY_OF_MONTH)
        )
        datePicker.datePicker.minDate = System.currentTimeMillis() - 1000
        datePicker.show()
    }

    private fun showTimePicker() {
        val timePicker = TimePickerDialog(
            this,
            { _, hourOfDay, minute ->
                calendar.set(Calendar.HOUR_OF_DAY, hourOfDay)
                calendar.set(Calendar.MINUTE, minute)
                updateTimeInView()
            },
            calendar.get(Calendar.HOUR_OF_DAY),
            calendar.get(Calendar.MINUTE),
            true
        )
        timePicker.show()
    }

    private fun updateDateInView() {
        val myFormat = "dd/MM/yyyy"
        val sdf = SimpleDateFormat(myFormat, Locale.US)
        binding.meetupDateEditText.setText(sdf.format(calendar.time))
    }

    private fun updateTimeInView() {
        val myFormat = "HH:mm"
        val sdf = SimpleDateFormat(myFormat, Locale.US)
        binding.meetupTimeEditText.setText(sdf.format(calendar.time))
    }

    private fun createMeetup() {
        val user = auth.currentUser ?: return

        firestore.collection("users").document(user.uid).get().addOnSuccessListener { userDoc ->
            val isVerified = userDoc.getString("verificationStatus") == "verified"
            if (!isVerified) {
                showIntegrityDialog("The Iron Gate is Closed. Please verify your Aura to propose a meetup.")
                return@addOnSuccessListener
            }

            val title = binding.meetupTitleEditText.text.toString().trim()
            val description = binding.meetupDescriptionEditText.text.toString().trim()
            val locationName = binding.meetupLocationEditText.text.toString().trim()
            
            if (title.isEmpty() || description.isEmpty() || locationName.isEmpty()) {
                Toast.makeText(this, "Please fill out all fields", Toast.LENGTH_SHORT).show()
                return@addOnSuccessListener
            }

            val meetupId = firestore.collection("meetups").document().id
            val meetup = Meetup(
                id = meetupId,
                creatorId = user.uid,
                title = title,
                description = description,
                locationName = locationName,
                eventTime = calendar.time
            )

            firestore.collection("meetups").document(meetupId).set(meetup)
                .addOnSuccessListener {
                    Toast.makeText(this, "Meetup created successfully!", Toast.LENGTH_SHORT).show()
                    finish()
                }
                .addOnFailureListener { e ->
                    Toast.makeText(this, "Failed to create meetup: ${e.message}", Toast.LENGTH_SHORT).show()
                }
        }
    }

    private fun showIntegrityDialog(message: String) {
        AlertDialog.Builder(this)
            .setTitle("Sovereign Gate")
            .setMessage(message)
            .setPositiveButton("OK", null)
            .show()
    }
}