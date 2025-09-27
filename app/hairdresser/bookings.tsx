
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, commonStyles } from '../../styles/commonStyles';
import { mockBookings, mockHairdressers } from '../../data/mockData';
import Icon from '../../components/Icon';

export default function HairdresserBookingsScreen() {
  const [activeTab, setActiveTab] = useState<'today' | 'upcoming' | 'past'>('today');
  const hairdresser = mockHairdressers[0]; // Current hairdresser

  const today = new Date();
  const todayBookings = mockBookings.filter(booking => {
    const bookingDate = new Date(booking.date);
    return bookingDate.toDateString() === today.toDateString();
  });

  const upcomingBookings = mockBookings.filter(booking => {
    const bookingDate = new Date(booking.date);
    return bookingDate > today && (booking.status === 'confirmed' || booking.status === 'pending');
  });

  const pastBookings = mockBookings.filter(booking => {
    const bookingDate = new Date(booking.date);
    return bookingDate < today || booking.status === 'completed';
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return colors.success;
      case 'pending': return colors.warning;
      case 'completed': return colors.primary;
      case 'cancelled': return colors.error;
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
    const service = hairdresser.services.find(s => s.id === booking.serviceId);
    
    return (
      <TouchableOpacity key={booking.id} style={[commonStyles.card, styles.bookingCard]}>
        <View style={styles.bookingHeader}>
          <View style={styles.timeSlot}>
            <Text style={styles.timeText}>
              {new Date(booking.date).toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
              })}
            </Text>
            <Text style={styles.dateText}>
              {new Date(booking.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })}
            </Text>
          </View>
          
          <View style={styles.bookingInfo}>
            <Text style={styles.clientName}>Client Booking</Text>
            <Text style={styles.serviceName}>{service?.name || 'Service'}</Text>
            <Text style={styles.duration}>{service?.duration || 60} minutes</Text>
          </View>

          <View style={styles.bookingMeta}>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(booking.status) }]}>
              <Text style={styles.statusText}>{booking.status.toUpperCase()}</Text>
            </View>
            <Text style={styles.price}>${booking.totalPrice}</Text>
          </View>
        </View>

        {booking.notes && (
          <Text style={styles.notes}>Note: {booking.notes}</Text>
        )}

        <View style={styles.bookingActions}>
          {booking.status === 'pending' && (
            <>
              <TouchableOpacity style={[styles.actionButton, styles.confirmButton]}>
                <Text style={[styles.actionButtonText, { color: colors.success }]}>Confirm</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionButton, styles.declineButton]}>
                <Text style={[styles.actionButtonText, { color: colors.error }]}>Decline</Text>
              </TouchableOpacity>
            </>
          )}
          {booking.status === 'confirmed' && (
            <>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionButtonText}>Contact Client</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionButton, styles.completeButton]}>
                <Text style={[styles.actionButtonText, { color: colors.primary }]}>Mark Complete</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const getCurrentBookings = () => {
    switch (activeTab) {
      case 'today': return todayBookings;
      case 'upcoming': return upcomingBookings;
      case 'past': return pastBookings;
      default: return todayBookings;
    }
  };

  const getEmptyMessage = () => {
    switch (activeTab) {
      case 'today': return { title: 'No bookings today', subtitle: 'Enjoy your free day!' };
      case 'upcoming': return { title: 'No upcoming bookings', subtitle: 'New bookings will appear here' };
      case 'past': return { title: 'No past bookings', subtitle: 'Your booking history will appear here' };
      default: return { title: 'No bookings', subtitle: '' };
    }
  };

  return (
    <View style={commonStyles.container}>
      <View style={commonStyles.content}>
        <Text style={commonStyles.title}>My Bookings</Text>

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

        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
          {getCurrentBookings().length > 0 ? (
            getCurrentBookings().map(renderBookingCard)
          ) : (
            <View style={styles.emptyState}>
              <Icon name="calendar-outline" size={48} color={colors.textLight} />
              <Text style={styles.emptyTitle}>{getEmptyMessage().title}</Text>
              <Text style={styles.emptySubtitle}>{getEmptyMessage().subtitle}</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    fontWeight: '500',
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
    marginBottom: 12,
  },
  timeSlot: {
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 2,
  },
  dateText: {
    fontSize: 12,
    color: colors.textLight,
  },
  bookingInfo: {
    flex: 1,
    marginLeft: 16,
  },
  clientName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  serviceName: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 2,
  },
  duration: {
    fontSize: 12,
    color: colors.textLight,
  },
  bookingMeta: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    color: 'white',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  notes: {
    fontSize: 14,
    color: colors.textLight,
    fontStyle: 'italic',
    marginBottom: 12,
    paddingLeft: 96,
  },
  bookingActions: {
    flexDirection: 'row',
    gap: 12,
    paddingLeft: 96,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: colors.backgroundAlt,
    borderWidth: 1,
    borderColor: colors.grey,
    alignItems: 'center',
  },
  confirmButton: {
    borderColor: colors.success,
  },
  declineButton: {
    borderColor: colors.error,
  },
  completeButton: {
    borderColor: colors.primary,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
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
    lineHeight: 24,
  },
});
