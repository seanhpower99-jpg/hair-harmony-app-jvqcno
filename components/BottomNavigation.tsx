
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, commonStyles } from '../styles/commonStyles';
import Icon from './Icon';

interface BottomNavigationProps {
  activeTab: string;
  onTabPress: (tab: string) => void;
  userType: 'customer' | 'hairdresser';
}

export default function BottomNavigation({ activeTab, onTabPress, userType }: BottomNavigationProps) {
  const customerTabs = [
    { id: 'home', label: 'Home', icon: 'home-outline' },
    { id: 'search', label: 'Search', icon: 'search-outline' },
    { id: 'bookings', label: 'Bookings', icon: 'calendar-outline' },
    { id: 'favorites', label: 'Favorites', icon: 'heart-outline' },
    { id: 'profile', label: 'Profile', icon: 'person-outline' },
  ];

  const hairdresserTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: 'grid-outline' },
    { id: 'bookings', label: 'Bookings', icon: 'calendar-outline' },
    { id: 'clients', label: 'Clients', icon: 'people-outline' },
    { id: 'earnings', label: 'Earnings', icon: 'card-outline' },
    { id: 'profile', label: 'Profile', icon: 'person-outline' },
  ];

  const tabs = userType === 'customer' ? customerTabs : hairdresserTabs;

  return (
    <View style={commonStyles.bottomNav}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          style={commonStyles.bottomNavItem}
          onPress={() => onTabPress(tab.id)}
        >
          <Icon
            name={tab.icon as any}
            size={24}
            color={activeTab === tab.id ? colors.primary : colors.textLight}
          />
          <Text
            style={[
              styles.tabLabel,
              { color: activeTab === tab.id ? colors.primary : colors.textLight }
            ]}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  tabLabel: {
    fontSize: 10,
    fontWeight: '500',
    marginTop: 4,
  },
});
