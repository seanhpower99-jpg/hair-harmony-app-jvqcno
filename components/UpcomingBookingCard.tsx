
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { colors, commonStyles } from '../styles/commonStyles';
import { Booking, Hairdresser, Service } from '../types';
import Icon from './Icon';

const { width: screenWidth } = Dimensions.get('window');

interface UpcomingBookingCardProps {
  booking: Booking;
  hairdresser: Hairdresser;
  service: Service;
  onChangePress: () => void;
  onCancelPress: () => void;
  onMessagePress: () => void;
}

export default function UpcomingBookingCard({
  booking,
  hairdresser,
  service,
  onChangePress,
  onCancelPress,
  onMessagePress,
}: UpcomingBookingCardProps) {
  const formatDate = (date: Date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return colors.success;
      case 'pending':
        return colors.warning;
      default:
        return colors.textLight;
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.statusBadge}>
          <View style={[styles.statusDot, { backgroundColor: getStatusColor(booking.status) }]} />
          <Text style={styles.statusText}>
            {booking.status === 'confirmed' ? 'Confirmed' : 'Pending'}
          </Text>
        </View>
        <Text style={styles.dateTime}>
          {formatDate(booking.date)} at {formatTime(booking.date)}
        </Text>
      </View>

      <View style={styles.bookingInfo}>
        <Image source={{ uri: hairdresser.avatar }} style={styles.avatar} />
        <View style={styles.details}>
          <Text style={styles.hairdresserName}>{hairdresser.name}</Text>
          <Text style={styles.businessName}>{hairdresser.businessName}</Text>
          <Text style={styles.serviceName}>{service.name}</Text>
          <Text style={styles.price}>${booking.totalPrice}</Text>
        </View>
      </View>

      {booking.notes && (
        <View style={styles.notesSection}>
          <Text style={styles.notesLabel}>Notes:</Text>
          <Text style={styles.notesText}>{booking.notes}</Text>
        </View>
      )}

      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.actionButton} onPress={onChangePress}>
          <Icon name="calendar-outline" size={18} color={colors.primary} />
          <Text style={styles.actionButtonText}>Change</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton} onPress={onMessagePress}>
          <Icon name="chatbubble-outline" size={18} color={colors.primary} />
          <Text style={styles.actionButtonText}>Message</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.actionButton, styles.cancelButton]} onPress={onCancelPress}>
          <Icon name="close-outline" size={18} color={colors.error} />
          <Text style={[styles.actionButtonText, styles.cancelButtonText]}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: Math.max(16, screenWidth * 0.04),
    marginBottom: 16,
    boxShadow: `0px 4px 12px ${colors.shadow}`,
    elevation: 4,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  statusText: {
    fontSize: Math.min(14, Math.max(12, screenWidth * 0.035)),
    fontWeight: '600',
    color: colors.text,
  },
  dateTime: {
    fontSize: Math.min(14, Math.max(12, screenWidth * 0.035)),
    color: colors.textLight,
    fontWeight: '500',
  },
  bookingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  details: {
    flex: 1,
  },
  hairdresserName: {
    fontSize: Math.min(18, Math.max(16, screenWidth * 0.045)),
    fontWeight: '700',
    color: colors.text,
    marginBottom: 2,
  },
  businessName: {
    fontSize: Math.min(14, Math.max(12, screenWidth * 0.035)),
    color: colors.textLight,
    marginBottom: 4,
  },
  serviceName: {
    fontSize: Math.min(16, Math.max(14, screenWidth * 0.04)),
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  price: {
    fontSize: Math.min(16, Math.max(14, screenWidth * 0.04)),
    fontWeight: '700',
    color: colors.primary,
  },
  notesSection: {
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  notesLabel: {
    fontSize: Math.min(14, Math.max(12, screenWidth * 0.035)),
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  notesText: {
    fontSize: Math.min(14, Math.max(12, screenWidth * 0.035)),
    color: colors.textLight,
    lineHeight: 18,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: colors.background,
    gap: 6,
  },
  cancelButton: {
    backgroundColor: colors.background,
  },
  actionButtonText: {
    fontSize: Math.min(14, Math.max(12, screenWidth * 0.035)),
    fontWeight: '600',
    color: colors.primary,
  },
  cancelButtonText: {
    color: colors.error,
  },
});
