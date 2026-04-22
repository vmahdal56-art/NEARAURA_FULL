package com.nearaura.app.ui

import android.os.Bundle
import android.text.*
import android.text.method.LinkMovementMethod
import android.text.style.ClickableSpan
import android.view.*
import android.widget.Button
import androidx.fragment.app.Fragment
import com.nearaura.app.databinding.FragmentSupportBinding
import com.nearaura.app.logic.OrchardAssistant

class SupportFragment : Fragment() {
    private var _binding: FragmentSupportBinding? = null
    private val binding get() = _binding!!
    private lateinit var assistant: OrchardAssistant

    override fun onCreateView(inf: LayoutInflater, cont: ViewGroup?, s: Bundle?): View {
        _binding = FragmentSupportBinding.inflate(inf, cont, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        assistant = OrchardAssistant(requireContext())
        
        binding.sendQueryButton.setOnClickListener {
            val input = binding.userInputEditText.text.toString()
            if (input.isNotBlank()) {
                val response = assistant.getAssistantResponse(input)
                renderResponse(response)
            }
        }
    }

    private fun renderResponse(text: String) {
        val spannable = SpannableString(text)
        val regex = "\\[(.*?)\\]".toRegex()
        binding.linkButtonsLayout.removeAllViews()

        regex.findAll(text).forEach { match ->
            val label = match.groupValues[1]
            val span = object : ClickableSpan() {
                override fun onClick(v: View) { assistant.openSovereignLink(label) }
            }
            spannable.setSpan(span, match.range.first, match.range.last + 1, Spanned.SPAN_EXCLUSIVE_EXCLUSIVE)
            
            // Add a dedicated quick-action button
            val btn = Button(requireContext()).apply {
                this.text = label
                setOnClickListener { assistant.openSovereignLink(label) }
            }
            binding.linkButtonsLayout.addView(btn)
        }
        binding.assistantResponseTextView.text = spannable
        binding.assistantResponseTextView.movementMethod = LinkMovementMethod.getInstance()
    }
}