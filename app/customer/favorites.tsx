
import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { colors, commonStyles } from '../../styles/commonStyles';
import { mockHairdressers, mockCustomer } from '../../data/mockData';
import HairdresserCard from '../../components/HairdresserCard';
import Icon from '../../components/Icon';

export default function CustomerFavoritesScreen() {
  const favoriteHairdressers = mockHairdressers.filter(hairdresser =>
    mockCustomer.favoriteHairdressers.includes(hairdresser.id)
  );

  const handleHairdresserPress = (hairdresserId: string) => {
    console.log('Selected favorite hairdresser:', hairdresserId);
  };

  return (
    <View style={commonStyles.container}>
      <View style={commonStyles.content}>
        <Text style={commonStyles.title}>My Favorites</Text>
        
        {favoriteHairdressers.length > 0 ? (
          <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
            {favoriteHairdressers.map((hairdresser) => (
              <HairdresserCard
                key={hairdresser.id}
                hairdresser={hairdresser}
                onPress={() => handleHairdresserPress(hairdresser.id)}
                showDistance={false}
              />
            ))}
          </ScrollView>
        ) : (
          <View style={styles.emptyState}>
            <Icon name="heart-outline" size={64} color={colors.textLight} />
            <Text style={styles.emptyTitle}>No favorites yet</Text>
            <Text style={styles.emptySubtitle}>
              Tap the heart icon on hairdresser profiles to add them to your favorites
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.text,
    marginTop: 24,
    marginBottom: 12,
  },
  emptySubtitle: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: 'center',
    lineHeight: 24,
  },
});
