package com.nearaura.app.ui

import android.app.DatePickerDialog
import android.content.Intent
import android.os.Bundle
import android.text.Editable
import android.text.TextWatcher
import androidx.appcompat.app.AppCompatActivity
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.FirebaseFirestore
import com.nearaura.app.databinding.ActivityNameBirthdayBinding
import java.text.SimpleDateFormat
import java.util.Calendar
import java.util.Date
import java.util.Locale

class NameBirthdayActivity : AppCompatActivity() {

    private lateinit var binding: ActivityNameBirthdayBinding
    private val calendar = Calendar.getInstance()
    private var selectedDate: Date? = null
    private val firestore by lazy { FirebaseFirestore.getInstance() }
    private val auth by lazy { FirebaseAuth.getInstance() }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityNameBirthdayBinding.inflate(layoutInflater)
        setContentView(binding.root)

        setupListeners()
        updateNextButtonState()
    }

    private fun setupListeners() {
        binding.buttonBack.setOnClickListener { finish() }

        binding.editTextName.addTextChangedListener(object : TextWatcher {
            override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {}
            override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {
                updateNextButtonState()
            }
            override fun afterTextChanged(s: Editable?) {}
        })

        binding.editTextBirthday.setOnClickListener { showDatePicker() }

        binding.buttonNext.setOnClickListener {
            if (validateInputs()) {
                saveUserData()
            }
        }
    }

    private fun saveUserData() {
        val name = binding.editTextName.text.toString().trim()
        val birthDate = SimpleDateFormat("dd/MM/yyyy", Locale.getDefault()).format(selectedDate!!)
        val uid = auth.currentUser?.uid ?: return

        val userData = mapOf(
            "name" to name,
            "birthDate" to birthDate
        )

        firestore.collection("users").document(uid).update(userData)
            .addOnSuccessListener {
                startActivity(Intent(this, IntentActivity::class.java))
                finish()
            }
            .addOnFailureListener { e ->
                // Handle error
            }
    }

    private fun showDatePicker() {
        val dateSetListener = DatePickerDialog.OnDateSetListener { _, year, month, dayOfMonth ->
            calendar.set(Calendar.YEAR, year)
            calendar.set(Calendar.MONTH, month)
            calendar.set(Calendar.DAY_OF_MONTH, dayOfMonth)
            selectedDate = calendar.time
            updateDateLabel(selectedDate!!)
            updateNextButtonState()
        }

        val dialog = DatePickerDialog(
            this, dateSetListener,
            calendar.get(Calendar.YEAR) - 18, // Default to 18 years ago
            calendar.get(Calendar.MONTH),
            calendar.get(Calendar.DAY_OF_MONTH)
        )
        dialog.datePicker.maxDate = System.currentTimeMillis()
        dialog.show()
    }

    private fun updateDateLabel(date: Date) {
        val format = SimpleDateFormat("dd/MM/yyyy", Locale.getDefault())
        binding.editTextBirthday.setText(format.format(date))
    }

    private fun isAgeValid(birthDate: Date): Boolean {
        val eighteenYearsAgo = Calendar.getInstance().apply { add(Calendar.YEAR, -18) }
        return !birthDate.after(eighteenYearsAgo.time)
    }

    private fun validateInputs(): Boolean {
        val isNameValid = binding.editTextName.text?.trim()?.length ?: 0 >= 2
        if (!isNameValid) {
            binding.inputLayoutName.error = "Please enter your first name."
            return false
        } else {
            binding.inputLayoutName.error = null
        }

        if (selectedDate == null) {
            binding.inputLayoutBirthday.error = "Please select your birthday."
            return false
        } else if (!isAgeValid(selectedDate!!)) {
            binding.inputLayoutBirthday.error = "You must be 18 years or older."
            return false
        } else {
            binding.inputLayoutBirthday.error = null
        }
        return true
    }

    private fun updateNextButtonState() {
        val isNameEntered = binding.editTextName.text?.trim()?.isNotEmpty() == true
        val isDateSelected = selectedDate != null
        val isAgeOk = selectedDate?.let { isAgeValid(it) } ?: false
        binding.buttonNext.isEnabled = isNameEntered && isDateSelected && isAgeOk
        binding.buttonNext.alpha = if (binding.buttonNext.isEnabled) 1.0f else 0.5f
    }
}