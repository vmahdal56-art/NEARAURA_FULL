package com.nearaura.app.ui

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.nearaura.app.R
import com.nearaura.app.data.Meetup
import java.text.SimpleDateFormat
import java.util.Locale

class MeetupAdapter(private val meetups: MutableList<Meetup>) : RecyclerView.Adapter<MeetupAdapter.ViewHolder>() {

    class ViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        val titleTextView: TextView = view.findViewById(R.id.meetup_title_text_view)
        val descriptionTextView: TextView = view.findViewById(R.id.meetup_description_text_view)
        val locationTextView: TextView = view.findViewById(R.id.meetup_location_text_view)
        val timeTextView: TextView = view.findViewById(R.id.meetup_time_text_view)
        val joinButton: Button = view.findViewById(R.id.join_meetup_button)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val view = LayoutInflater.from(parent.context)
            .inflate(R.layout.item_meetup, parent, false)
        return ViewHolder(view)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val meetup = meetups[position]
        holder.titleTextView.text = meetup.title
        holder.descriptionTextView.text = meetup.description
        holder.locationTextView.text = meetup.locationName

        val sdf = SimpleDateFormat("dd/MM/yyyy 'at' HH:mm", Locale.getDefault())
        holder.timeTextView.text = meetup.eventTime?.let { sdf.format(it) } ?: "Date not set"

        // TODO: Implement join/leave logic
        holder.joinButton.setOnClickListener {
            // Handle join button click
        }
    }

    override fun getItemCount() = meetups.size

    fun updateMeetups(newMeetups: List<Meetup>) {
        meetups.clear()
        meetups.addAll(newMeetups)
        notifyDataSetChanged()
    }
}