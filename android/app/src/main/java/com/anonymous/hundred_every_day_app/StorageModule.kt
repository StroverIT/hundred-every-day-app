package com.anonymous.hundred_every_day_app

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import android.content.SharedPreferences
import android.content.Context
import com.facebook.react.bridge.Promise


class StorageModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return "StorageModule"
    }

    private val context = GetContext.getAppContext()
    private val preferences = context.getSharedPreferences("timer", Context.MODE_PRIVATE)


    @ReactMethod
    fun create(key: String, value: String) {
        preferences.edit().putString(key, value).apply()
        MainActivity.scheduleDailyNotification(context)
    }

    @ReactMethod
    fun get(key: String, promise: Promise) {
        val value =  preferences.getString(key, null)
        if (value != null) {
            promise.resolve(value)
        } else {
            promise.reject("ERROR", "No value found.")
        }
    }

    @ReactMethod
    fun update(key: String, value: String) {
        create(key, value)
    }
}
