package com.nearaura.app.ble

import android.app.Service
import android.bluetooth.BluetoothAdapter
import android.bluetooth.le.AdvertiseCallback
import android.bluetooth.le.AdvertiseData
import android.bluetooth.le.AdvertiseSettings
import android.bluetooth.le.BluetoothLeAdvertiser
import android.bluetooth.le.BluetoothLeScanner
import android.bluetooth.le.ScanCallback
import android.bluetooth.le.ScanFilter
import android.bluetooth.le.ScanResult
import android.bluetooth.le.ScanSettings
import android.content.Intent
import android.os.IBinder
import android.os.ParcelUuid
import android.util.Log
import java.nio.charset.Charset
import java.util.UUID

class BleService : Service() {

    private lateinit var bluetoothLeAdvertiser: BluetoothLeAdvertiser
    private lateinit var bluetoothLeScanner: BluetoothLeScanner
    private var currentUid: String? = null

    private val advertiseCallback = object : AdvertiseCallback() {
        override fun onStartSuccess(settingsInEffect: AdvertiseSettings?) {
            Log.d(TAG, "Advertising started successfully")
        }

        override fun onStartFailure(errorCode: Int) {
            Log.e(TAG, "Advertising failed with error code: $errorCode")
        }
    }

    private val scanCallback = object : ScanCallback() {
        override fun onScanResult(callbackType: Int, result: ScanResult?) {
            result?.scanRecord?.getServiceData(ParcelUuid(UUID.fromString(SERVICE_UUID)))?.let {
                val discoveredUid = String(it, Charset.defaultCharset())
                Log.d(TAG, "Found user with UID: $discoveredUid")
                if (discoveredUid != currentUid) { // Don't report self
                    val intent = Intent(ACTION_DEVICE_FOUND).apply {
                        putExtra(EXTRA_USER_ID, discoveredUid)
                    }
                    sendBroadcast(intent)
                }
            }
        }

        override fun onScanFailed(errorCode: Int) {
            Log.e(TAG, "Scan failed with error code: $errorCode")
        }
    }

    override fun onCreate() {
        super.onCreate()
        val bluetoothAdapter = BluetoothAdapter.getDefaultAdapter() ?: return
        bluetoothLeAdvertiser = bluetoothAdapter.bluetoothLeAdvertiser
        bluetoothLeScanner = bluetoothAdapter.bluetoothLeScanner
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        currentUid = intent?.getStringExtra(EXTRA_USER_ID)
        if (currentUid != null) {
            startAdvertising(currentUid!!)
            startScanning()
        } else {
            Log.e(TAG, "BleService started without a UID. Stopping.")
            stopSelf()
        }
        return START_STICKY
    }

    override fun onDestroy() {
        stopAdvertising()
        stopScanning()
        super.onDestroy()
    }

    private fun startAdvertising(uid: String) {
        val settings = AdvertiseSettings.Builder()
            .setAdvertiseMode(AdvertiseSettings.ADVERTISE_MODE_LOW_LATENCY)
            .setTxPowerLevel(AdvertiseSettings.ADVERTISE_TX_POWER_HIGH)
            .setConnectable(false)
            .build()

        val parcelUuid = ParcelUuid(UUID.fromString(SERVICE_UUID))
        val data = AdvertiseData.Builder()
            .setIncludeDeviceName(false)
            .addServiceUuid(parcelUuid)
            .addServiceData(parcelUuid, uid.toByteArray(Charset.defaultCharset()))
            .build()

        bluetoothLeAdvertiser.startAdvertising(settings, data, advertiseCallback)
    }

    private fun stopAdvertising() {
        if (::bluetoothLeAdvertiser.isInitialized) {
            bluetoothLeAdvertiser.stopAdvertising(advertiseCallback)
        }
    }

    private fun startScanning() {
        val scanFilter = ScanFilter.Builder()
            .setServiceUuid(ParcelUuid(UUID.fromString(SERVICE_UUID)))
            .build()

        val settings = ScanSettings.Builder()
            .setScanMode(ScanSettings.SCAN_MODE_LOW_LATENCY)
            .build()

        if (::bluetoothLeScanner.isInitialized) {
            bluetoothLeScanner.startScan(listOf(scanFilter), settings, scanCallback)
        }
    }

    private fun stopScanning() {
        if (::bluetoothLeScanner.isInitialized) {
            bluetoothLeScanner.stopScan(scanCallback)
        }
    }

    override fun onBind(intent: Intent?): IBinder? = null

    companion object {
        private const val TAG = "BleService"
        const val SERVICE_UUID = "00001101-0000-1000-8000-00805F9B34FB"
        const val ACTION_DEVICE_FOUND = "com.nearaura.app.ACTION_DEVICE_FOUND"
        const val EXTRA_USER_ID = "com.nearaura.app.EXTRA_USER_ID"
    }
}