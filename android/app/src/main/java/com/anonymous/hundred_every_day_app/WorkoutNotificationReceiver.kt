package com.anonymous.hundred_every_day_app

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.util.Log

class WorkoutNotificationReceiver : BroadcastReceiver() {

    override fun onReceive(context: Context, intent: Intent?) {
        Log.d("WorkoutNotificationReceiver", "Alarm received, sending notification")

        val notificationHelper = NotificationHelper(context)
        notificationHelper.createNotification(
            title = "Workout!",
            message = "Start working out, champion."
        )

        // Schedule the next alarm for tomorrow at 8 AM
        MainActivity.scheduleDailyNotification(context)
    }
}
