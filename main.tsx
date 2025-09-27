import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyles } from '../styles/commonStyles';
import BottomNavigation from '../components/BottomNavigation';
import { AuthContext } from '../context/AuthContext';

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
  const { user, logout, switchUserType } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState(
    user?.role === 'customer' ? 'home' : 'dashboard'
  );

  useEffect(() => {
    if (user) {
      setActiveTab(user.role === 'customer' ? 'home' : 'dashboard');
    }
  }, [user]);

  if (!user) {
    return (
      <SafeAreaView style={commonStyles.container}>
        <Text style={{ textAlign: 'center', marginTop: 20 }}>
          No user loaded
        </Text>
      </SafeAreaView>
    );
  }

  const renderCustomerScreen = () => {
    switch (activeTab) {
      case 'home':
        return <CustomerHomeScreen />;
      case 'search':
        return <CustomerSearchScreen />;
      case 'bookings':
        return <CustomerBookingsScreen />;
      case 'favorites':
        return <CustomerFavoritesScreen />;
      case 'profile':
        return <CustomerProfileScreen />;
      default:
        return <CustomerHomeScreen />;
    }
  };

  const renderHairdresserScreen = () => {
    switch (activeTab) {
      case 'dashboard':
        return <HairdresserDashboardScreen />;
      case 'bookings':
        return <HairdresserBookingsScreen />;
      case 'clients':
        return <HairdresserClientsScreen />;
      case 'earnings':
        return <HairdresserEarningsScreen />;
      case 'profile':
        return <HairdresserProfileScreen />;
      default:
        return <HairdresserDashboardScreen />;
    }
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={{ flex: 1 }}>
        {user.role === 'customer'
          ? renderCustomerScreen()
          : renderHairdresserScreen()}
      </View>
      <BottomNavigation
        activeTab={activeTab}
        onTabPress={setActiveTab}
        userType={user.role}
      />
      <View
        style={{
          padding: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <TouchableOpacity onPress={logout}>
          <Text style={{ color: 'red' }}>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            switchUserType(
              user.role === 'customer' ? 'hairdresser' : 'customer'
            )
          }
        >
          <Text style={{ color: 'blue' }}>
            Switch to {user.role === 'customer' ? 'Hairdresser' : 'Customer'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
