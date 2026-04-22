package com.nearaura.app.ui

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import com.google.firebase.firestore.FirebaseFirestore
import com.google.firebase.firestore.Query
import com.nearaura.app.data.Broadcast
import com.nearaura.app.databinding.FragmentBroadcastsBinding

class BroadcastsFragment : Fragment() {

    private var _binding: FragmentBroadcastsBinding? = null
    private val binding get() = _binding!!

    private lateinit var broadcastAdapter: BroadcastAdapter
    private val firestore by lazy { FirebaseFirestore.getInstance() }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentBroadcastsBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        setupRecyclerView()
        setupListeners()
        fetchBroadcasts()
    }

    private fun setupRecyclerView() {
        broadcastAdapter = BroadcastAdapter(mutableListOf())
        binding.broadcastsRecyclerView.apply {
            layoutManager = LinearLayoutManager(context)
            adapter = broadcastAdapter
        }
    }

    private fun setupListeners() {
        binding.startBroadcastButton.setOnClickListener {
            startActivity(Intent(requireContext(), StartBroadcastActivity::class.java))
        }
    }

    private fun fetchBroadcasts() {
        firestore.collection("broadcasts")
            .orderBy("createdAt", Query.Direction.DESCENDING)
            .limit(50)
            .addSnapshotListener { snapshots, e ->
                if (e != null) {
                    Log.w("BroadcastsFragment", "Listen failed.", e)
                    return@addSnapshotListener
                }

                val broadcasts = snapshots?.toObjects(Broadcast::class.java) ?: emptyList()
                broadcastAdapter.updateBroadcasts(broadcasts)
            }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}