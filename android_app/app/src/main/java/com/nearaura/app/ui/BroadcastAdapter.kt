package com.nearaura.app.ui

import android.content.Intent
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.nearaura.app.R
import com.nearaura.app.data.Broadcast

class BroadcastAdapter(private val broadcasts: MutableList<Broadcast>) : RecyclerView.Adapter<BroadcastAdapter.ViewHolder>() {

    class ViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        val topicTextView: TextView = view.findViewById(R.id.broadcast_topic_text_view)
        val creatorTextView: TextView = view.findViewById(R.id.creator_name_text_view)
        val joinButton: Button = view.findViewById(R.id.join_broadcast_button)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val view = LayoutInflater.from(parent.context)
            .inflate(R.layout.item_broadcast, parent, false)
        return ViewHolder(view)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val broadcast = broadcasts[position]
        holder.topicTextView.text = broadcast.topic
        holder.creatorTextView.text = "by ${broadcast.creatorName}"

        holder.joinButton.setOnClickListener {
            val context = holder.itemView.context
            val intent = Intent(context, BroadcastActivity::class.java)
            intent.putExtra("BROADCAST_ID", broadcast.id)
            context.startActivity(intent)
        }
    }

    override fun getItemCount() = broadcasts.size

    fun updateBroadcasts(newBroadcasts: List<Broadcast>) {
        broadcasts.clear()
        broadcasts.addAll(newBroadcasts)
        notifyDataSetChanged()
    }
}