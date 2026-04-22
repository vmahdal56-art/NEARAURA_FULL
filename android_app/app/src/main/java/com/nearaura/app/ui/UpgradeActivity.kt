package com.nearaura.app.ui
import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.android.billingclient.api.*
import com.google.firebase.functions.FirebaseFunctions
import com.nearaura.app.databinding.ActivityUpgradeBinding
import com.google.common.collect.ImmutableList

class UpgradeActivity : AppCompatActivity() {

    private lateinit var binding: ActivityUpgradeBinding
    private lateinit var billingClient: BillingClient
    private lateinit var functions: FirebaseFunctions

    // NOTE: Replace with your actual Google Play Subscription IDs
    private val PRO_PLAN_ID = "nearaura_pro_monthly"
    private val TOP_PLAN_ID = "nearaura_top_monthly"

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        // We assume the layout file exists and ViewBinding is configured
        // The user will need to ensure the layout file is named activity_upgrade.xml
        // and that ViewBinding is enabled in build.gradle.kts
        // For now, we will write the code as if the binding class exists.
        
        // Placeholder for binding until layout is created
        // The user will fix this in Android Studio
        
        functions = FirebaseFunctions.getInstance()

        setupBillingClient()

        // Placeholder for click listeners until binding is fixed
        /*
        binding.buttonUpgradePro.setOnClickListener {
            launchPurchaseFlow(PRO_PLAN_ID)
        }
        binding.buttonUpgradeTop.setOnClickListener {
            launchPurchaseFlow(TOP_PLAN_ID)
        }
        */
    }

    private fun setupBillingClient() {
        val purchasesUpdatedListener = PurchasesUpdatedListener { billingResult, purchases ->
            if (billingResult.responseCode == BillingClient.BillingResponseCode.OK && purchases != null) {
                for (purchase in purchases) {
                    handlePurchase(purchase)
                }
            } else {
                Toast.makeText(this, "Purchase failed: ${billingResult.debugMessage}", Toast.LENGTH_LONG).show()
            }
        }

        billingClient = BillingClient.newBuilder(this)
            .setListener(purchasesUpdatedListener)
            .enablePendingPurchases()
            .build()

        billingClient.startConnection(object : BillingClientStateListener {
            override fun onBillingSetupFinished(billingResult: BillingResult) {
                if (billingResult.responseCode != BillingClient.BillingResponseCode.OK) {
                    // Handle setup error
                }
            }
            override fun onBillingServiceDisconnected() {
                // Try to restart the connection on the next request
            }
        })
    }

    private fun launchPurchaseFlow(productId: String) {
        val productList = ImmutableList.of(
            QueryProductDetailsParams.Product.newBuilder()
                .setProductId(productId)
                .setProductType(BillingClient.ProductType.SUBS)
                .build()
        )
        val params = QueryProductDetailsParams.newBuilder().setProductList(productList).build()

        billingClient.queryProductDetailsAsync(params) { billingResult, productDetailsList ->
            if (billingResult.responseCode == BillingClient.BillingResponseCode.OK && productDetailsList.isNotEmpty()) {
                val productDetails = productDetailsList[0]
                val productDetailsParamsList = ImmutableList.of(
                    BillingFlowParams.ProductDetailsParams.newBuilder()
                        .setProductDetails(productDetails)
                        .setOfferToken(productDetails.subscriptionOfferDetails?.get(0)?.offerToken ?: "") // Use the first available offer
                        .build()
                )
                val billingFlowParams = BillingFlowParams.newBuilder()
                    .setProductDetailsParamsList(productDetailsParamsList)
                    .build()
                
                billingClient.launchBillingFlow(this, billingFlowParams)
            }
        }
    }

    private fun handlePurchase(purchase: Purchase) {
        if (purchase.purchaseState == Purchase.PurchaseState.PURCHASED) {
            if (!purchase.isAcknowledged) {
                val acknowledgePurchaseParams = AcknowledgePurchaseParams.newBuilder()
                    .setPurchaseToken(purchase.purchaseToken)
                    .build()
                billingClient.acknowledgePurchase(acknowledgePurchaseParams) { billingResult ->
                    validatePurchaseOnServer(purchase)
                }
            } else {
                validatePurchaseOnServer(purchase)
            }
        }
    }

    private fun validatePurchaseOnServer(purchase: Purchase) {
        val data = hashMapOf(
            "packageName" to purchase.packageName,
            "subscriptionId" to purchase.products[0],
            "purchaseToken" to purchase.purchaseToken
        )

        functions.getHttpsCallable("validateGooglePlayPurchase")
            .call(data)
            .addOnSuccessListener {
                Toast.makeText(this, "Subscription successfully activated!", Toast.LENGTH_LONG).show()
                finish()
            }
            .addOnFailureListener { e ->
                Toast.makeText(this, "Server validation failed: ${e.message}", Toast.LENGTH_LONG).show()
            }
    }
}
