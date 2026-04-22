package com.nearaura.app.ui

import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.ViewModelProvider
import com.nearaura.app.databinding.ActivityPhotoVerificationBinding
import com.nearaura.app.network.Resource
import com.nearaura.app.viewmodel.VerificationViewModel

class PhotoVerificationActivity : AppCompatActivity() {

    private lateinit var binding: ActivityPhotoVerificationBinding
    private lateinit var viewModel: VerificationViewModel

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityPhotoVerificationBinding.inflate(layoutInflater)
        setContentView(binding.root)

        viewModel = ViewModelProvider(this).get(VerificationViewModel::class.java)

        binding.buttonVerify.setOnClickListener {
            viewModel.verifyPhotosWithAI()
        }

        viewModel.aiVerificationResult.observe(this) { resource ->
            when (resource) {
                is Resource.Loading<*> -> {
                    binding.verificationProgressBar.visibility = View.VISIBLE
                }
                is Resource.Success<*> -> {
                    binding.verificationProgressBar.visibility = View.GONE
                    Toast.makeText(this, "Verification successful!", Toast.LENGTH_SHORT).show()
                }
                is Resource.Error<*> -> {
                    binding.verificationProgressBar.visibility = View.GONE
                    Toast.makeText(this, "Verification failed: ${resource.message}", Toast.LENGTH_SHORT).show()
                }
            }
        }
    }
}