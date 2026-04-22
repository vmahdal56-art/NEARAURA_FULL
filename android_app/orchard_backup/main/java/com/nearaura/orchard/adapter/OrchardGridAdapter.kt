package com.nearaura.orchard.adapter

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
// Logic for High-Density 8-Profile Grid

class OrchardGridAdapter(private val users: List<User>) : RecyclerView.Adapter<OrchardGridAdapter.ViewHolder>() {
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.item_orchard_profile, parent, false)
        // Calculated width for 8-profile visibility (2 columns)
        view.layoutParams.width = parent.measuredWidth / 2
        return ViewHolder(view)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val user = users[position]
        // Apply Rainbow Aura to Pineapples
        if (user.fruits.contains("pineapple")) {
            holder.enableRainbowAura()
        }
    }
    override fun getItemCount() = users.size
    class ViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        fun enableRainbowAura() { /* Bind GLSL Shader here */ }
    }
}
