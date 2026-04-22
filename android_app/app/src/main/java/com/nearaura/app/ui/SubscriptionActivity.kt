package com.nearaura.app.ui

import android.content.Context
import android.os.Bundle
import android.telephony.TelephonyManager
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.google.android.material.button.MaterialButton
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.functions.FirebaseFunctions
import com.nearaura.app.R
import com.nearaura.app.databinding.ActivitySubscriptionBinding
import java.util.Locale

// Price IDs
private const val PRICE_ID_GBP = "price_1L9Z2n2eZvKYlo2CJjJv9i2n" // £19.99
private const val PRICE_ID_EUR = "price_1L9Z2n2eZvKYlo2CJjJv9i2o" // €24.99
private const val PRICE_ID_USD = "price_1L9Z2n2eZvKYlo2CJjJv9i2p" // $29.99

class SubscriptionActivity : AppCompatActivity() {

    private lateinit var binding: ActivitySubscriptionBinding
    private lateinit var functions: FirebaseFunctions
    private val auth by lazy { FirebaseAuth.getInstance() }

    private var selectedPriceId = PRICE_ID_USD // Default to USD

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivitySubscriptionBinding.inflate(layoutInflater)
        setContentView(binding.root)

        functions = FirebaseFunctions.getInstance()

        // Sovereignty Check
        checkSovereignty()

        setupCurrencySwitcher()
        autoDetectCurrency()
        setupListeners()
    }

    private fun checkSovereignty() {
        // Mock implementation - in a real app, this would involve a more robust check
        val blockedRegions = listOf("US", "CA") // Example blocked regions
        val userCountry = getUserCountry()

        if (blockedRegions.contains(userCountry)) {
            // User is in a blocked region, show the Sovereignty Block screen
            // For simplicity, we'll just show a toast message
            Toast.makeText(this, "Service not available in your region.", Toast.LENGTH_LONG).show()
            finish() // Close the activity
        }
    }

    private fun setupCurrencySwitcher() {
        binding.currencyToggleGroup.addOnButtonCheckedListener { group, checkedId, isChecked ->
            if (isChecked) {
                when (checkedId) {
                    R.id.button_gbp -> {
                        selectedPriceId = PRICE_ID_GBP
                        updatePriceDisplay("£19.99")
                    }
                    R.id.button_eur -> {
                        selectedPriceId = PRICE_ID_EUR
                        updatePriceDisplay("€24.99")
                    }
                    R.id.button_usd -> {
                        selectedPriceId = PRICE_ID_USD
                        updatePriceDisplay("$29.99")
                    }
                }
            }
        }
    }

    private fun autoDetectCurrency() {
        val userCountry = getUserCountry()

        when {
            userCountry == "GB" -> {
                selectedPriceId = PRICE_ID_GBP
                updatePriceDisplay("£19.99")
                binding.currencyToggleGroup.check(R.id.button_gbp)
            }
            isEU(userCountry) -> {
                selectedPriceId = PRICE_ID_EUR
                updatePriceDisplay("€24.99")
                binding.currencyToggleGroup.check(R.id.button_eur)
            }
            else -> {
                selectedPriceId = PRICE_ID_USD
                updatePriceDisplay("$29.99")
                binding.currencyToggleGroup.check(R.id.button_usd)
            }
        }
    }

    private fun getUserCountry(): String {
        try {
            val tm = getSystemService(Context.TELEPHONY_SERVICE) as TelephonyManager
            val simCountry = tm.simCountryIso
            if (simCountry != null && simCountry.length == 2) {
                return simCountry.uppercase(Locale.ROOT)
            } else if (tm.phoneType != TelephonyManager.PHONE_TYPE_NONE) {
                // Fallback to network country
                val networkCountry = tm.networkCountryIso
                if (networkCountry != null && networkCountry.length == 2) {
                    return networkCountry.uppercase(Locale.ROOT)
                }
            }
        } catch (e: Exception) {
            // Fallback to locale
        }
        return Locale.getDefault().country.uppercase(Locale.ROOT)
    }

    private fun isEU(country: String): Boolean {
        val euCountries = listOf("AT", "BE", "BG", "CY", "CZ", "DE", "DK", "EE", "ES", "FI", "FR", "GR", "HR", "HU", "IE", "IT", "LT", "LU", "LV", "MT", "NL", "PL", "PT", "RO", "SE", "SI", "SK")
        return euCountries.contains(country)
    }

    private fun updatePriceDisplay(price: String) {
        binding.buttonPro.text = "Upgrade to Sovereign - $price"
    }

    private fun setupListeners() {
        binding.buttonPro.setOnClickListener { purchase(selectedPriceId) }
    }

    private fun purchase(priceId: String) {
        val successUrl = "https://nearaura.com/success"
        val cancelUrl = "https://nearaura.com/cancel"

        val data = hashMapOf(
            "priceId" to priceId,
            "successUrl" to successUrl,
            "cancelUrl" to cancelUrl
        )

        functions.getHttpsCallable("createStripeCheckout").call(data)
            .addOnSuccessListener { result ->
                val sessionId = (result.getData() as? Map<*, *>)?.get("sessionId") as? String
                if (sessionId != null) {
                    Toast.makeText(this, "Redirecting to Stripe...", Toast.LENGTH_LONG).show()
                } else {
                    Toast.makeText(this, "Could not get session ID.", Toast.LENGTH_SHORT).show()
                }
            }
            .addOnFailureListener { e ->
                Toast.makeText(this, "Failed to create checkout session: ${e.message}", Toast.LENGTH_SHORT).show()
            }
    }
}