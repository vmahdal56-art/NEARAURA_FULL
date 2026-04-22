package com.nearaura.app.ui

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.RecyclerView
import com.nearaura.app.data.User // Corrected import
import com.nearaura.app.databinding.ItemUserVerificationBinding

// SOVEREIGN PATCH: Using ListAdapter for better performance and isAdmin check
class UserVerificationAdapter(
    private val onUserVerificationClicked: (User, Boolean) -> Unit,
    private val isAdmin: Boolean
) : ListAdapter<User, UserVerificationAdapter.UserViewHolder>(UserDiffCallback()) {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): UserViewHolder {
        val binding = ItemUserVerificationBinding.inflate(
            LayoutInflater.from(parent.context),
            parent,
            false
        )
        return UserViewHolder(binding)
    }

    override fun onBindViewHolder(holder: UserViewHolder, position: Int) {
        holder.bind(getItem(position))
    }

    inner class UserViewHolder(private val binding: ItemUserVerificationBinding) : RecyclerView.ViewHolder(binding.root) {
        fun bind(user: User) {
            binding.userNameTextView.text = user.name

            // SOVEREIGN PATCH: Correctly using isAdmin property passed to adapter
            if (isAdmin) {
                binding.verifyButton.visibility = View.VISIBLE
                binding.rejectButton.visibility = View.VISIBLE
            } else {
                binding.verifyButton.visibility = View.GONE
                binding.rejectButton.visibility = View.GONE
            }

            binding.verifyButton.setOnClickListener {
                onUserVerificationClicked(user, true)
            }

            binding.rejectButton.setOnClickListener {
                onUserVerificationClicked(user, false)
            }
        }
    }
}

// DiffUtil is already defined in RadarUserAdapter.kt, but it's fine to have it here for clarity
// as long as the other file is compiled first. For a real project, this would be in its own file.
class UserVerificationDiffCallback : DiffUtil.ItemCallback<User>() {
    override fun areItemsTheSame(oldItem: User, newItem: User): Boolean {
        return oldItem.uid == newItem.uid
    }

    override fun areContentsTheSame(oldItem: User, newItem: User): Boolean {
        return oldItem == newItem
    }
}