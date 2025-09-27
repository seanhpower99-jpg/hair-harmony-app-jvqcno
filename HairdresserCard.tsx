
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Hairdresser } from '../types';
import { colors, commonStyles } from '../styles/commonStyles';
import Icon from './Icon';

interface HairdresserCardProps {
  hairdresser: Hairdresser;
  onPress: () => void;
  showDistance?: boolean;
}

export default function HairdresserCard({ hairdresser, onPress, showDistance = true }: HairdresserCardProps) {
  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'gold': return colors.warning;
      case 'premium': return colors.primary;
      case 'basic': return colors.textLight;
      default: return colors.textLight;
    }
  };

  const getPlanIcon = (plan: string) => {
    switch (plan) {
      case 'gold': return 'star';
      case 'premium': return 'diamond-outline';
      case 'basic': return 'checkmark-circle-outline';
      default: return 'checkmark-circle-outline';
    }
  };

  return (
    <TouchableOpacity style={[commonStyles.card, styles.container]} onPress={onPress}>
      <View style={styles.header}>
        <Image source={{ uri: hairdresser.avatar }} style={styles.avatar} />
        <View style={styles.info}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{hairdresser.name}</Text>
            <Icon 
              name={getPlanIcon(hairdresser.subscriptionPlan)} 
              size={16} 
              color={getPlanColor(hairdresser.subscriptionPlan)} 
            />
          </View>
          <Text style={styles.businessName}>{hairdresser.businessName}</Text>
          <View style={styles.ratingRow}>
            <Icon name="star" size={14} color={colors.warning} />
            <Text style={styles.rating}>{hairdresser.rating}</Text>
            <Text style={styles.reviews}>({hairdresser.reviewCount} reviews)</Text>
            {showDistance && hairdresser.distance && (
              <>
                <Text style={styles.separator}>•</Text>
                <Text style={styles.distance}>{hairdresser.distance} mi</Text>
              </>
            )}
          </View>
        </View>
        {hairdresser.isAvailableToday && (
          <View style={styles.availableBadge}>
            <Text style={styles.availableText}>Available</Text>
          </View>
        )}
      </View>
      
      <Text style={styles.bio} numberOfLines={2}>{hairdresser.bio}</Text>
      
      <View style={styles.services}>
        {hairdresser.services.slice(0, 3).map((service, index) => (
          <View key={service.id} style={styles.serviceTag}>
            <Text style={styles.serviceText}>{service.name}</Text>
          </View>
        ))}
        {hairdresser.services.length > 3 && (
          <Text style={styles.moreServices}>+{hairdresser.services.length - 3} more</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginRight: 8,
  },
  businessName: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
    marginLeft: 4,
    marginRight: 4,
  },
  reviews: {
    fontSize: 12,
    color: colors.textLight,
  },
  separator: {
    fontSize: 12,
    color: colors.textLight,
    marginHorizontal: 6,
  },
  distance: {
    fontSize: 12,
    color: colors.textLight,
  },
  availableBadge: {
    backgroundColor: colors.success,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  availableText: {
    fontSize: 10,
    fontWeight: '600',
    color: 'white',
  },
  bio: {
    fontSize: 14,
    color: colors.textLight,
    lineHeight: 20,
    marginBottom: 12,
  },
  services: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  serviceTag: {
    backgroundColor: colors.secondary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 4,
  },
  serviceText: {
    fontSize: 12,
    color: colors.accent,
    fontWeight: '500',
  },
  moreServices: {
    fontSize: 12,
    color: colors.textLight,
    fontStyle: 'italic',
  },
});
