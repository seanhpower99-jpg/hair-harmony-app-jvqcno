
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import BottomNavigation from '../components/BottomNavigation';
import { useUserType } from '../hooks/useUserType';
import { colors, commonStyles } from '../styles/commonStyles';

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();
  const { userType } = useUserType();
  const [activeTab, setActiveTab] = useState('home');

  const isMainScreen = segments.length >= 2 && 
    (segments[0] === 'customer' || segments[0] === 'hairdresser');

  const handleTabPress = (tab: string) => {
    console.log('Tab pressed:', tab);
    setActiveTab(tab);
    
    if (userType === 'customer') {
      router.push(`/customer/${tab}` as any);
    } else if (userType === 'hairdresser') {
      if (tab === 'home') {
        router.push('/hairdresser/dashboard');
      } else {
        router.push(`/hairdresser/${tab}` as any);
      }
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={commonStyles.wrapper}>
        <View style={styles.container}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="welcome" />
            <Stack.Screen name="main" />
            <Stack.Screen name="customer/home" />
            <Stack.Screen name="customer/search" />
            <Stack.Screen name="customer/bookings" />
            <Stack.Screen name="customer/favorites" />
            <Stack.Screen name="customer/profile" />
            <Stack.Screen name="hairdresser/dashboard" />
            <Stack.Screen name="hairdresser/bookings" />
            <Stack.Screen name="hairdresser/clients" />
            <Stack.Screen name="hairdresser/earnings" />
            <Stack.Screen name="hairdresser/profile" />
          </Stack>
          
          {isMainScreen && userType && (
            <BottomNavigation
              activeTab={activeTab}
              onTabPress={handleTabPress}
              userType={userType}
            />
          )}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
