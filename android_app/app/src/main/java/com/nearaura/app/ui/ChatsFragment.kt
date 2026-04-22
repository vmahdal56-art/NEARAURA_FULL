package com.nearaura.app.ui

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.FirebaseFirestore
import com.google.firebase.firestore.Query
import com.nearaura.app.data.ChatThread
import com.nearaura.app.databinding.FragmentChatsBinding

class ChatsFragment : Fragment() {

    private var _binding: FragmentChatsBinding? = null
    private val binding get() = _binding!!

    private lateinit var chatThreadAdapter: ChatThreadAdapter
    private val firestore by lazy { FirebaseFirestore.getInstance() }
    private val auth by lazy { FirebaseAuth.getInstance() }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentChatsBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        setupRecyclerView()
        fetchChatThreads()
    }

    private fun setupRecyclerView() {
        chatThreadAdapter = ChatThreadAdapter(mutableListOf())
        binding.chatsRecyclerView.apply {
            layoutManager = LinearLayoutManager(context)
            adapter = chatThreadAdapter
        }
    }

    private fun fetchChatThreads() {
        val currentUserId = auth.currentUser?.uid ?: return

        firestore.collection("chats")
            .whereArrayContains("members", currentUserId)
            .orderBy("timestamp", Query.Direction.DESCENDING)
            .addSnapshotListener { snapshots, e ->
                if (e != null) {
                    Log.w("ChatsFragment", "Listen failed.", e)
                    return@addSnapshotListener
                }

                if (snapshots!!.isEmpty) {
                    binding.emptyView.visibility = View.VISIBLE
                    binding.chatsRecyclerView.visibility = View.GONE
                } else {
                    binding.emptyView.visibility = View.GONE
                    binding.chatsRecyclerView.visibility = View.VISIBLE
                }

                val threads = snapshots.mapNotNull { doc ->
                    val otherUserId = (doc.get("members") as? List<String>)?.find { it != currentUserId } ?: ""
                    ChatThread(
                        id = doc.id,
                        otherUserId = otherUserId,
                        otherUserName = "Chat with $otherUserId", // Placeholder
                        lastMessage = doc.getString("lastMessage") ?: ""
                    )
                }

                chatThreadAdapter.updateThreads(threads)
            }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}