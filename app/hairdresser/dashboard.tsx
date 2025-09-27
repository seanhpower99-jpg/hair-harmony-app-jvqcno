
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, commonStyles } from '../../styles/commonStyles';
import { mockBookings, mockHairdressers } from '../../data/mockData';
import AppLogo from '../../components/AppLogo';
import Icon from '../../components/Icon';

export default function HairdresserDashboardScreen() {
  const hairdresser = mockHairdressers[0]; // Assuming current user is first hairdresser
  const todayBookings = mockBookings.filter(booking => {
    const today = new Date();
    const bookingDate = new Date(booking.date);
    return bookingDate.toDateString() === today.toDateString();
  });

  const stats = [
    { label: 'Today\'s Bookings', value: todayBookings.length.toString(), icon: 'calendar-outline', color: colors.primary },
    { label: 'This Week', value: '12', icon: 'trending-up-outline', color: colors.success },
    { label: 'Rating', value: hairdresser.rating.toString(), icon: 'star-outline', color: colors.warning },
    { label: 'Reviews', value: hairdresser.reviewCount.toString(), icon: 'chatbubble-outline', color: colors.accent },
  ];

  const quickActions = [
    { label: 'View Schedule', icon: 'calendar-outline', onPress: () => console.log('View schedule') },
    { label: 'Update Availability', icon: 'time-outline', onPress: () => console.log('Update availability') },
    { label: 'Manage Services', icon: 'cut-outline', onPress: () => console.log('Manage services') },
    { label: 'View Analytics', icon: 'analytics-outline', onPress: () => console.log('View analytics') },
  ];

  const getPlanBadge = () => {
    const plan = hairdresser.subscriptionPlan;
    const planColors = {
      basic: colors.textLight,
      premium: colors.primary,
      gold: colors.warning,
    };
    
    return (
      <View style={[styles.planBadge, { backgroundColor: planColors[plan] }]}>
        <Text style={styles.planText}>{plan.toUpperCase()}</Text>
      </View>
    );
  };

  return (
    <ScrollView style={commonStyles.container} showsVerticalScrollIndicator={false}>
      <View style={commonStyles.content}>
        <View style={styles.header}>
          <AppLogo size="small" />
          <View style={styles.headerContent}>
            <View style={styles.welcomeSection}>
              <Text style={commonStyles.title}>Dashboard</Text>
              <Text style={styles.welcomeText}>Welcome back, {hairdresser.name}!</Text>
            </View>
            {getPlanBadge()}
          </View>
        </View>

        <View style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <TouchableOpacity key={index} style={[commonStyles.card, styles.statCard]}>
              <Icon name={stat.icon as any} size={24} color={stat.color} />
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={commonStyles.section}>
          <Text style={commonStyles.subtitle}>Today's Schedule</Text>
          {todayBookings.length > 0 ? (
            todayBookings.map((booking) => (
              <View key={booking.id} style={[commonStyles.card, styles.bookingCard]}>
                <View style={styles.bookingTime}>
                  <Text style={styles.timeText}>
                    {new Date(booking.date).toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: '2-digit',
                    })}
                  </Text>
                </View>
                <View style={styles.bookingDetails}>
                  <Text style={styles.clientName}>Client Booking</Text>
                  <Text style={styles.serviceName}>
                    {hairdresser.services.find(s => s.id === booking.serviceId)?.name}
                  </Text>
                  <Text style={styles.bookingPrice}>${booking.totalPrice}</Text>
                </View>
                <TouchableOpacity style={styles.bookingAction}>
                  <Icon name="chevron-forward-outline" size={20} color={colors.textLight} />
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <View style={styles.emptySchedule}>
              <Icon name="calendar-outline" size={48} color={colors.textLight} />
              <Text style={styles.emptyTitle}>No bookings today</Text>
              <Text style={styles.emptySubtitle}>Enjoy your free day!</Text>
            </View>
          )}
        </View>

        <View style={commonStyles.section}>
          <Text style={commonStyles.subtitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={[commonStyles.card, styles.actionCard]}
                onPress={action.onPress}
              >
                <Icon name={action.icon as any} size={32} color={colors.primary} />
                <Text style={styles.actionLabel}>{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={[commonStyles.card, styles.upgradeCard]}>
          <View style={styles.upgradeContent}>
            <Icon name="star-outline" size={32} color={colors.warning} />
            <Text style={styles.upgradeTitle}>Boost Your Visibility</Text>
            <Text style={styles.upgradeSubtitle}>
              Upgrade to Premium or Gold to appear higher in search results
            </Text>
            <TouchableOpacity style={styles.upgradeButton}>
              <Text style={styles.upgradeButtonText}>View Plans</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  headerContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginLeft: 16,
  },
  welcomeSection: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 16,
    color: colors.textLight,
    marginTop: 4,
  },
  planBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  planText: {
    fontSize: 12,
    fontWeight: '700',
    color: 'white',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    width: '48%',
    alignItems: 'center',
    paddingVertical: 20,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textLight,
    textAlign: 'center',
  },
  bookingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    marginBottom: 8,
  },
  bookingTime: {
    width: 80,
    alignItems: 'center',
  },
  timeText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  bookingDetails: {
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
  bookingPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.success,
  },
  bookingAction: {
    padding: 8,
  },
  emptySchedule: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: colors.textLight,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionCard: {
    width: '48%',
    alignItems: 'center',
    paddingVertical: 20,
  },
  actionLabel: {
    fontSize: 14,
    color: colors.text,
    marginTop: 8,
    textAlign: 'center',
  },
  upgradeCard: {
    backgroundColor: colors.secondary,
    marginBottom: 32,
  },
  upgradeContent: {
    alignItems: 'center',
  },
  upgradeTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginTop: 12,
    marginBottom: 8,
  },
  upgradeSubtitle: {
    fontSize: 14,
    color: colors.textLight,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 20,
  },
  upgradeButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
  },
  upgradeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },
});
