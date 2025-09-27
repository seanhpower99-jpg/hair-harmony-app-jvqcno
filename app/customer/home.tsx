
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { colors, commonStyles } from '../../styles/commonStyles';
import { mockHairdressers } from '../../data/mockData';
import HairdresserCard from '../../components/HairdresserCard';
import MapPlaceholder from '../../components/MapPlaceholder';
import SearchBar from '../../components/SearchBar';
import AppLogo from '../../components/AppLogo';
import Icon from '../../components/Icon';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function CustomerHomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const popularHairdressers = mockHairdressers
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  const availableToday = mockHairdressers
    .filter(h => h.isAvailableToday)
    .slice(0, 3);

  const nearbyHairdressers = mockHairdressers
    .sort((a, b) => (a.distance || 0) - (b.distance || 0))
    .slice(0, 3);

  const handleHairdresserPress = (hairdresserId: string) => {
    console.log('Selected hairdresser:', hairdresserId);
    // Navigate to hairdresser profile
  };

  const handleSectionPress = (section: string) => {
    console.log('Navigate to section:', section);
    // Navigate to full list
  };

  return (
    <ScrollView style={commonStyles.container} showsVerticalScrollIndicator={false}>
      <View style={[commonStyles.content, styles.responsiveContent]}>
        <View style={styles.header}>
          <AppLogo size="small" />
          <TouchableOpacity style={styles.notificationButton}>
            <Icon name="notifications-outline" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.titleSection}>
          <Text style={[commonStyles.title, styles.responsiveTitle]}>Find Your Perfect Cut</Text>
        </View>

        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          onFilterPress={() => console.log('Open filters')}
        />

        <MapPlaceholder height={Math.min(180, screenHeight * 0.25)} />

        <View style={commonStyles.section}>
          <View style={styles.sectionHeader}>
            <Text style={commonStyles.subtitle}>Popular Hairdressers</Text>
            <TouchableOpacity onPress={() => handleSectionPress('popular')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          {popularHairdressers.map((hairdresser) => (
            <HairdresserCard
              key={hairdresser.id}
              hairdresser={hairdresser}
              onPress={() => handleHairdresserPress(hairdresser.id)}
            />
          ))}
        </View>

        <View style={commonStyles.section}>
          <View style={styles.sectionHeader}>
            <Text style={commonStyles.subtitle}>Available Today</Text>
            <TouchableOpacity onPress={() => handleSectionPress('available')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          {availableToday.map((hairdresser) => (
            <HairdresserCard
              key={hairdresser.id}
              hairdresser={hairdresser}
              onPress={() => handleHairdresserPress(hairdresser.id)}
            />
          ))}
        </View>

        <View style={commonStyles.section}>
          <View style={styles.sectionHeader}>
            <Text style={commonStyles.subtitle}>Nearby</Text>
            <TouchableOpacity onPress={() => handleSectionPress('nearby')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          {nearbyHairdressers.map((hairdresser) => (
            <HairdresserCard
              key={hairdresser.id}
              hairdresser={hairdresser}
              onPress={() => handleHairdresserPress(hairdresser.id)}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  responsiveContent: {
    paddingHorizontal: Math.max(16, screenWidth * 0.05),
    paddingTop: Math.max(16, screenHeight * 0.02),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Math.max(24, screenHeight * 0.03),
    paddingHorizontal: 4,
  },
  titleSection: {
    marginBottom: Math.max(20, screenHeight * 0.025),
    paddingHorizontal: 4,
  },
  responsiveTitle: {
    fontSize: Math.min(28, Math.max(22, screenWidth * 0.07)),
    lineHeight: Math.min(36, Math.max(28, screenWidth * 0.09)),
    marginBottom: 0,
  },
  notificationButton: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: colors.backgroundAlt,
    boxShadow: `0px 2px 4px ${colors.shadow}`,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: Math.max(4, screenWidth * 0.01),
  },
  seeAllText: {
    fontSize: Math.min(14, Math.max(12, screenWidth * 0.035)),
    color: colors.primary,
    fontWeight: '600',
  },
});
