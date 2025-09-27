
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { colors, commonStyles, buttonStyles } from '../../styles/commonStyles';
import { mockHairdressers } from '../../data/mockData';
import { useUserType } from '../../hooks/useUserType';
import { router } from 'expo-router';
import Icon from '../../components/Icon';
import SimpleBottomSheet from '../../components/BottomSheet';

export default function HairdresserProfileScreen() {
  const { switchUserType } = useUserType();
  const [showSettings, setShowSettings] = useState(false);
  const hairdresser = mockHairdressers[0]; // Current hairdresser

  const handleSwitchToCustomer = () => {
    console.log('Switching to customer mode');
    switchUserType('customer');
  };

  const handleSignOut = () => {
    console.log('Signing out');
    router.replace('/welcome');
  };

  const profileStats = [
    { label: 'Rating', value: hairdresser.rating.toString(), icon: 'star' },
    { label: 'Reviews', value: hairdresser.reviewCount.toString(), icon: 'chatbubble' },
    { label: 'Services', value: hairdresser.services.length.toString(), icon: 'cut' },
  ];

  const menuItems = [
    { icon: 'person-outline', label: 'Edit Profile', onPress: () => console.log('Edit profile') },
    { icon: 'cut-outline', label: 'Manage Services', onPress: () => console.log('Manage services') },
    { icon: 'time-outline', label: 'Set Availability', onPress: () => console.log('Set availability') },
    { icon: 'images-outline', label: 'Portfolio', onPress: () => console.log('Portfolio') },
    { icon: 'card-outline', label: 'Payment Settings', onPress: () => console.log('Payment settings') },
    { icon: 'notifications-outline', label: 'Notifications', onPress: () => console.log('Notifications') },
    { icon: 'help-circle-outline', label: 'Help & Support', onPress: () => console.log('Help') },
  ];

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'gold': return colors.warning;
      case 'premium': return colors.primary;
      case 'basic': return colors.textLight;
      default: return colors.textLight;
    }
  };

  return (
    <View style={commonStyles.container}>
      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.settingsButton}
            onPress={() => setShowSettings(true)}
          >
            <Icon name="settings-outline" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.profileSection}>
          <Image source={{ uri: hairdresser.avatar }} style={styles.avatar} />
          <Text style={styles.name}>{hairdresser.name}</Text>
          <Text style={styles.businessName}>{hairdresser.businessName}</Text>
          
          <View style={[styles.planBadge, { backgroundColor: getPlanColor(hairdresser.subscriptionPlan) }]}>
            <Text style={styles.planText}>{hairdresser.subscriptionPlan.toUpperCase()} PLAN</Text>
          </View>

          <Text style={styles.bio}>{hairdresser.bio}</Text>
        </View>

        <View style={styles.statsSection}>
          {profileStats.map((stat, index) => (
            <View key={index} style={styles.statItem}>
              <Icon name={stat.icon as any} size={24} color={colors.primary} />
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.locationSection}>
          <View style={styles.locationHeader}>
            <Icon name="location-outline" size={20} color={colors.primary} />
            <Text style={styles.locationTitle}>Business Location</Text>
          </View>
          <Text style={styles.locationText}>
            {hairdresser.location.address}, {hairdresser.location.city}, {hairdresser.location.state}
          </Text>
        </View>

        <View style={styles.socialSection}>
          <Text style={styles.socialTitle}>Social Media</Text>
          <View style={styles.socialLinks}>
            {hairdresser.socialMedia.instagram && (
              <TouchableOpacity style={styles.socialButton}>
                <Icon name="logo-instagram" size={20} color={colors.primary} />
                <Text style={styles.socialText}>@{hairdresser.socialMedia.instagram.replace('@', '')}</Text>
              </TouchableOpacity>
            )}
            {hairdresser.socialMedia.facebook && (
              <TouchableOpacity style={styles.socialButton}>
                <Icon name="logo-facebook" size={20} color={colors.primary} />
                <Text style={styles.socialText}>{hairdresser.socialMedia.facebook}</Text>
              </TouchableOpacity>
            )}
            {hairdresser.socialMedia.website && (
              <TouchableOpacity style={styles.socialButton}>
                <Icon name="globe-outline" size={20} color={colors.primary} />
                <Text style={styles.socialText}>{hairdresser.socialMedia.website}</Text>
              </TouchableOpacity>
            )}
          </View>
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
          onPress={handleSwitchToCustomer}
        >
          <Text style={[styles.switchButtonText, { color: colors.primary }]}>
            Switch to Customer Mode
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
            <Text style={styles.settingsItemText}>Subscription Plans</Text>
          </TouchableOpacity>
          
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
    justifyContent: 'flex-end',
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
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  businessName: {
    fontSize: 18,
    color: colors.textLight,
    marginBottom: 12,
  },
  planBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 16,
  },
  planText: {
    fontSize: 12,
    fontWeight: '700',
    color: 'white',
  },
  bio: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  statsSection: {
    flexDirection: 'row',
    backgroundColor: colors.backgroundAlt,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    boxShadow: `0px 2px 8px ${colors.shadow}`,
    elevation: 3,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textLight,
  },
  locationSection: {
    backgroundColor: colors.backgroundAlt,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    boxShadow: `0px 2px 8px ${colors.shadow}`,
    elevation: 3,
  },
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 8,
  },
  locationText: {
    fontSize: 14,
    color: colors.textLight,
    lineHeight: 20,
  },
  socialSection: {
    backgroundColor: colors.backgroundAlt,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    boxShadow: `0px 2px 8px ${colors.shadow}`,
    elevation: 3,
  },
  socialTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  socialLinks: {
    gap: 12,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  socialText: {
    fontSize: 14,
    color: colors.textLight,
    marginLeft: 12,
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
