
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { colors, commonStyles } from '../../styles/commonStyles';
import { mockBookings, mockHairdressers } from '../../data/mockData';
import AppLogo from '../../components/AppLogo';
import Icon from '../../components/Icon';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function CustomerBookingsScreen() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  const getHairdresserById = (id: string) => {
    return mockHairdressers.find(h => h.id === id);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return colors.success;
      case 'pending': return colors.warning;
      case 'cancelled': return colors.error;
      case 'completed': return colors.textLight;
      default: return colors.textLight;
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  const renderBookingCard = (booking: any) => {
    const hairdresser = getHairdresserById(booking.hairdresserId);
    if (!hairdresser) return null;

    return (
      <View key={booking.id} style={[commonStyles.card, styles.bookingCard]}>
        <View style={styles.bookingHeader}>
          <Text style={styles.hairdresserName}>{hairdresser.name}</Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(booking.status) }]}>
            <Text style={styles.statusText}>{booking.status.toUpperCase()}</Text>
          </View>
        </View>
        
        <Text style={styles.businessName}>{hairdresser.businessName}</Text>
        <Text style={styles.bookingDate}>{formatDate(new Date(booking.date))}</Text>
        
        <View style={styles.serviceInfo}>
          <Text style={styles.serviceName}>
            {hairdresser.services.find(s => s.id === booking.serviceId)?.name}
          </Text>
          <Text style={styles.servicePrice}>${booking.totalPrice}</Text>
        </View>

        <View style={styles.bookingActions}>
          {booking.status === 'confirmed' && (
            <>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionButtonText}>Reschedule</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionButton, styles.cancelButton]}>
                <Text style={[styles.actionButtonText, { color: colors.error }]}>Cancel</Text>
              </TouchableOpacity>
            </>
          )}
          {booking.status === 'completed' && (
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>Leave Review</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  const upcomingBookings = mockBookings.filter(booking => 
    booking.status === 'confirmed' || booking.status === 'pending'
  );

  const pastBookings = mockBookings.filter(booking => 
    booking.status === 'completed' || booking.status === 'cancelled'
  );

  const currentBookings = activeTab === 'upcoming' ? upcomingBookings : pastBookings;

  return (
    <View style={commonStyles.container}>
      <View style={[commonStyles.content, styles.responsiveContent]}>
        <View style={styles.header}>
          <AppLogo size="small" />
        </View>

        <View style={styles.titleSection}>
          <Text style={[commonStyles.title, styles.responsiveTitle]}>My Bookings</Text>
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'upcoming' && styles.activeTab]}
            onPress={() => setActiveTab('upcoming')}
          >
            <Text style={[styles.tabText, activeTab === 'upcoming' && styles.activeTabText]}>
              Upcoming
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'past' && styles.activeTab]}
            onPress={() => setActiveTab('past')}
          >
            <Text style={[styles.tabText, activeTab === 'past' && styles.activeTabText]}>
              Past
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
          {currentBookings.map(renderBookingCard)}
          
          {currentBookings.length === 0 && (
            <View style={styles.emptyState}>
              <Icon 
                name={activeTab === 'upcoming' ? 'calendar-outline' : 'time-outline'} 
                size={64} 
                color={colors.textLight} 
              />
              <Text style={styles.emptyTitle}>
                No {activeTab} bookings
              </Text>
              <Text style={styles.emptySubtitle}>
                {activeTab === 'upcoming' 
                  ? 'Book your next appointment to see it here'
                  : 'Your booking history will appear here'
                }
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  responsiveContent: {
    paddingHorizontal: Math.max(16, screenWidth * 0.05),
    paddingTop: Math.max(16, screenHeight * 0.02),
  },
  header: {
    flexDirection: 'row',
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
  scrollView: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: colors.backgroundAlt,
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: colors.primary,
  },
  tabText: {
    fontSize: Math.min(16, Math.max(14, screenWidth * 0.04)),
    fontWeight: '600',
    color: colors.textLight,
  },
  activeTabText: {
    color: 'white',
  },
  bookingCard: {
    marginBottom: 16,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  hairdresserName: {
    fontSize: Math.min(18, Math.max(16, screenWidth * 0.045)),
    fontWeight: '600',
    color: colors.text,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: Math.min(10, Math.max(8, screenWidth * 0.025)),
    fontWeight: '700',
    color: 'white',
  },
  businessName: {
    fontSize: Math.min(14, Math.max(12, screenWidth * 0.035)),
    color: colors.textLight,
    marginBottom: 4,
  },
  bookingDate: {
    fontSize: Math.min(16, Math.max(14, screenWidth * 0.04)),
    color: colors.primary,
    fontWeight: '600',
    marginBottom: 12,
  },
  serviceInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  serviceName: {
    fontSize: Math.min(16, Math.max(14, screenWidth * 0.04)),
    color: colors.text,
  },
  servicePrice: {
    fontSize: Math.min(16, Math.max(14, screenWidth * 0.04)),
    fontWeight: '600',
    color: colors.success,
  },
  bookingActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primary,
    alignItems: 'center',
  },
  cancelButton: {
    borderColor: colors.error,
  },
  actionButtonText: {
    fontSize: Math.min(14, Math.max(12, screenWidth * 0.035)),
    fontWeight: '600',
    color: colors.primary,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: Math.min(20, Math.max(18, screenWidth * 0.05)),
    fontWeight: '600',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: Math.min(16, Math.max(14, screenWidth * 0.04)),
    color: colors.textLight,
    textAlign: 'center',
  },
});
