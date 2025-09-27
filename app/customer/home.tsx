
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, commonStyles } from '../../styles/commonStyles';
import { mockHairdressers } from '../../data/mockData';
import HairdresserCard from '../../components/HairdresserCard';
import MapPlaceholder from '../../components/MapPlaceholder';
import SearchBar from '../../components/SearchBar';
import Icon from '../../components/Icon';

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
      <View style={commonStyles.content}>
        <View style={styles.header}>
          <Text style={commonStyles.title}>Find Your Perfect Cut</Text>
          <TouchableOpacity style={styles.notificationButton}>
            <Icon name="notifications-outline" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          onFilterPress={() => console.log('Open filters')}
        />

        <MapPlaceholder height={180} />

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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  notificationButton: {
    padding: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  seeAllText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
});
