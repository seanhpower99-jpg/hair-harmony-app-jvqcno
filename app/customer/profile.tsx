
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { colors, commonStyles, buttonStyles } from '../../styles/commonStyles';
import { mockCustomer } from '../../data/mockData';
import { useUserType } from '../../hooks/useUserType';
import { router } from 'expo-router';
import AppLogo from '../../components/AppLogo';
import Icon from '../../components/Icon';
import SimpleBottomSheet from '../../components/BottomSheet';

export default function CustomerProfileScreen() {
  const { switchUserType } = useUserType();
  const [showSettings, setShowSettings] = useState(false);

  const handleSwitchToHairdresser = () => {
    console.log('Switching to hairdresser mode');
    switchUserType('hairdresser');
  };

  const handleSignOut = () => {
    console.log('Signing out');
    router.replace('/welcome');
  };

  const profileStats = [
    { label: 'Bookings', value: mockCustomer.bookingHistory.length.toString() },
    { label: 'Reviews', value: mockCustomer.reviewCount.toString() },
    { label: 'Favorites', value: mockCustomer.favoriteHairdressers.length.toString() },
  ];

  const menuItems = [
    { icon: 'person-outline', label: 'Edit Profile', onPress: () => console.log('Edit profile') },
    { icon: 'card-outline', label: 'Payment Methods', onPress: () => console.log('Payment methods') },
    { icon: 'notifications-outline', label: 'Notifications', onPress: () => console.log('Notifications') },
    { icon: 'help-circle-outline', label: 'Help & Support', onPress: () => console.log('Help') },
    { icon: 'information-circle-outline', label: 'About', onPress: () => console.log('About') },
  ];

  return (
    <View style={commonStyles.container}>
      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <AppLogo size="small" />
          <TouchableOpacity 
            style={styles.settingsButton}
            onPress={() => setShowSettings(true)}
          >
            <Icon name="settings-outline" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.profileSection}>
          <Image source={{ uri: mockCustomer.avatar }} style={styles.avatar} />
          <Text style={styles.name}>{mockCustomer.name}</Text>
          <Text style={styles.email}>{mockCustomer.email}</Text>
          
          <View style={styles.rating}>
            <Icon name="star" size={16} color={colors.warning} />
            <Text style={styles.ratingText}>{mockCustomer.rating}</Text>
            <Text style={styles.ratingCount}>({mockCustomer.reviewCount} reviews)</Text>
          </View>
        </View>

        <View style={styles.statsSection}>
          {profileStats.map((stat, index) => (
            <View key={index} style={styles.statItem}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.menuSection}>
          {menuItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem} onPress={item.onPress}>
              <View style={styles.menuItemLeft}>
                <Icon name={item.icon as any} size={24} color={colors.text} />
                <Text style={styles.menuItemText}>{item.label}</Text>
              </View>
              <Icon name="chevron-forward-outline" size={20} color={colors.textLight} />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={[buttonStyles.outline, styles.switchButton]}
          onPress={handleSwitchToHairdresser}
        >
          <Text style={[styles.switchButtonText, { color: colors.primary }]}>
            Switch to Hairdresser Mode
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <SimpleBottomSheet
        isVisible={showSettings}
        onClose={() => setShowSettings(false)}
      >
        <View style={styles.settingsContent}>
          <Text style={styles.settingsTitle}>Settings</Text>
          
          <TouchableOpacity style={styles.settingsItem}>
            <Text style={styles.settingsItemText}>Privacy Policy</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingsItem}>
            <Text style={styles.settingsItemText}>Terms of Service</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingsItem} onPress={handleSignOut}>
            <Text style={[styles.settingsItemText, { color: colors.error }]}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </SimpleBottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  settingsButton: {
    padding: 8,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: colors.textLight,
    marginBottom: 12,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 4,
    marginRight: 4,
  },
  ratingCount: {
    fontSize: 14,
    color: colors.textLight,
  },
  statsSection: {
    flexDirection: 'row',
    backgroundColor: colors.backgroundAlt,
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
    boxShadow: `0px 2px 8px ${colors.shadow}`,
    elevation: 3,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: colors.textLight,
  },
  menuSection: {
    backgroundColor: colors.backgroundAlt,
    borderRadius: 16,
    marginBottom: 32,
    boxShadow: `0px 2px 8px ${colors.shadow}`,
    elevation: 3,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.grey,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    color: colors.text,
    marginLeft: 16,
  },
  switchButton: {
    marginBottom: 32,
  },
  switchButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  settingsContent: {
    padding: 20,
  },
  settingsTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 24,
    textAlign: 'center',
  },
  settingsItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.grey,
  },
  settingsItemText: {
    fontSize: 16,
    color: colors.text,
  },
});
