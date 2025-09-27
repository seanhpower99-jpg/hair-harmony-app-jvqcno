
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, commonStyles } from '../../styles/commonStyles';
import Icon from '../../components/Icon';

export default function HairdresserEarningsScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month');

  // Mock earnings data
  const earningsData = {
    week: {
      total: 420,
      bookings: 12,
      average: 35,
      growth: 8.5,
    },
    month: {
      total: 1850,
      bookings: 47,
      average: 39.4,
      growth: 12.3,
    },
    year: {
      total: 18500,
      bookings: 485,
      average: 38.1,
      growth: 15.7,
    },
  };

  const currentData = earningsData[selectedPeriod];

  const recentTransactions = [
    { id: '1', date: new Date('2024-01-20'), service: 'Men\'s Haircut', amount: 35, client: 'John D.' },
    { id: '2', date: new Date('2024-01-19'), service: 'Hair Coloring', amount: 120, client: 'Sarah M.' },
    { id: '3', date: new Date('2024-01-18'), service: 'Women\'s Cut & Style', amount: 65, client: 'Emma L.' },
    { id: '4', date: new Date('2024-01-17'), service: 'Beard Trim', amount: 25, client: 'Mike R.' },
    { id: '5', date: new Date('2024-01-16'), service: 'Men\'s Haircut', amount: 35, client: 'David K.' },
  ];

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const getPeriodLabel = () => {
    switch (selectedPeriod) {
      case 'week': return 'This Week';
      case 'month': return 'This Month';
      case 'year': return 'This Year';
      default: return 'This Month';
    }
  };

  return (
    <ScrollView style={commonStyles.container} showsVerticalScrollIndicator={false}>
      <View style={commonStyles.content}>
        <Text style={commonStyles.title}>Earnings</Text>

        <View style={styles.periodSelector}>
          {(['week', 'month', 'year'] as const).map((period) => (
            <TouchableOpacity
              key={period}
              style={[
                styles.periodButton,
                selectedPeriod === period && styles.activePeriodButton
              ]}
              onPress={() => setSelectedPeriod(period)}
            >
              <Text style={[
                styles.periodButtonText,
                selectedPeriod === period && styles.activePeriodButtonText
              ]}>
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={[commonStyles.card, styles.earningsCard]}>
          <Text style={styles.periodLabel}>{getPeriodLabel()}</Text>
          <Text style={styles.totalEarnings}>${currentData.total.toLocaleString()}</Text>
          <View style={styles.growthIndicator}>
            <Icon 
              name={currentData.growth > 0 ? 'trending-up-outline' : 'trending-down-outline'} 
              size={16} 
              color={currentData.growth > 0 ? colors.success : colors.error} 
            />
            <Text style={[
              styles.growthText,
              { color: currentData.growth > 0 ? colors.success : colors.error }
            ]}>
              {currentData.growth > 0 ? '+' : ''}{currentData.growth}% from last {selectedPeriod}
            </Text>
          </View>
        </View>

        <View style={styles.statsGrid}>
          <View style={[commonStyles.card, styles.statCard]}>
            <Icon name="calendar-outline" size={24} color={colors.primary} />
            <Text style={styles.statValue}>{currentData.bookings}</Text>
            <Text style={styles.statLabel}>Bookings</Text>
          </View>
          <View style={[commonStyles.card, styles.statCard]}>
            <Icon name="trending-up-outline" size={24} color={colors.success} />
            <Text style={styles.statValue}>${currentData.average}</Text>
            <Text style={styles.statLabel}>Average</Text>
          </View>
        </View>

        <View style={commonStyles.section}>
          <View style={styles.sectionHeader}>
            <Text style={commonStyles.subtitle}>Recent Transactions</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          {recentTransactions.map((transaction) => (
            <View key={transaction.id} style={[commonStyles.card, styles.transactionCard]}>
              <View style={styles.transactionInfo}>
                <Text style={styles.serviceName}>{transaction.service}</Text>
                <Text style={styles.clientName}>{transaction.client}</Text>
                <Text style={styles.transactionDate}>{formatDate(transaction.date)}</Text>
              </View>
              <Text style={styles.transactionAmount}>+${transaction.amount}</Text>
            </View>
          ))}
        </View>

        <View style={[commonStyles.card, styles.payoutCard]}>
          <View style={styles.payoutHeader}>
            <Icon name="card-outline" size={24} color={colors.primary} />
            <Text style={styles.payoutTitle}>Next Payout</Text>
          </View>
          <Text style={styles.payoutAmount}>$1,245.00</Text>
          <Text style={styles.payoutDate}>Expected: Jan 25, 2024</Text>
          <TouchableOpacity style={styles.payoutButton}>
            <Text style={styles.payoutButtonText}>View Payout Details</Text>
          </TouchableOpacity>
        </View>

        <View style={[commonStyles.card, styles.subscriptionCard]}>
          <View style={styles.subscriptionHeader}>
            <Icon name="star-outline" size={24} color={colors.warning} />
            <Text style={styles.subscriptionTitle}>Subscription Plan</Text>
          </View>
          <Text style={styles.subscriptionPlan}>Premium Plan</Text>
          <Text style={styles.subscriptionPrice}>$29.99/month</Text>
          <Text style={styles.subscriptionBenefit}>✓ Higher visibility in search results</Text>
          <TouchableOpacity style={styles.upgradeButton}>
            <Text style={styles.upgradeButtonText}>Upgrade to Gold</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: colors.backgroundAlt,
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activePeriodButton: {
    backgroundColor: colors.primary,
  },
  periodButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textLight,
  },
  activePeriodButtonText: {
    color: 'white',
  },
  earningsCard: {
    alignItems: 'center',
    paddingVertical: 24,
    marginBottom: 20,
  },
  periodLabel: {
    fontSize: 16,
    color: colors.textLight,
    marginBottom: 8,
  },
  totalEarnings: {
    fontSize: 36,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  growthIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  growthText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20,
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  viewAllText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
  transactionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 8,
    paddingVertical: 16,
  },
  transactionInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 4,
  },
  clientName: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 2,
  },
  transactionDate: {
    fontSize: 12,
    color: colors.textLight,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.success,
  },
  payoutCard: {
    alignItems: 'center',
    paddingVertical: 24,
    marginBottom: 20,
  },
  payoutHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  payoutTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 8,
  },
  payoutAmount: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 8,
  },
  payoutDate: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 16,
  },
  payoutButton: {
    backgroundColor: colors.secondary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  payoutButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.primary,
  },
  subscriptionCard: {
    alignItems: 'center',
    paddingVertical: 24,
    marginBottom: 32,
    backgroundColor: colors.secondary,
  },
  subscriptionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  subscriptionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 8,
  },
  subscriptionPlan: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  subscriptionPrice: {
    fontSize: 16,
    color: colors.textLight,
    marginBottom: 12,
  },
  subscriptionBenefit: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 16,
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
