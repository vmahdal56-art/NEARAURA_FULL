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
                println("Chyba v mašině Mahdal: ${e?.message}")
                null
            } else {
                // Poctivá ocel - vytáhneme to přes getData()
                task.result?.getData()
            }
        }
}