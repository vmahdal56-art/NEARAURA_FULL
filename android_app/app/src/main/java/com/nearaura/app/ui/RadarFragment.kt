package com.nearaura.app.ui

import android.os.Bundle
import android.view.View
import androidx.fragment.app.Fragment
import androidx.fragment.app.activityViewModels
import com.google.firebase.ktx.Firebase
import com.google.firebase.storage.FirebaseStorage
import com.google.firebase.storage.UploadTask
import com.google.firebase.storage.ktx.storage
import com.nearaura.app.R
import com.nearaura.app.data.User
import com.nearaura.app.network.Resource // 🔱 TADY JE TA SPRÁVNÁ OCEL
import com.nearaura.app.viewmodel.SharedScanViewModel

class RadarFragment : Fragment(R.layout.fragment_radar) {

    private val sharedViewModel: SharedScanViewModel by activityViewModels()
    private val storage by lazy { Firebase.storage }
    private lateinit var adapter: RadarUserAdapter

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        
        // Inicializace adaptéru a RecyclerView patří sem
        
        observeProximityAuras()
    }

    // Logic to handle the 40x Multiplier scan
    private fun observeProximityAuras() {
        sharedViewModel.bleDiscoveredUsers.observe(viewLifecycleOwner) { resource ->
            // 🔱 ČISTÝ ŘEZ: Všechno jede přes jednotný Resource
            when (resource) {
                is Resource.Success -> {
                    val userList = resource.data ?: emptyList()
                    adapter.submitList(userList)
                }
                is Resource.Loading -> {
                    // Tady si můžeš točit loading kolečkem
                }
                is Resource.Error -> {
                    // Tady můžeš vypsat chybu
                }
                else -> {
                    // Ostatní stavy
                }
            }
        }
    }
}