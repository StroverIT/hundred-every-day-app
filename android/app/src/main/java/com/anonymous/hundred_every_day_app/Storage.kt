package com.anonymous.hundred_every_day_app

import android.content.Context
import android.content.SharedPreferences

class Storage(private val context: Context) {
    private val preferences: SharedPreferences = context.getSharedPreferences("timer", Context.MODE_PRIVATE)

    fun create(key: String, value: String) {
        preferences.edit().putString(key, value).apply()
    }

    fun get(key: String): String? {
        return preferences.getString(key, null)
    }

    fun update(key: String, value: String) {
        create(key, value)
    }
}
