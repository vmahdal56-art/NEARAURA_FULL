package com.nearaura.app.network

import com.nearaura.app.data.User
import okhttp3.MultipartBody
import okhttp3.RequestBody
import retrofit2.Response
import retrofit2.http.GET
import retrofit2.http.Multipart
import retrofit2.http.POST
import retrofit2.http.Part

interface ApiService {

    @GET("findHuddleMeUsersByDeviceIds")
    suspend fun getNearbyUsers(): List<User>

    @GET("user/settings") // Example endpoint
    suspend fun getUserSettings(): Response<User>

    @Multipart
    @POST("user/uploadPhoto") // Example endpoint
    suspend fun uploadProfilePhoto(
        @Part photo: MultipartBody.Part,
        @Part("slotIndex") slotIndex: RequestBody
    ): Response<Map<String, String>>
    
    // Add other API calls here
}