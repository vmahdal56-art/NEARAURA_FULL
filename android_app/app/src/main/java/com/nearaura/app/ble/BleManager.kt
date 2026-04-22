package com.nearaura.app.ble

import android.annotation.SuppressLint
import android.bluetooth.BluetoothAdapter
import android.bluetooth.le.ScanCallback
import android.bluetooth.le.ScanFilter
import android.bluetooth.le.ScanResult
import android.bluetooth.le.ScanSettings
import android.content.Context
import android.os.ParcelUuid
import android.util.Log
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import java.util.UUID

/**
 * Manages Bluetooth Low Energy (BLE) scanning for nearby NearAura users.
 */
@SuppressLint("MissingPermission") // Permissions are handled by the calling Fragment/Activity
class BleManager(context: Context) {

    private val bluetoothAdapter: BluetoothAdapter? = BluetoothAdapter.getDefaultAdapter()
    private val bleScanner = bluetoothAdapter?.bluetoothLeScanner

    // A specific UUID to identify NearAura devices during scanning.
    // All NearAura apps will advertise this service UUID.
    private val serviceUuid: ParcelUuid = ParcelUuid(UUID.fromString("0000AURA-0000-1000-8000-00805F9B34FB"))

    private val _nearbyUsers = MutableLiveData<List<String>>()
    val nearbyUsers: LiveData<List<String>> = _nearbyUsers
    private val discoveredDevices = mutableSetOf<String>()

    private val scanCallback = object : ScanCallback() {
        override fun onScanResult(callbackType: Int, result: ScanResult?) {
            super.onScanResult(callbackType, result)
            result?.device?.address?.let { address ->
                if (!discoveredDevices.contains(address)) {
                    Log.d("BleManager", "Discovered NearAura device: $address")
                    discoveredDevices.add(address)
                    _nearbyUsers.postValue(discoveredDevices.toList())
                }
            }
        }

        override fun onScanFailed(errorCode: Int) {
            super.onScanFailed(errorCode)
            Log.e("BleManager", "BLE Scan Failed with error code: $errorCode")
        }
    }

    fun startScanning() {
        if (bleScanner == null || !bluetoothAdapter!!.isEnabled) {
            Log.e("BleManager", "Cannot start scan: BLE not supported or not enabled.")
            return
        }

        val scanFilter = ScanFilter.Builder()
            .setServiceUuid(serviceUuid)
            .build()

        val scanSettings = ScanSettings.Builder()
            .setScanMode(ScanSettings.SCAN_MODE_LOW_LATENCY)
            .build()

        Log.d("BleManager", "Starting BLE scan for NearAura devices...")
        discoveredDevices.clear() // Clear previous results
        bleScanner.startScan(listOf(scanFilter), scanSettings, scanCallback)
    }

    fun stopScanning() {
        if (bleScanner == null || !bluetoothAdapter!!.isEnabled) {
            return
        }
        Log.d("BleManager", "Stopping BLE scan.")
        bleScanner.stopScan(scanCallback)
    }
}