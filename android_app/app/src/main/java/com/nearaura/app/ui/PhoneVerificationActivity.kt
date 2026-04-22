package com.nearaura.app.ui

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.google.firebase.FirebaseException
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.PhoneAuthCredential
import com.google.firebase.auth.PhoneAuthOptions
import com.google.firebase.auth.PhoneAuthProvider
import com.nearaura.app.databinding.ActivityPhoneVerificationBinding
import java.util.concurrent.TimeUnit

class PhoneVerificationActivity : AppCompatActivity() {

    private lateinit var binding: ActivityPhoneVerificationBinding
    private lateinit var auth: FirebaseAuth

    private var storedVerificationId: String? = null
    private var resendToken: PhoneAuthProvider.ForceResendingToken? = null
    private var isOtpSent = false
    private val democraticNations = setOf(
        "AR", "AU", "AT", "BE", "BR", "BG", "CA", "CL", "CO", "HR", "CY", "CZ", "DK", "DO", "EC", "EE", "FI", "FR", "GE", "DE", "GR", "GT", "HU",
        "IS", "IN", "ID", "IE", "IL", "IT", "JP", "LV", "LT", "LU", "MY", "MT", "MX", "MD", "MN", "ME", "NL", "NZ", "MK", "NO", "PA", "PY", "PE",
        "PH", "PL", "PT", "RO", "RS", "SG", "SK", "SI", "ZA", "KR", "ES", "SE", "CH", "TW", "TH", "TT", "UA", "GB", "US", "UY", "VE"
    )

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityPhoneVerificationBinding.inflate(layoutInflater)
        setContentView(binding.root)

        auth = FirebaseAuth.getInstance()

        if (auth.currentUser == null) {
            Toast.makeText(this, "Error: No user is currently signed in.", Toast.LENGTH_LONG).show()
            finish()
            return
        }

        binding.countryCodePicker.registerCarrierNumberEditText(binding.phoneNumberEditText)

        setupToolbar()
        setupListeners()
        updateUiForPhoneInput()
    }

    private fun setupToolbar() {
        binding.toolbar.title = "Verify Your Phone"
        setSupportActionBar(binding.toolbar)
        supportActionBar?.setDisplayHomeAsUpEnabled(true)
        binding.toolbar.setNavigationOnClickListener { finish() }
    }

    private fun setupListeners() {
        binding.buttonAction.setOnClickListener {
            if (!isOtpSent) {
                if (isCountryAllowed(binding.countryCodePicker.selectedCountryNameCode)) {
                    sendOtp()
                } else {
                    showSovereigntyBlock()
                }
            } else {
                verifyOtpAndLinkAccount()
            }
        }
    }
    private fun isCountryAllowed(countryCode: String): Boolean {
        return democraticNations.contains(countryCode)
    }

    private fun showSovereigntyBlock() {
        val intent = Intent(this, SovereigntyBlockActivity::class.java)
        startActivity(intent)
        finish()
    }

    private fun sendOtp() {
        val phoneNumber = binding.countryCodePicker.fullNumberWithPlus
        if (!binding.countryCodePicker.isValidFullNumber) {
            Toast.makeText(this, "Please enter a valid phone number.", Toast.LENGTH_SHORT).show()
            return
        }

        binding.progressBar.visibility = View.VISIBLE
        binding.buttonAction.isEnabled = false

        val options = PhoneAuthOptions.newBuilder(auth)
            .setPhoneNumber(phoneNumber)
            .setTimeout(60L, TimeUnit.SECONDS)
            .setActivity(this)
            .setCallbacks(callbacks)
            .build()
        PhoneAuthProvider.verifyPhoneNumber(options)
    }

    private val callbacks = object : PhoneAuthProvider.OnVerificationStateChangedCallbacks() {

        override fun onVerificationCompleted(credential: PhoneAuthCredential) {
            linkPhoneCredentialToCurrentUser(credential)
        }

        override fun onVerificationFailed(e: FirebaseException) {
            binding.progressBar.visibility = View.GONE
            binding.buttonAction.isEnabled = true
            Toast.makeText(applicationContext, "Verification failed: ${e.message}", Toast.LENGTH_LONG).show()
        }

        override fun onCodeSent(
            verificationId: String,
            token: PhoneAuthProvider.ForceResendingToken
        ) {
            storedVerificationId = verificationId
            resendToken = token

            binding.progressBar.visibility = View.GONE
            binding.buttonAction.isEnabled = true
            isOtpSent = true
            updateUiForOtpInput()
            Toast.makeText(applicationContext, "OTP Sent Successfully.", Toast.LENGTH_SHORT).show()
        }
    }

    private fun verifyOtpAndLinkAccount() {
        val otpCode = binding.otpEditText.text.toString().trim()
        if (otpCode.length != 6) {
            Toast.makeText(this, "Please enter the 6-digit verification code.", Toast.LENGTH_SHORT).show()
            return
        }

        if (storedVerificationId == null) {
            Toast.makeText(this, "Verification error. Please try sending the code again.", Toast.LENGTH_LONG).show()
            return
        }

        binding.progressBar.visibility = View.VISIBLE
        binding.buttonAction.isEnabled = false

        val credential = PhoneAuthProvider.getCredential(storedVerificationId!!, otpCode)
        linkPhoneCredentialToCurrentUser(credential)
    }

    private fun linkPhoneCredentialToCurrentUser(credential: PhoneAuthCredential) {
        val currentUser = auth.currentUser
        if (currentUser == null) {
            Toast.makeText(this, "Error: No user available to link the phone number to.", Toast.LENGTH_LONG).show()
            binding.progressBar.visibility = View.GONE
            binding.buttonAction.isEnabled = true
            return
        }

        currentUser.linkWithCredential(credential)
            .addOnCompleteListener(this) { task ->
                binding.progressBar.visibility = View.GONE
                binding.buttonAction.isEnabled = true

                if (task.isSuccessful) {
                    Toast.makeText(this, "Phone number linked successfully!", Toast.LENGTH_SHORT).show()
                    startActivity(Intent(this, NameBirthdayActivity::class.java))
                    finishAffinity()
                } else {
                    Log.w("PhoneAuth", "Failed to link credential", task.exception)
                    Toast.makeText(this, "Failed to link phone number: ${task.exception?.message}", Toast.LENGTH_LONG).show()
                }
            }
    }

    private fun updateUiForPhoneInput() {
        binding.textInstruction.text = "Enter your mobile number to receive a verification code."
        binding.phoneNumberInputLayout.visibility = View.VISIBLE
        binding.otpInputLayout.visibility = View.GONE
        binding.buttonAction.text = "Send Code"
        isOtpSent = false
    }

    private fun updateUiForOtpInput() {
        binding.textInstruction.text = "Enter the 6-digit code sent to ${binding.countryCodePicker.fullNumber}"
        binding.phoneNumberInputLayout.visibility = View.GONE
        binding.otpInputLayout.visibility = View.VISIBLE
        binding.buttonAction.text = "Verify & Link Account"
        binding.otpEditText.requestFocus()
    }
}
