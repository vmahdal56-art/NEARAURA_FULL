package com.nearaura.app

import android.graphics.Color
import android.view.View
import android.view.animation.AnimationUtils
import androidx.recyclerview.widget.GridLayoutManager
import com.nearaura.R

/**
 * DNA PATCH: High-Density Orchard Grid (8 Profiles)
 * This implements the Sovereign Eight UI requirements.
 */
class OrchardGridHandler {

    fun setupGrid(recyclerView: androidx.recyclerview.widget.RecyclerView) {
        // 2 columns, 4 rows visible = 8 Profile Density
        val gridLayoutManager = GridLayoutManager(recyclerView.context, 2)
        recyclerView.layoutManager = gridLayoutManager
    }

    fun applySovereignUI(holder: ProfileViewHolder, user: User) {
        val directors = listOf("JV", "JM", "PM", "LA", "LH", "YM", "VM")
        val isDirector = directors.any { user.displayName?.startsWith(it) == true }

        if (isDirector) {
            // Apply Gold Aura Shader (Rainbow Aura DNA)
            // Note: Ensure your ProfileViewHolder has these IDs
            holder.itemView.findViewById<View>(R.id.profileImage).setBackgroundColor(Color.parseColor("#D4AF37"))
            holder.itemView.findViewById<View>(R.id.sovereignBadge).visibility = View.VISIBLE
            
            val pulse = AnimationUtils.loadAnimation(holder.itemView.context, R.anim.gold_pulse)
            holder.itemView.findViewById<View>(R.id.auraPulse).startAnimation(pulse)
        } else {
            holder.itemView.findViewById<View>(R.id.sovereignBadge).visibility = View.GONE
        }
    }
}
