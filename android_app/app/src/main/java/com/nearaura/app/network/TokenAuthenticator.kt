// 1. Change this package name
package com.nearaura.app.network // CORRECTED


import android.content.Context
import android.content.Intent
// 2. Change the import path to match

import com.nearaura.app.utils.TokenManager
import com.nearaura.app.ui.LoginActivity

import okhttp3.Authenticator
import okhttp3.Request
import okhttp3.Response
import okhttp3.Route

class TokenAuthenticator(private val context: Context, private val tokenManager: TokenManager) : Authenticator {
    override fun authenticate(route: Route?, response: Response): Request? {
        // This is a simple authenticator that forces logout on 401.
        // A more complex version could try to refresh the token.
        tokenManager.clearToken()
        val intent = Intent(context, LoginActivity::class.java)
        intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
        context.startActivity(intent)
        return null // Indicates that the request should not be retried.
    }
}