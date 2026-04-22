const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * ============================================================================
 * SDH - SOFTWARE DEFINED HUMANITY | ULTIMATE MASTER BURNER
 * ----------------------------------------------------------------------------
 * PROTOCOL: ASI (Aura System Interconnect)
 * TARGETS: Android App (Kotlin), Cloud Functions (Node.js), Web (TSX)
 * ============================================================================
 */

const KILL_SWITCH = "DESTROY(PLAST, CO2, CHEM, BOLLOCKS, LIES, NOISE) && EXECUTE(TRUTH, METAL, WOOD, COTTON, TA);";

console.log("🔱 INITIATING MASSIVE DNA MERGE... STAND BY.");

// --- I. BACKEND: CLOUD FUNCTIONS (index.js) ---
const functionsPath = './android_app/functions/index.js';
const sdhFunctions = `
/** 🔱 SDH ENGINE: AUTOMATED ORCHESTRATION & TELEMETRY 🔱 **/

const nodemailer = require('nodemailer'); // Pro posílání videí dárci

// 1. INGRESS VTEP: Vytvoření tunelu pravdy
exports.createVTEPTunnel = functions.https.onCall(async (data, context) => {
    const { donorId, zone, payload, amount } = data;
    const vni = "VNI-" + Date.now() + "-" + Math.floor(Math.random() * 1000);
    
    const shipment = {
        vni, 
        donorId, 
        targetZone: zone, 
        payload, 
        amount,
        status: 'INGRESS',
        path: 'PRIMARY_RAFAH', 
        health: 100, 
        smileIndex: 0,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        history: [{ time: new Date().toISOString(), msg: "VTEP Encapsulation Complete." }]
    };

    await admin.firestore().collection('shipments').doc(vni).set(shipment);
    
    // NOTIFIKACE: Maker (Výroba)
    await admin.messaging().send({
        notification: { title: 'AURANET: PRODUKCE', body: 'Nová KPZ mise pro ' + zone },
        topic: 'auranet_makers'
    });

    return { vni };
});

// 2. SIEM: Orchestrace a automatický Failover
exports.onFabricUpdate = functions.firestore.document('shipments/{vni}')
    .onUpdate(async (change, context) => {
        const newData = change.after.data();
        const oldData = change.before.data();
        const vni = context.params.vni;

        // BFD (Bidirectional Forwarding Detection) - Detekce blokády
        if (newData.health < 50 && newData.path === 'PRIMARY_RAFAH') {
            console.log("[SIEM] Link Failure Detected on PRIMARY. Rerouting...");
            return change.after.ref.update({
                path: 'TUNNEL_SECURE',
                history: admin.firestore.FieldValue.arrayUnion({
                    time: new Date().toISOString(),
                    msg: "SNAKE DETECTED. Failover to TUNNEL path active."
                })
            });
        }

        // QOS: Prioritizace doručení (Notifikace pro doktora)
        if (newData.status === 'EGRESS_DOCTOR' && oldData.status !== 'EGRESS_DOCTOR') {
            await admin.messaging().send({
                notification: { title: 'DOKTORE, POMOC JE ZDE', body: 'Zásilka ' + vni + ' dorazila na checkpoint.' },
                topic: 'auranet_doctors_' + newData.targetZone
            });
        }

        // FINAL: Smile Index & Alpha Wave Email
        if (newData.status === 'DELIVERED' && newData.smileIndex > 90 && !oldData.deliveredAt) {
            console.log("[ORCHESTRATOR] High Smile Index. Triggering Alpha Wave Confirmation.");
            // Zde by šla integrace s tvým e-mailovým providerem
        }
    });
`;

// --- II. ANDROID: TELEMETRY SERVICE (Kotlin) ---
const androidServicePath = './android_app/app/src/main/java/com/nearaura/app/AuraSDHService.kt';
const androidServiceCode = `
package com.nearaura.app

import com.google.firebase.messaging.FirebaseMessagingService
import com.google.firebase.messaging.RemoteMessage
import android.app.NotificationChannel
import android.app.NotificationManager
import android.content.Context
import android.os.Build
import androidx.core.app.NotificationCompat

class AuraSDHService : FirebaseMessagingService() {
    override fun onMessageReceived(remoteMessage: RemoteMessage) {
        val channelId = "AURANET_SDH_ALERTS"
        val notificationManager = getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channel = NotificationChannel(channelId, "Auranet Alerts", NotificationManager.IMPORTANCE_HIGH)
            notificationManager.createNotificationChannel(channel)
        }

        val notification = NotificationCompat.Builder(this, channelId)
            .setContentTitle(remoteMessage.notification?.title)
            .setContentText(remoteMessage.notification?.body)
            .setSmallIcon(android.R.drawable.ic_dialog_info) // Nahraď svou ikonou
            .setAutoCancel(true)
            .build()

        notificationManager.notify(System.currentTimeMillis().toInt(), notification)
    }
}
`;

// --- III. WEB: THE COMPLETE SDH ALTAR (helppage.tsx) ---
const webPath = './src/helppage.tsx';
const webCode = `
import React, { useState, useEffect } from 'react';
import { db, functions } from '../firebase'; 
import { collection, onSnapshot, doc, updateDoc, setDoc } from 'firebase/firestore';
import { httpsCallable } from 'firebase/functions';
import { 
  Globe, Heart, Truck, Hammer, ShieldCheck, Terminal, 
  Zap, Lock, Activity, Play, Waves, AlertTriangle 
} from 'lucide-react';

const KILL_SWITCH = "${KILL_SWITCH}";

export default function HelpPage() {
  const [role, setRole] = useState('ORCHESTRATOR');
  const [shipments, setShipments] = useState([]);
  const [fabricHealth, setFabricHealth] = useState(100);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'shipments'), (snap) => {
      const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setShipments(data);
      // Výpočet zdraví fabricu na základě integrity paketů
      const avgHealth = data.length > 0 ? data.reduce((acc, curr) => acc + (curr.health || 0), 0) / data.length : 100;
      setFabricHealth(Math.round(avgHealth));
    });
    return () => unsub();
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 font-mono flex flex-col md:flex-row overflow-hidden">
      {/* 1. CONTROL PLANE (SIDEBAR) */}
      <nav className="w-full md:w-24 bg-black border-r border-neutral-900 flex md:flex-col items-center py-8 gap-8 z-50 shadow-2xl">
        <div className="text-amber-600 mb-4 animate-pulse"><Zap size={32} fill="currentColor" /></div>
        <NavBtn icon={Activity} active={role === 'ORCHESTRATOR'} onClick={() => setRole('ORCHESTRATOR')} label="SIEM" />
        <NavBtn icon={Globe} active={role === 'DONOR'} onClick={() => setRole('DONOR')} label="INGRESS" />
        <NavBtn icon={Truck} active={role === 'TRANSPORT'} onClick={() => setRole('TRANSPORT')} label="LIFT" />
        <NavBtn icon={Heart} active={role === 'DOCTOR'} onClick={() => setRole('DOCTOR')} label="EGRESS" />
      </nav>

      {/* 2. DATA PLANE (MAIN) */}
      <main className="flex-grow flex flex-col h-screen">
        <header className="h-16 border-b border-neutral-900 bg-black/50 backdrop-blur-md flex items-center justify-between px-10">
          <div className="text-xs font-black tracking-widest text-neutral-500 uppercase">
            {role} MODULE // HEALTH: <span className={fabricHealth < 80 ? "text-red-500" : "text-emerald-500"}>{fabricHealth}%</span>
          </div>
          <div className="text-[10px] text-amber-600 font-mono italic opacity-50 hidden lg:block">{KILL_SWITCH}</div>
        </header>

        <div className="flex-grow p-10 overflow-y-auto custom-scrollbar">
          {role === 'ORCHESTRATOR' && <SIEMDashboard shipments={shipments} />}
          {role === 'DONOR' && <DonorDashboard onDonate={(z, p) => httpsCallable(functions, 'createVTEPTunnel')({zone: z, payload: p, amount: 500})} />}
          {role === 'TRANSPORT' && <TransportDashboard shipments={shipments} />}
          {role === 'DOCTOR' && <DoctorDashboard shipments={shipments} />}
        </div>
      </main>
    </div>
  );
}

// --- SUB-MODULES ---

const SIEMDashboard = ({ shipments }) => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
    <div className="lg:col-span-2 bg-black border border-neutral-900 rounded-2xl overflow-hidden flex flex-col">
      <div className="bg-neutral-900 p-4 border-b border-neutral-800 flex justify-between">
        <span className="text-xs font-bold text-amber-500 flex items-center gap-2"><Terminal size={14}/> REAL-TIME LEDGER LOGS</span>
        <span className="text-[10px] text-neutral-600 uppercase">Total VTEPs: {shipments.length}</span>
      </div>
      <div className="flex-grow p-4 font-mono text-[10px] overflow-y-auto space-y-2">
        {shipments.map(s => (
          <div key={s.vni} className="border-b border-neutral-900 pb-1">
            <span className="text-neutral-500">[{new Date().toLocaleTimeString()}]</span>
            <span className="text-blue-400 ml-2">{s.vni}:</span> {s.status} | PATH: {s.path}
          </div>
        ))}
      </div>
    </div>
    <div className="space-y-6">
      <div className="bg-neutral-900 p-6 rounded-2xl border border-neutral-800 shadow-xl">
        <h3 className="text-[10px] text-neutral-500 font-bold mb-4 uppercase">Global Policy</h3>
        <div className="text-xs space-y-2">
          <div className="flex justify-between border-b border-neutral-800 pb-2"><span>QoS EF (Medicine)</span><span className="text-emerald-500">PRIORITY</span></div>
          <div className="flex justify-between border-b border-neutral-800 pb-2"><span>Snake Purge</span><span className="text-amber-500">AUTO_ENABLE</span></div>
        </div>
      </div>
    </div>
  </div>
);

const DonorDashboard = ({ onDonate }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in duration-500">
    {['GAZA_SECTOR_4', 'YEMEN_NORTH', 'UA_DONETSK'].map(zone => (
      <div key={zone} className="bg-neutral-900 border border-neutral-800 p-8 rounded-3xl hover:border-amber-600 transition-all group">
        <h3 className="text-2xl font-bold text-white mb-2">{zone.replace('_', ' ')}</h3>
        <p className="text-xs text-neutral-500 mb-6 uppercase">Target Mission Area</p>
        <button 
          onClick={() => onDonate(zone, 'Léky + Hračky')}
          className="w-full py-4 bg-amber-600 text-black font-black uppercase tracking-widest hover:bg-amber-500 shadow-2xl transition-all"
        >
          Inject Help ($500)
        </button>
      </div>
    ))}
  </div>
);

const TransportDashboard = ({ shipments }) => (
  <div className="space-y-4">
    {shipments.filter(s => s.status !== 'DELIVERED').map(s => (
      <div key={s.vni} className="bg-neutral-900 p-6 border-l-4 border-blue-600 flex justify-between items-center">
        <div>
          <p className="text-xs text-neutral-500 uppercase font-bold">VTEP: {s.vni}</p>
          <p className="text-xl font-bold text-white mt-1">{s.targetZone}</p>
          <p className="text-[10px] text-blue-400 font-mono mt-1">STATUS: {s.status} | PATH: {s.path}</p>
        </div>
        <button 
          onClick={() => updateDoc(doc(db, 'shipments', s.vni), { status: 'CONVOY_A', location: 'IN_TRANSIT' })}
          className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 font-bold text-xs uppercase shadow-xl"
        >
          Update Hop
        </button>
      </div>
    ))}
  </div>
);

const DoctorDashboard = ({ shipments }) => (
  <div className="grid gap-6">
    {shipments.filter(s => s.status === 'CONVOY_A').map(s => (
      <div key={s.vni} className="bg-neutral-900 p-8 border-l-4 border-rose-600 rounded-r-2xl shadow-2xl">
        <div className="flex justify-between items-start mb-6">
           <div>
              <h3 className="text-2xl font-bold text-white">{s.payload}</h3>
              <p className="text-xs text-neutral-500 font-mono mt-1">VNI: {s.vni} | ORIGIN: GEEZER_HQ</p>
           </div>
           <AlertTriangle className="text-rose-500" />
        </div>
        <button 
          onClick={() => updateDoc(doc(db, 'shipments', s.vni), { status: 'DELIVERED', smileIndex: 99, videoUrl: 'https://cdn.aura/v1' })}
          className="w-full bg-rose-700 hover:bg-rose-600 py-4 font-black uppercase tracking-widest"
        >
          Confirm Handover & Video Link
        </button>
      </div>
    ))}
  </div>
);

function NavBtn({ icon: Icon, active, onClick, label }: any) {
  return (
    <button onClick={onClick} className={\`p-4 rounded-2xl transition-all \${active ? "bg-amber-600 text-black shadow-xl scale-110" : "text-neutral-500 hover:bg-neutral-900"}\`}>
      <Icon size={24} />
    </button>
  );
}
`;

// --- IV. THE EXECUTION (FINAL MERGE) ---
try {
  console.log("📁 Patching Cloud Functions...");
  // Používáme append pro zachování tvého stávajícího index.js
  if (fs.existsSync(functionsPath)) {
    fs.appendFileSync(functionsPath, sdhFunctions);
    console.log("✅ index.js Merged.");
  }

  console.log("📁 Injecting Android SDK...");
  const androidDir = path.dirname(androidServicePath);
  if (!fs.existsSync(androidDir)) fs.mkdirSync(androidDir, { recursive: true });
  fs.writeFileSync(androidServicePath, androidServiceCode);

  console.log("📁 Deploying Web Interface (helppage.tsx)...");
  fs.writeFileSync(webPath, webCode);

  console.log("--------------------------------------------------");
  console.log("🏆 ATOMIC BURN COMPLETE. SYSTEM IS SYNCED.");
  console.log("TA! 🛡️✨🏛️🚀");

} catch (e) {
  console.error("❌ THE BURN FAILED:", e);
}