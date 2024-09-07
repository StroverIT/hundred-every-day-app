package com.anonymous.hundred_every_day_app

import android.net.http.HttpResponseCache.install
import io.github.jan.supabase.postgrest.Postgrest
import io.github.jan.supabase.gotrue.Auth

import io.github.jan.supabase.createSupabaseClient
import android.util.Log


class SupabaseClientManager {

    // Supabase URL and anon key
    private val supabaseUrl = "http://localhost:54321"
    private val supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0"

    // Initialize Supabase Client
    val supabaseClient = createSupabaseClient(
            supabaseUrl = supabaseUrl,
            supabaseKey = supabaseKey,
    ){
        install(Auth)
        install(Postgrest)
    }

    companion object {
        // Singleton pattern to ensure the same instance is used across the app
        private var instance: SupabaseClientManager? = null

        fun getInstance(): SupabaseClientManager {
            if (instance == null) {
                instance = SupabaseClientManager()
            }
            return instance!!
        }
    }

    // Expose the GoTrue client for authentication
    // fun getAuthClient(): GoTrueClient {
    //     return authClient
    // }
}
