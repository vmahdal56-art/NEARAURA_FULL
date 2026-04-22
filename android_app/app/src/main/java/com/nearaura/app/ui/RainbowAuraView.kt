package com.nearaura.app.ui

import android.content.Context
import android.graphics.Canvas
import android.graphics.Color
import android.graphics.LinearGradient
import android.graphics.Paint
import android.graphics.Shader
import android.util.AttributeSet
import android.widget.FrameLayout
import com.nearaura.app.R

class RainbowAuraView @JvmOverloads constructor(
    context: Context,
    attrs: AttributeSet? = null,
    defStyleAttr: Int = 0
) : FrameLayout(context, attrs, defStyleAttr) {

    private val borderPaint = Paint()
    private var isMegaBoosted = false
    private var pulseAnimator: android.animation.ValueAnimator? = null

    init {
        borderPaint.style = Paint.Style.STROKE
        borderPaint.strokeWidth = 10f // Initial stroke width
        borderPaint.shader = LinearGradient(
            0f, 0f, 0f, height.toFloat(),
            intArrayOf(Color.MAGENTA, Color.BLUE, Color.CYAN, Color.GREEN, Color.YELLOW, Color.RED),
            null, Shader.TileMode.MIRROR
        )
    }

    fun setMegaBoosted(isMegaBoosted: Boolean) {
        this.isMegaBoosted = isMegaBoosted
        if (isMegaBoosted) {
            startPulseAnimation()
        } else {
            stopPulseAnimation()
        }
        invalidate()
    }

    private fun startPulseAnimation() {
        pulseAnimator = android.animation.ValueAnimator.ofFloat(10f, 20f).apply {
            duration = 2000
            repeatMode = android.animation.ValueAnimator.REVERSE
            repeatCount = android.animation.ValueAnimator.INFINITE
            addUpdateListener { animation ->
                borderPaint.strokeWidth = animation.animatedValue as Float
                invalidate()
            }
            start()
        }
    }

    private fun stopPulseAnimation() {
        pulseAnimator?.cancel()
        borderPaint.strokeWidth = 10f
    }

    override fun onDraw(canvas: Canvas) {
        super.onDraw(canvas)
        canvas.drawRect(0f, 0f, width.toFloat(), height.toFloat(), borderPaint)
    }
}