package com.nearaura.app.ui
import androidx.fragment.app.activityViewModels



import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import com.nearaura.app.databinding.FragmentFilterBinding
import com.nearaura.app.viewmodel.FilterViewModel

class FilterFragment : Fragment() {

    private var _binding: FragmentFilterBinding? = null
    private val binding get() = _binding!!

    private val filterViewModel: FilterViewModel by activityViewModels()

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentFilterBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        binding.ageRangeSlider.addOnChangeListener { slider, _, _ ->
            val values = slider.values
            binding.ageRangeText.text = "${values[0].toInt()} - ${values[1].toInt()}"
        }

        binding.distanceSlider.addOnChangeListener { slider, value, _ ->
            binding.distanceText.text = "${value.toInt()} km"
        }

        binding.applyFiltersButton.setOnClickListener {
            val ageValues = binding.ageRangeSlider.values
            val distanceValue = binding.distanceSlider.value
            filterViewModel.applyFilters(ageValues[0].toInt(), ageValues[1].toInt(), distanceValue.toInt())
            // We would close the drawer here
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}