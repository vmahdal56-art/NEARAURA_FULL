package com.nearaura.app.ui

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import com.google.firebase.firestore.FirebaseFirestore
import com.google.firebase.firestore.Query
import com.nearaura.app.data.Meetup
import com.nearaura.app.databinding.FragmentMeetupsBinding

class MeetupsFragment : Fragment() {

    private var _binding: FragmentMeetupsBinding? = null
    private val binding get() = _binding!!

    private lateinit var meetupAdapter: MeetupAdapter
    private val firestore by lazy { FirebaseFirestore.getInstance() }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentMeetupsBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        setupRecyclerView()
        fetchMeetups()
    }

    private fun setupRecyclerView() {
        meetupAdapter = MeetupAdapter(mutableListOf())
        binding.meetupsRecyclerView.apply {
            layoutManager = LinearLayoutManager(context)
            adapter = meetupAdapter
        }
    }

    private fun fetchMeetups() {
        firestore.collection("meetups")
            .orderBy("eventTime", Query.Direction.ASCENDING)
            .whereGreaterThan("eventTime", com.google.firebase.Timestamp.now())
            .get()
            .addOnSuccessListener { documents ->
                val meetups = documents.toObjects(Meetup::class.java)
                meetupAdapter.updateMeetups(meetups)
            }
            .addOnFailureListener { exception ->
                Log.w("MeetupsFragment", "Error getting documents: ", exception)
            }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}