
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { colors, commonStyles } from '../../styles/commonStyles';
import { 
  mockHairdressers, 
  getNextUpcomingBooking, 
  getHairdresserById, 
  getServiceById,
  getRegularHairdressers 
} from '../../data/mockData';
import HairdresserCard from '../../components/HairdresserCard';
import MapPlaceholder from '../../components/MapPlaceholder';
import SearchBar from '../../components/SearchBar';
import AppLogo from '../../components/AppLogo';
import UpcomingBookingCard from '../../components/UpcomingBookingCard';
import Icon from '../../components/Icon';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function CustomerHomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const upcomingBooking = getNextUpcomingBooking();
  const upcomingHairdresser = upcomingBooking ? getHairdresserById(upcomingBooking.hairdresserId) : null;
  const upcomingService = upcomingBooking ? getServiceById(upcomingBooking.serviceId) : null;

  const popularHairdressers = mockHairdressers
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  const availableToday = mockHairdressers
    .filter(h => h.isAvailableToday)
    .slice(0, 3);

  const nearbyHairdressers = mockHairdressers
    .sort((a, b) => (a.distance || 0) - (b.distance || 0))
    .slice(0, 3);

  const regularHairdressers = getRegularHairdressers().slice(0, 3);

  const handleHairdresserPress = (hairdresserId: string) => {
    console.log('Selected hairdresser:', hairdresserId);
    // Navigate to hairdresser profile
  };

  const handleSectionPress = (section: string) => {
    console.log('Navigate to section:', section);
    // Navigate to full list
  };

  const handleBookingChange = () => {
    console.log('Change booking');
    // Navigate to booking change screen
  };

  const handleBookingCancel = () => {
    console.log('Cancel booking');
    // Show cancel confirmation
  };

  const handleMessageHairdresser = () => {
    console.log('Message hairdresser');
    // Navigate to chat screen
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
          <Text style={[commonStyles.title, styles.responsiveTitle]}>
            {upcomingBooking ? 'Your Next Appointment' : 'Find Your Perfect Cut'}
          </Text>
        </View>

        {/* Dynamic Content Based on Upcoming Booking */}
        {upcomingBooking && upcomingHairdresser && upcomingService ? (
          <UpcomingBookingCard
            booking={upcomingBooking}
            hairdresser={upcomingHairdresser}
            service={upcomingService}
            onChangePress={handleBookingChange}
            onCancelPress={handleBookingCancel}
            onMessagePress={handleMessageHairdresser}
          />
        ) : (
          <>
            <SearchBar
              value={searchQuery}
              onChangeText={setSearchQuery}
              onFilterPress={() => console.log('Open filters')}
            />
            <MapPlaceholder height={Math.min(180, screenHeight * 0.25)} />
          </>
        )}

        {/* Regular Hairdressers Section (when no upcoming booking) */}
        {!upcomingBooking && regularHairdressers.length > 0 && (
          <View style={commonStyles.section}>
            <View style={styles.sectionHeader}>
              <Text style={commonStyles.subtitle}>Your Regular Hairdressers</Text>
              <TouchableOpacity onPress={() => handleSectionPress('regular')}>
                <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.availabilityGrid}>
              {regularHairdressers.map((hairdresser) => (
                <View key={hairdresser.id} style={styles.availabilityCard}>
                  <HairdresserCard
                    hairdresser={hairdresser}
                    onPress={() => handleHairdresserPress(hairdresser.id)}
                  />
                  <View style={styles.availabilityInfo}>
                    <Text style={styles.availabilityText}>
                      {hairdresser.isAvailableToday ? (
                        <Text style={styles.availableText}>Available Today</Text>
                      ) : (
                        <Text style={styles.unavailableText}>Booked Today</Text>
                      )}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Popular Hairdressers */}
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

        {/* Available Today */}
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

        {/* Nearby */}
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
  availabilityGrid: {
    gap: 12,
  },
  availabilityCard: {
    position: 'relative',
  },
  availabilityInfo: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: colors.backgroundAlt,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    boxShadow: `0px 2px 4px ${colors.shadow}`,
    elevation: 2,
  },
  availabilityText: {
    fontSize: Math.min(12, Math.max(10, screenWidth * 0.03)),
    fontWeight: '600',
  },
  availableText: {
    color: colors.success,
  },
  unavailableText: {
    color: colors.error,
  },
});
