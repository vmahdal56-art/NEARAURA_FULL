package com.nearaura.app.ui

import android.graphics.Color
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.nearaura.app.R
import com.nearaura.app.databinding.ItemOrchardGridBinding
import com.nearaura.app.data.User

class OrchardGridAdapter(private val users: List<User>) : 
    RecyclerView.Adapter<OrchardGridAdapter.UserViewHolder>() {

    class UserViewHolder(val binding: ItemOrchardGridBinding) : RecyclerView.ViewHolder(binding.root)

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): UserViewHolder {
        val binding = ItemOrchardGridBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        return UserViewHolder(binding)
    }

    override fun onBindViewHolder(holder: UserViewHolder, position: Int) {
        val user = users[position]
        
        // 1. SET INTENT ICON & COLOR (DNA Fix)
        when (user.currentIntent) {
            "PINEAPPLE" -> {
                holder.binding.fruitBadge.text = "🍍"
                holder.binding.intentLabel.text = "DATING"
                holder.binding.intentLabel.setTextColor(Color.parseColor("#EAB308")) // Yellow
            }
            "MELON" -> {
                holder.binding.fruitBadge.text = "🍈"
                holder.binding.intentLabel.text = "HOBBIES.SPORT"
                holder.binding.intentLabel.setTextColor(Color.RED) // RED ENFORCED
            }
            "CHERRY" -> {
                holder.binding.fruitBadge.text = "��"
                holder.binding.intentLabel.text = "MEETUP"
                holder.binding.intentLabel.setTextColor(Color.RED)
            }
        }

        // 2. APPLY RAINBOW AURA (The Soul)
        if (user.auraScore > 80) {
            holder.binding.auraFrame.visibility = View.VISIBLE
//             holder.binding.auraFrame.setAuraPower(user.auraScore)
        }

        // 3. 40x MEGA BOOST SHIMMER
        if (user.isMegaBoosted) {
            holder.binding.root.alpha = 1.0f
            // Trigger Gold Shimmer Animation here
        }
    }

    override fun getItemCount() = users.size
}
