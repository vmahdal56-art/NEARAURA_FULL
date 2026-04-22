package com.nearaura.app

import android.os.Bundle
import android.view.View
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.GridLayoutManager
import androidx.recyclerview.widget.RecyclerView

class DiscoveryFragment : Fragment(R.layout.fragment_discovery) {

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        val recyclerView = view.findViewById<RecyclerView>(R.id.discoveryGrid)
        
        // THE ORCHARD DNA: 2 columns, high density
        recyclerView.layoutManager = GridLayoutManager(context, 2)
        
        // TODO: Attach OrchardAdapter with Vibe Check logic
    }
}
