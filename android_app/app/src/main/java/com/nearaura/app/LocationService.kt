package com.nearaura.app

import android.app.*
import android.content.Context
import android.content.Intent
import android.location.Location
import android.os.IBinder
import androidx.core.app.NotificationCompat
import com.google.android.gms.location.*
import com.google.firebase.functions.FirebaseFunctions
import java.util.*

class LocationService : Service() {
    private lateinit var fusedLocationClient: FusedLocationProviderClient
    private val functions = FirebaseFunctions.getInstance()
    private lateinit var locationRequest: LocationRequest
    private lateinit var locationCallback: LocationCallback

    override fun onCreate() {
        super.onCreate()
        fusedLocationClient = LocationServices.getFusedLocationProviderClient(this)
        
        // 🔱 CREATE NOTIFICATION CHANNEL (Required for Proper Android 14+)
        createNotificationChannel()
        val notification = NotificationCompat.Builder(this, "NEAR_AURA_PULSE")
            .setContentTitle("NearAura Active")
            .setContentText("Your frequency is being guarded.")
            .setSmallIcon(android.R.drawable.ic_menu_mylocation)
            .setPriority(NotificationCompat.PRIORITY_LOW)
            .build()
        
        startForeground(1, notification)
        setupLocationUpdates()
    }

    private fun setupLocationUpdates() {
        locationRequest = LocationRequest.create().apply {
            interval = 600000 // 10 minutový "Sovereign Pulse"
            fastestInterval = 300000
            priority = LocationRequest.PRIORITY_HIGH_ACCURACY
        }

        locationCallback = object : LocationCallback() {
            override fun onLocationResult(locationResult: LocationResult) {
                locationResult.lastLocation?.let { syncWithCloud(it) }
            }
        }
        
        try {
  fusedLocationClient.requestLocationUpdates(locationRequest, locationCallback, android.os.Looper.getMainLooper())
  
        } catch (e: SecurityException) {
            println("NearAura: Permission denied. The Shield is broken.")
        }
    }

    private fun syncWithCloud(location: Location) {
        val data = hashMapOf(
            "latitude" to location.latitude,
            "longitude" to location.longitude,
            "hardwareId" to MainActivity.getHardwareId(this),
            "screenTime" to MainActivity.getDailyScreenTime(this)
        )

        functions.getHttpsCallable("updateLocation")
            .call(data)
            .addOnSuccessListener { println("NearAura: Pulse Sent. Truth Synced.") }
            .addOnFailureListener { e -> println("NearAura: Sync Failed: ${e.message}") }
    }

    private fun createNotificationChannel() {
        val channel = NotificationChannel(
            "NEAR_AURA_PULSE",
            "NearAura Heartbeat",
            NotificationManager.IMPORTANCE_LOW
        )
        val manager = getSystemService(NotificationManager::class.java)
        manager.createNotificationChannel(channel)
    }

    override fun onBind(intent: Intent?): IBinder? = null
}
