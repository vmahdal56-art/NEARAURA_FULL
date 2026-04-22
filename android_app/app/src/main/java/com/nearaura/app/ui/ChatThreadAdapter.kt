package com.nearaura.app.ui

import android.content.Intent
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.nearaura.app.R
import com.nearaura.app.data.ChatThread
import de.hdodenhof.circleimageview.CircleImageView

class ChatThreadAdapter(private val threads: MutableList<ChatThread>) : RecyclerView.Adapter<ChatThreadAdapter.ViewHolder>() {

    class ViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        val profileImageView: CircleImageView = view.findViewById(R.id.profile_image_view)
        val userNameTextView: TextView = view.findViewById(R.id.user_name_text_view)
        val lastMessageTextView: TextView = view.findViewById(R.id.last_message_text_view)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val view = LayoutInflater.from(parent.context)
            .inflate(R.layout.item_chat_thread, parent, false)
        return ViewHolder(view)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val thread = threads[position]
        holder.userNameTextView.text = thread.otherUserName
        holder.lastMessageTextView.text = thread.lastMessage

        Glide.with(holder.itemView.context)
            .load(thread.otherUserProfilePictureUrl)
            .into(holder.profileImageView)

        holder.itemView.setOnClickListener {
            val context = holder.itemView.context
            val intent = Intent(context, ChatMessageActivity::class.java)
            intent.putExtra("OTHER_USER_ID", thread.otherUserId)
            context.startActivity(intent)
        }
    }

    override fun getItemCount() = threads.size

    fun updateThreads(newThreads: List<ChatThread>) {
        threads.clear()
        threads.addAll(newThreads)
        notifyDataSetChanged()
    }
}