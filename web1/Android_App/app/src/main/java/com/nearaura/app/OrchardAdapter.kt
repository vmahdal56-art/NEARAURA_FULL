package com.nearaura.app

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide

class OrchardAdapter(private val users: List<User>) : RecyclerView.Adapter<OrchardAdapter.ViewHolder>() {

    class ViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        val name: TextView = view.findViewById(R.id.txtName)
        val image: ImageView = view.findViewById(R.id.profileImage)
        val badge: View = view.findViewById(R.id.sovereignBadge)
        val pulse: View = view.findViewById(R.id.auraPulse)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.item_profile_orchard, parent, false)
        return ViewHolder(view)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val user = users[position]
        holder.name.text = user.displayName
        
        // Load image (Glide required in build.gradle)
        Glide.with(holder.image.context).load(user.profileImageUrl).into(holder.image)

        // SOVEREIGN UI: Apply Gold Badge & Pulse for Directors
        val directors = listOf("JV", "JM", "PM", "LA", "LH", "YM", "VM")
        val isDirector = directors.any { user.displayName.startsWith(it) } || user.isSovereign

        if (isDirector) {
            holder.badge.visibility = View.VISIBLE
            holder.pulse.visibility = View.VISIBLE
            // Note: Animation logic is handled in the Patch we created earlier
        } else {
            holder.badge.visibility = View.GONE
            holder.pulse.visibility = View.GONE
        }
    }

    override fun getItemCount() = users.size
}
