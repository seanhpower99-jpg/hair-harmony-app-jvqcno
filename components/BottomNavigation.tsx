
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Platform, Dimensions } from 'react-native';
import { BlurView } from 'expo-blur';
import { colors, commonStyles } from '../styles/commonStyles';
import Icon from './Icon';

const { height: screenHeight } = Dimensions.get('window');

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

  // iOS 26 Liquid Glass Design
  if (Platform.OS === 'ios') {
    return (
      <View style={styles.iosContainer}>
        <BlurView intensity={80} tint="light" style={styles.iosBlurContainer}>
          <View style={styles.iosContent}>
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab.id}
                style={[
                  styles.iosTabItem,
                  activeTab === tab.id && styles.iosTabItemActive
                ]}
                onPress={() => onTabPress(tab.id)}
              >
                <View style={[
                  styles.iosIconContainer,
                  activeTab === tab.id && styles.iosIconContainerActive
                ]}>
                  <Icon
                    name={tab.icon as any}
                    size={22}
                    color={activeTab === tab.id ? 'white' : colors.text}
                  />
                </View>
                <Text
                  style={[
                    styles.iosTabLabel,
                    { color: activeTab === tab.id ? colors.primary : colors.text }
                  ]}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </BlurView>
      </View>
    );
  }

  // Android Design (current format)
  return (
    <View style={styles.androidContainer}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          style={styles.androidTabItem}
          onPress={() => onTabPress(tab.id)}
        >
          <Icon
            name={tab.icon as any}
            size={24}
            color={activeTab === tab.id ? colors.primary : colors.text}
          />
          <Text
            style={[
              styles.androidTabLabel,
              { color: activeTab === tab.id ? colors.primary : colors.text }
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
  // iOS Liquid Glass Design
  iosContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 34, // Safe area for home indicator
  },
  iosBlurContainer: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderTopWidth: 0.5,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
  },
  iosContent: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
    justifyContent: 'space-around',
  },
  iosTabItem: {
    alignItems: 'center',
    flex: 1,
    paddingVertical: 8,
  },
  iosTabItemActive: {
    // Active state handled by icon container
  },
  iosIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
    backgroundColor: 'transparent',
  },
  iosIconContainerActive: {
    backgroundColor: colors.primary,
    boxShadow: `0px 4px 12px rgba(32, 178, 170, 0.3)`,
    elevation: 4,
  },
  iosTabLabel: {
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
  },

  // Android Design (current format)
  androidContainer: {
    flexDirection: 'row',
    backgroundColor: colors.backgroundAlt,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: colors.grey,
    boxShadow: `0px -2px 8px ${colors.shadow}`,
    elevation: 8,
    marginTop: 16,
  },
  androidTabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  androidTabLabel: {
    fontSize: 10,
    fontWeight: '500',
    marginTop: 4,
  },
});
