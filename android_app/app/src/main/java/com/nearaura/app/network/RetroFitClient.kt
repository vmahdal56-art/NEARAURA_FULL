package com.nearaura.app.network

import okhttp3.OkHttpClient
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

object RetrofitClient {
    private const val BASE_URL = "https://us-central1-huddleme.cloudfunctions.net/" // REVERTED

    val apiService: ApiService by lazy {
        val retrofit = Retrofit.Builder()
            .baseUrl(BASE_URL)
            .addConverterFactory(GsonConverterFactory.create())
            .client(OkHttpClient.Builder().build()) // You can add interceptors here
            .build()
        retrofit.create(ApiService::class.java)
    }
}