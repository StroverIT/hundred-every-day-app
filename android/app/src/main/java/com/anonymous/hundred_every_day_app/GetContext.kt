package com.anonymous.hundred_every_day_app

import android.content.Context
import android.app.Application

object MySingleton {
    private lateinit var context: Context
  
    fun init(context: Context) {
        this.context = context.applicationContext
    } 
    fun getContext(): Context {
        return context
    }
}

class GetContext(application: Application) {
    private val appContext = application.applicationContext

    companion object {
        fun getAppContext(): Context {
            return MySingleton.getContext()
        }
        fun setContext(context: Context){
            MySingleton.init(context)
        }

    }
}
