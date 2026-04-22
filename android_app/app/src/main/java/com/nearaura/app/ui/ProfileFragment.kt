package com.nearaura.app.ui

import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.fragment.app.Fragment
import com.google.android.material.chip.Chip
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.FieldValue
import com.google.firebase.firestore.FirebaseFirestore
import com.nearaura.app.R
import com.nearaura.app.data.User
import com.nearaura.app.data.UserIntent
import com.nearaura.app.databinding.FragmentProfileBinding
import com.nearaura.app.utils.TokenManager

class ProfileFragment : Fragment() {

    private var _binding: FragmentProfileBinding? = null
    private val binding get() = _binding!!

    private val firestore by lazy { FirebaseFirestore.getInstance() }
    private val auth by lazy { FirebaseAuth.getInstance() }
    private lateinit var tokenManager: TokenManager
    private var currentUser: User? = null

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentProfileBinding.inflate(inflater, container, false)
        tokenManager = TokenManager(requireContext())
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        loadUserProfile()
        setupListeners()
    }

    private fun loadUserProfile() {
        val uid = auth.currentUser?.uid ?: return
        firestore.collection("users").document(uid).get()
            .addOnSuccessListener { document ->
                currentUser = document.toObject(User::class.java)
                currentUser?.let { user ->
                    binding.datingModeSwitch.isChecked = user.isDatingModeEnabled
                    displayInterests(user.interests)
                    updateIntentSelection(user.currentIntent)
                    displayAuraFlavors(user.auraFlavors)
                    applyAuraFlavorConstraints()
                }
            }
    }

    private fun displayInterests(interests: List<String>) {
        binding.interestsChipGroup.removeAllViews()
        for (interest in interests) {
            val chip = Chip(requireContext()).apply {
                text = interest
                isCloseIconVisible = true
                setOnCloseIconClickListener { removeInterest(interest) }
            }
            binding.interestsChipGroup.addView(chip)
        }
    }

    private fun displayAuraFlavors(flavors: List<String>) {
        binding.fruitChipGroup.clearCheck()
        flavors.forEach { flavor ->
            when (flavor) {
                "fruit_pineapple" -> binding.chipPineapple.isChecked = true
                "fruit_banana" -> binding.chipBanana.isChecked = true
                "fruit_peach" -> binding.chipPeach.isChecked = true
                "fruit_grapes" -> binding.chipGrapes.isChecked = true
            }
        }
    }

    private fun updateIntentSelection(intent: String) {
        when (intent) {
            UserIntent.DATING.name -> binding.chipDating.isChecked = true
            UserIntent.FRIENDS.name -> binding.chipFriends.isChecked = true
            UserIntent.COMMUNITY.name -> binding.chipCommunity.isChecked = true
        }
    }

    private fun setupListeners() {
        binding.logoutButton.setOnClickListener { logoutUser() }
        binding.verifyProfileButton.setOnClickListener { startActivity(Intent(requireContext(), VerificationActivity::class.java)) }
        binding.howToButton.setOnClickListener { startActivity(Intent(requireContext(), HowToActivity::class.java)) }
        binding.manageSubscriptionButton.setOnClickListener { startActivity(Intent(requireContext(), SubscriptionActivity::class.java)) }
        binding.datingModeSwitch.setOnCheckedChangeListener { _, isChecked -> updateDatingMode(isChecked) }

        binding.intentChipGroup.setOnCheckedChangeListener { _, checkedId ->
            val intentString = when (checkedId) {
                R.id.chip_dating -> UserIntent.DATING.name
                R.id.chip_friends -> UserIntent.FRIENDS.name
                R.id.chip_community -> UserIntent.COMMUNITY.name
                else -> return@setOnCheckedChangeListener
            }
            updateIntent(intentString)
        }

        binding.addInterestButton.setOnClickListener {
            val interest = binding.addInterestEditText.text.toString().trim()
            if (interest.isNotEmpty()) addInterest(interest)
        }

        val fruitChipIds = listOf(R.id.chip_pineapple, R.id.chip_banana, R.id.chip_peach, R.id.chip_grapes)
        fruitChipIds.forEach { chipId ->
            binding.fruitChipGroup.findViewById<Chip>(chipId).setOnCheckedChangeListener { _, _ -> applyAuraFlavorConstraints() }
        }

        binding.saveFruitsButton.setOnClickListener {
            val selectedFlavors = getSelectedAuraFlavors()
            if (isAuraFlavorSelectionValid(selectedFlavors)) {
                updateAuraFlavors(selectedFlavors)
            } else {
                Toast.makeText(requireContext(), "Invalid flavor combination. Pineapple cannot be mixed with Banana or Peach.", Toast.LENGTH_LONG).show()
            }
        }
    }

    private fun applyAuraFlavorConstraints() {
        val isPineappleChecked = binding.chipPineapple.isChecked
        val isBananaChecked = binding.chipBanana.isChecked
        val isPeachChecked = binding.chipPeach.isChecked

        if (isPineappleChecked) {
            binding.chipBanana.isEnabled = false
            binding.chipPeach.isEnabled = false
        } else {
            binding.chipBanana.isEnabled = true
            binding.chipPeach.isEnabled = true
        }

        if (isBananaChecked || isPeachChecked) {
            binding.chipPineapple.isEnabled = false
        } else {
            binding.chipPineapple.isEnabled = true
        }
    }

    private fun getSelectedAuraFlavors(): List<String> {
        val selected = mutableListOf<String>()
        if (binding.chipPineapple.isChecked) selected.add("fruit_pineapple")
        if (binding.chipBanana.isChecked) selected.add("fruit_banana")
        if (binding.chipPeach.isChecked) selected.add("fruit_peach")
        if (binding.chipGrapes.isChecked) selected.add("fruit_grapes")
        return selected
    }

    private fun isAuraFlavorSelectionValid(flavors: List<String>): Boolean {
        val hasPineapple = flavors.contains("fruit_pineapple")
        val hasBanana = flavors.contains("fruit_banana")
        val hasPeach = flavors.contains("fruit_peach")
        return !(hasPineapple && (hasBanana || hasPeach))
    }

    private fun logoutUser() {
        auth.signOut()
        tokenManager.clearToken()
        val intent = Intent(requireActivity(), LoginActivity::class.java)
        intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
        startActivity(intent)
        requireActivity().finish()
    }

    private fun updateDatingMode(isEnabled: Boolean) {
        val uid = auth.currentUser?.uid ?: return
        firestore.collection("users").document(uid).update("isDatingModeEnabled", isEnabled)
            .addOnSuccessListener { Toast.makeText(requireContext(), "Dating mode ${if (isEnabled) "enabled" else "disabled"}", Toast.LENGTH_SHORT).show() }
            .addOnFailureListener { 
                Toast.makeText(requireContext(), "Failed to update dating mode: ${it.message}", Toast.LENGTH_SHORT).show()
                binding.datingModeSwitch.isChecked = !isEnabled
            }
    }

    private fun updateIntent(intent: String) {
        val uid = auth.currentUser?.uid ?: return
        firestore.collection("users").document(uid).update("currentIntent", intent)
            .addOnSuccessListener { Toast.makeText(requireContext(), "Intent updated to $intent", Toast.LENGTH_SHORT).show() }
            .addOnFailureListener { 
                Toast.makeText(requireContext(), "Failed to update intent: ${it.message}", Toast.LENGTH_SHORT).show()
                loadUserProfile() 
            }
    }
    
    private fun addInterest(interest: String) {
        val uid = auth.currentUser?.uid ?: return
        firestore.collection("users").document(uid).update("interests", FieldValue.arrayUnion(interest))
            .addOnSuccessListener {
                Toast.makeText(requireContext(), "Interest added", Toast.LENGTH_SHORT).show()
                binding.addInterestEditText.text.clear()
                loadUserProfile()
            }
            .addOnFailureListener { Toast.makeText(requireContext(), "Failed to add interest: ${it.message}", Toast.LENGTH_SHORT).show() }
    }

    private fun removeInterest(interest: String) {
        val uid = auth.currentUser?.uid ?: return
        firestore.collection("users").document(uid).update("interests", FieldValue.arrayRemove(interest))
            .addOnSuccessListener {
                Toast.makeText(requireContext(), "Interest removed", Toast.LENGTH_SHORT).show()
                loadUserProfile()
            }
            .addOnFailureListener { Toast.makeText(requireContext(), "Failed to remove interest: ${it.message}", Toast.LENGTH_SHORT).show() }
    }

    private fun updateAuraFlavors(flavors: List<String>) {
        val uid = auth.currentUser?.uid ?: return
        firestore.collection("users").document(uid).update("auraFlavors", flavors)
            .addOnSuccessListener { Toast.makeText(requireContext(), "AuraFlavors updated successfully!", Toast.LENGTH_SHORT).show() }
            .addOnFailureListener { Toast.makeText(requireContext(), "Failed to update AuraFlavors: ${it.message}", Toast.LENGTH_SHORT).show() }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}