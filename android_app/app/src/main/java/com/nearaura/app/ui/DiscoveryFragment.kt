package com.nearaura.app.ui

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.GridLayoutManager
import com.google.firebase.firestore.FirebaseFirestore
import com.nearaura.app.data.User
import com.nearaura.app.databinding.FragmentDiscoveryBinding

class DiscoveryFragment : Fragment() {

    private var _binding: FragmentDiscoveryBinding? = null
    private val binding get() = _binding!!

    private lateinit var profileAdapter: ProfileAdapter
    private val firestore by lazy { FirebaseFirestore.getInstance() }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentDiscoveryBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        setupRecyclerView()
        setupWorldSwitch()

        loadUsers(false) // Load FarWorld by default
    }

    private fun setupRecyclerView() {
        profileAdapter = ProfileAdapter(emptyList())
        binding.recyclerViewDiscovery.apply {
            layoutManager = GridLayoutManager(context, 2) // Span count will be optimized later
            adapter = profileAdapter
        }
    }

    private fun setupWorldSwitch() {
        binding.switchWorld.setOnCheckedChangeListener { _, isChecked ->
            loadUsers(isChecked)
        }
    }

    private fun loadUsers(isNearWorld: Boolean) {
        if (isNearWorld) {
            // TODO: Implement GeoFirestore query
        } else {
            firestore.collection("users")
                .whereEqualTo("isAiVerified", true)
                .get()
                .addOnSuccessListener { documents ->
                    val users = documents.toObjects(User::class.java)
                    profileAdapter.updateUsers(users)
                }
                .addOnFailureListener {
                    // Handle error
                }
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}