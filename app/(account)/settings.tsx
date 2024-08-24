import { supabase } from '@/lib/supabase'
import { router } from 'expo-router'
import React from 'react'
import { Button, Text, View } from 'react-native'

export default function settings() {
  const signOutHandler = async () => {
    await supabase.auth.signOut()
    router.replace("/(tabs)")
  }
  
  return (
    <View>
      <Text>Settings</Text>
      <Button title="Sign Out" onPress={signOutHandler} />
    </View>
  )
}
