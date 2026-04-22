package com.nearaura.app.network

import com.google.firebase.functions.FirebaseFunctions
import com.google.firebase.functions.FirebaseFunctionsException

object MetalEngine {
    private val f = FirebaseFunctions.getInstance()

    /**
     * Zavolá Cloud Funkci a poctivě vytáhne data ven.
     */
    fun call(name: String, data: Map<String, Any>) = f
        .getHttpsCallable(name)
        .call(data)
        .continueWith { task ->
            if (!task.isSuccessful) {
                val e = task.exception
                if (e is FirebaseFunctionsException) {
                    println("Chyba v mašině Mahdal: ${e.code}, ${e.message}")
                }
                null
            } else {
                // 🏗️ TADY JE TA OPRAVA: Použijeme explicitní getData() 
                // místo toho, abychom na to sahali napřímo jako na private pole.
                task.result?.getData()
            }
        }
}