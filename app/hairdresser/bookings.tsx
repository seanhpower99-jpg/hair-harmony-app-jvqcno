
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, commonStyles } from '../../styles/commonStyles';
import { mockBookings, mockHairdressers } from '../../data/mockData';
import AppLogo from '../../components/AppLogo';
import Icon from '../../components/Icon';

export default function HairdresserBookingsScreen() {
  const [activeTab, setActiveTab] = useState<'today' | 'upcoming' | 'past'>('today');

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
    const hairdresser = mockHairdressers[0]; // Current hairdresser
    const service = hairdresser.services.find(s => s.id === booking.serviceId);

    return (
      <View key={booking.id} style={[commonStyles.card, styles.bookingCard]}>
        <View style={styles.bookingHeader}>
          <View style={styles.timeSlot}>
            <Text style={styles.timeText}>
              {new Date(booking.date).toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
              })}
            </Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(booking.status) }]}>
            <Text style={styles.statusText}>{booking.status.toUpperCase()}</Text>
          </View>
        </View>
        
        <Text style={styles.clientName}>Client Booking</Text>
        <Text style={styles.serviceName}>{service?.name}</Text>
        <Text style={styles.servicePrice}>${booking.totalPrice}</Text>

        <View style={styles.bookingActions}>
          {booking.status === 'pending' && (
            <>
              <TouchableOpacity style={[styles.actionButton, styles.confirmButton]}>
                <Text style={[styles.actionButtonText, { color: 'white' }]}>Confirm</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionButton, styles.declineButton]}>
                <Text style={[styles.actionButtonText, { color: colors.error }]}>Decline</Text>
              </TouchableOpacity>
            </>
          )}
          {booking.status === 'confirmed' && (
            <>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionButtonText}>Reschedule</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionButton, styles.completeButton]}>
                <Text style={[styles.actionButtonText, { color: 'white' }]}>Complete</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    );
  };

  const getCurrentBookings = () => {
    const today = new Date();
    const todayStr = today.toDateString();

    switch (activeTab) {
      case 'today':
        return mockBookings.filter(booking => 
          new Date(booking.date).toDateString() === todayStr
        );
      case 'upcoming':
        return mockBookings.filter(booking => 
          new Date(booking.date) > today && 
          (booking.status === 'confirmed' || booking.status === 'pending')
        );
      case 'past':
        return mockBookings.filter(booking => 
          new Date(booking.date) < today || 
          booking.status === 'completed' || 
          booking.status === 'cancelled'
        );
      default:
        return [];
    }
  };

  const getEmptyMessage = () => {
    switch (activeTab) {
      case 'today':
        return {
          title: 'No bookings today',
          subtitle: 'Enjoy your free day!'
        };
      case 'upcoming':
        return {
          title: 'No upcoming bookings',
          subtitle: 'New bookings will appear here'
        };
      case 'past':
        return {
          title: 'No past bookings',
          subtitle: 'Your booking history will appear here'
        };
      default:
        return { title: '', subtitle: '' };
    }
  };

  const currentBookings = getCurrentBookings();
  const emptyMessage = getEmptyMessage();

  return (
    <View style={commonStyles.container}>
      <View style={commonStyles.content}>
        <View style={styles.header}>
          <AppLogo size="small" />
          <Text style={[commonStyles.title, styles.headerTitle]}>Bookings</Text>
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'today' && styles.activeTab]}
            onPress={() => setActiveTab('today')}
          >
            <Text style={[styles.tabText, activeTab === 'today' && styles.activeTabText]}>
              Today
            </Text>
          </TouchableOpacity>
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
              <Icon name="calendar-outline" size={64} color={colors.textLight} />
              <Text style={styles.emptyTitle}>{emptyMessage.title}</Text>
              <Text style={styles.emptySubtitle}>{emptyMessage.subtitle}</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    marginLeft: 16,
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
    fontSize: 14,
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
    marginBottom: 12,
  },
  timeSlot: {
    backgroundColor: colors.secondary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  timeText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
    color: 'white',
  },
  clientName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  serviceName: {
    fontSize: 16,
    color: colors.textLight,
    marginBottom: 4,
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.success,
    marginBottom: 16,
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
  confirmButton: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
  completeButton: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  declineButton: {
    borderColor: colors.error,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: 'center',
  },
});
