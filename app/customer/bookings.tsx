
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, commonStyles } from '../../styles/commonStyles';
import { mockBookings, mockHairdressers } from '../../data/mockData';
import Icon from '../../components/Icon';

export default function CustomerBookingsScreen() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  const upcomingBookings = mockBookings.filter(booking => 
    booking.status === 'confirmed' || booking.status === 'pending'
  );

  const pastBookings = mockBookings.filter(booking => 
    booking.status === 'completed' || booking.status === 'cancelled'
  );

  const getHairdresserById = (id: string) => {
    return mockHairdressers.find(h => h.id === id);
  };

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
    const hairdresser = getHairdresserById(booking.hairdresserId);
    if (!hairdresser) return null;

    return (
      <TouchableOpacity key={booking.id} style={[commonStyles.card, styles.bookingCard]}>
        <View style={styles.bookingHeader}>
          <View style={styles.bookingInfo}>
            <Text style={styles.hairdresserName}>{hairdresser.name}</Text>
            <Text style={styles.businessName}>{hairdresser.businessName}</Text>
            <Text style={styles.bookingDate}>{formatDate(booking.date)}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(booking.status) }]}>
            <Text style={styles.statusText}>{booking.status.toUpperCase()}</Text>
          </View>
        </View>

        <View style={styles.serviceInfo}>
          <Text style={styles.serviceName}>
            {hairdresser.services.find(s => s.id === booking.serviceId)?.name || 'Service'}
          </Text>
          <Text style={styles.price}>${booking.totalPrice}</Text>
        </View>

        {booking.notes && (
          <Text style={styles.notes}>Note: {booking.notes}</Text>
        )}

        {booking.status === 'completed' && booking.rating && (
          <View style={styles.ratingSection}>
            <View style={styles.rating}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Icon
                  key={star}
                  name="star"
                  size={16}
                  color={star <= booking.rating! ? colors.warning : colors.grey}
                />
              ))}
            </View>
            {booking.review && (
              <Text style={styles.review}>"{booking.review}"</Text>
            )}
          </View>
        )}

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
          {booking.status === 'completed' && !booking.rating && (
            <TouchableOpacity style={[styles.actionButton, styles.rateButton]}>
              <Text style={[styles.actionButtonText, { color: colors.primary }]}>Rate & Review</Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={commonStyles.container}>
      <View style={commonStyles.content}>
        <Text style={commonStyles.title}>My Bookings</Text>

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

        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
          {activeTab === 'upcoming' ? (
            upcomingBookings.length > 0 ? (
              upcomingBookings.map(renderBookingCard)
            ) : (
              <View style={styles.emptyState}>
                <Icon name="calendar-outline" size={48} color={colors.textLight} />
                <Text style={styles.emptyTitle}>No upcoming bookings</Text>
                <Text style={styles.emptySubtitle}>
                  Book your next appointment to see it here
                </Text>
              </View>
            )
          ) : (
            pastBookings.length > 0 ? (
              pastBookings.map(renderBookingCard)
            ) : (
              <View style={styles.emptyState}>
                <Icon name="time-outline" size={48} color={colors.textLight} />
                <Text style={styles.emptyTitle}>No past bookings</Text>
                <Text style={styles.emptySubtitle}>
                  Your booking history will appear here
                </Text>
              </View>
            )
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
    fontSize: 16,
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
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  bookingInfo: {
    flex: 1,
  },
  hairdresserName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  businessName: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 4,
  },
  bookingDate: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '500',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    color: 'white',
  },
  serviceInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  serviceName: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
  },
  price: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '600',
  },
  notes: {
    fontSize: 14,
    color: colors.textLight,
    fontStyle: 'italic',
    marginBottom: 12,
  },
  ratingSection: {
    marginBottom: 12,
  },
  rating: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  review: {
    fontSize: 14,
    color: colors.textLight,
    fontStyle: 'italic',
  },
  bookingActions: {
    flexDirection: 'row',
    gap: 12,
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
  cancelButton: {
    borderColor: colors.error,
  },
  rateButton: {
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
