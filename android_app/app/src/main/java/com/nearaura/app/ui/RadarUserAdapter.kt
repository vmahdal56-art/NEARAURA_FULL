package com.nearaura.app.ui

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.RecyclerView
import com.nearaura.app.R
import com.nearaura.app.data.User // Corrected import
import com.nearaura.app.databinding.ItemRadarUserBinding

// SOVEREIGN PATCH: Using ListAdapter for better performance
class RadarUserAdapter(
    private val onPlayVibeClicked: (User) -> Unit
) : ListAdapter<User, RadarUserAdapter.UserViewHolder>(UserDiffCallback()) {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): UserViewHolder {
        val binding = ItemRadarUserBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        return UserViewHolder(binding)
    }

    override fun onBindViewHolder(holder: UserViewHolder, position: Int) {
        holder.bind(getItem(position))
    }

    inner class UserViewHolder(private val binding: ItemRadarUserBinding) : RecyclerView.ViewHolder(binding.root) {
        fun bind(user: User) {
            binding.nameTextView.text = user.name
            
            // SOVEREIGN PATCH: Correctly referencing vibeVideoUrl from the updated User model
            if (user.vibeVideoUrl.isNotEmpty()) {
                binding.playVibeButton.visibility = View.VISIBLE
                binding.playVibeButton.setOnClickListener { onPlayVibeClicked(user) }
            } else {
                binding.playVibeButton.visibility = View.GONE
            }

            val fruitBadges = listOf(binding.fruitBadge1, binding.fruitBadge2)
            fruitBadges.forEach { it.visibility = View.GONE }

            // SOVEREIGN PATCH: Correctly referencing auraFlavors from the updated User model
            user.auraFlavors.take(2).forEachIndexed { index, flavor ->
                fruitBadges[index].apply {
                    visibility = View.VISIBLE
                    setImageResource(getFruitDrawable(flavor))
                }
            }
        }

        private fun getFruitDrawable(flavor: String): Int {
            return when (flavor) {
                "fruit_pineapple" -> R.drawable.ic_pineapple
                "fruit_banana" -> R.drawable.ic_banana
                "fruit_peach" -> R.drawable.ic_peach
                "fruit_grapes" -> R.drawable.ic_grapes
                else -> R.drawable.ic_add
            }
        }
    }
}

class UserDiffCallback : DiffUtil.ItemCallback<User>() {
    override fun areItemsTheSame(oldItem: User, newItem: User): Boolean {
        return oldItem.uid == newItem.uid
    }

    override fun areContentsTheSame(oldItem: User, newItem: User): Boolean {
        return oldItem == newItem
    }
}