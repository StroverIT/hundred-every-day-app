// package com.anonymous.hundred_every_day_app

// import com.facebook.react.bridge.ReactApplicationContext
// import com.facebook.react.bridge.ReactContextBaseJavaModule
// import com.facebook.react.bridge.ReactMethod
// import com.facebook.react.bridge.Callback
// import android.util.Log
// import com.facebook.react.modules.core.DeviceEventManagerModule

// class GetUser(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

//     override fun getName(): String {
//         return "GetUser"
//     }

//     fun getUserData() {
//         // This will call the React Native method and expect a response
//         reactContext
//                 .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
//                 .emit("getUserDataRequest", null)
//     }

//     @ReactMethod
//     fun receiveUserDataFromReactNative(userData: String) {
//         // This method is expected to be called from React Native with the user data as argument
//         Log.d("GetUser", "Received user data: $userData")
//         MainActivity.userData = "testbrat"
//     }
// }
