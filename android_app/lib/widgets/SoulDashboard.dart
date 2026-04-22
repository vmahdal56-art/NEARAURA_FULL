import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

// --- SOUL EMOTION DASHBOARD (XX) ---
// 3 Tlačítka: PAIN (Red), JOY (Green), DOCTOR (Orange)
class SoulDashboard extends StatelessWidget {
  final String userId;

  SoulDashboard({required this.userId});

  void _sendSignal(BuildContext context, String type) {
    // 1. Odeslání do Vaultu (Firebase)
    FirebaseFirestore.instance.collection('soul_signals').add({
      'userId': userId,
      'type': type,
      'timestamp': FieldValue.serverTimestamp(),
      'status': 'PENDING', // Čeká na Doctor Aura
    });

    // 2. Okamžitá zpětná vazba pro uživatele (Haptic/Visual)
    ScaffoldMessenger.of(context).showSnackBar(SnackBar(
      content: Text("Signal '$type' sent to Doctor Aura. Protocol Active."),
      backgroundColor: type == 'PAIN' ? Colors.red : (type == 'JOY' ? Colors.green : Colors.orange),
      duration: Duration(seconds: 2),
    ));
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.symmetric(vertical: 20, horizontal: 10),
      padding: EdgeInsets.all(15),
      decoration: BoxDecoration(
        color: Colors.black87,
        borderRadius: BorderRadius.circular(25),
        border: Border.all(color: Colors.amber.shade700, width: 2), // Zlatý rámeček HOF
        boxShadow: [BoxShadow(color: Colors.amber.withOpacity(0.2), blurRadius: 10, spreadRadius: 2)],
      ),
      child: Column(
        children: [
          Text("SOUL MONITOR", style: TextStyle(color: Colors.amber, fontWeight: FontWeight.bold, letterSpacing: 2)),
          SizedBox(height: 15),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              _buildBtn(context, Icons.flash_on, "PAIN", Colors.redAccent, "PAIN"),
              _buildBtn(context, Icons.favorite, "JOY", Colors.greenAccent, "JOY"),
              _buildBtn(context, Icons.medical_services, "DOC", Colors.orangeAccent, "MEDICAL_UPDATE"),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildBtn(BuildContext context, IconData icon, String label, Color color, String signalType) {
    return InkWell(
      onTap: () => _sendSignal(context, signalType),
      child: Column(
        children: [
          Container(
            padding: EdgeInsets.all(12),
            decoration: BoxDecoration(shape: BoxShape.circle, color: color.withOpacity(0.2), border: Border.all(color: color, width: 2)),
            child: Icon(icon, color: color, size: 30),
          ),
          SizedBox(height: 5),
          Text(label, style: TextStyle(color: color, fontSize: 10, fontWeight: FontWeight.bold)),
        ],
      ),
    );
  }
}