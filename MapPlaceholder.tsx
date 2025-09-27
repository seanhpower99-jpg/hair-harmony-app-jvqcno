
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, commonStyles } from '../styles/commonStyles';
import Icon from './Icon';

interface MapPlaceholderProps {
  height?: number;
}

export default function MapPlaceholder({ height = 200 }: MapPlaceholderProps) {
  return (
    <View style={[styles.container, { height }]}>
      <Icon name="map-outline" size={48} color={colors.textLight} />
      <Text style={styles.title}>Map View</Text>
      <Text style={styles.subtitle}>
        Maps are not supported on web in Natively.
        {'\n'}This would show nearby hairdressers on mobile.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundAlt,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.grey,
    borderStyle: 'dashed',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginTop: 12,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textLight,
    textAlign: 'center',
    lineHeight: 20,
  },
});
