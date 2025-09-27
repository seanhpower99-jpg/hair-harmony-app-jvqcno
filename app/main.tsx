
import React, { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyles } from '../styles/commonStyles';
import { useUserType } from '../hooks/useUserType';
import BottomNavigation from '../components/BottomNavigation';

// Customer screens
import CustomerHomeScreen from './customer/home';
import CustomerSearchScreen from './customer/search';
import CustomerBookingsScreen from './customer/bookings';
import CustomerFavoritesScreen from './customer/favorites';
import CustomerProfileScreen from './customer/profile';

// Hairdresser screens
import HairdresserDashboardScreen from './hairdresser/dashboard';
import HairdresserBookingsScreen from './hairdresser/bookings';
import HairdresserClientsScreen from './hairdresser/clients';
import HairdresserEarningsScreen from './hairdresser/earnings';
import HairdresserProfileScreen from './hairdresser/profile';

export default function MainScreen() {
  const { userType } = useUserType();
  const [activeTab, setActiveTab] = useState(userType === 'customer' ? 'home' : 'dashboard');

  if (!userType) {
    return null; // Loading handled by _layout
  }

  const renderCustomerScreen = () => {
    switch (activeTab) {
      case 'home': return <CustomerHomeScreen />;
      case 'search': return <CustomerSearchScreen />;
      case 'bookings': return <CustomerBookingsScreen />;
      case 'favorites': return <CustomerFavoritesScreen />;
      case 'profile': return <CustomerProfileScreen />;
      default: return <CustomerHomeScreen />;
    }
  };

  const renderHairdresserScreen = () => {
    switch (activeTab) {
      case 'dashboard': return <HairdresserDashboardScreen />;
      case 'bookings': return <HairdresserBookingsScreen />;
      case 'clients': return <HairdresserClientsScreen />;
      case 'earnings': return <HairdresserEarningsScreen />;
      case 'profile': return <HairdresserProfileScreen />;
      default: return <HairdresserDashboardScreen />;
    }
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={{ flex: 1 }}>
        {userType === 'customer' ? renderCustomerScreen() : renderHairdresserScreen()}
      </View>
      <BottomNavigation
        activeTab={activeTab}
        onTabPress={setActiveTab}
        userType={userType}
      />
    </SafeAreaView>
  );
}
