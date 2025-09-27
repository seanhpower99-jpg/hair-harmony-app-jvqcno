
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { colors, commonStyles } from '../../styles/commonStyles';
import { mockHairdressers } from '../../data/mockData';
import HairdresserCard from '../../components/HairdresserCard';
import AppLogo from '../../components/AppLogo';
import Icon from '../../components/Icon';

export default function CustomerFavoritesScreen() {
  const [favorites] = useState(mockHairdressers.slice(0, 3)); // Mock favorites

  const handleHairdresserPress = (hairdresserId: string) => {
    console.log('Selected favorite hairdresser:', hairdresserId);
    // Navigate to hairdresser profile
  };

  return (
    <View style={commonStyles.container}>
      <View style={commonStyles.content}>
        <View style={styles.header}>
          <AppLogo size="small" />
          <Text style={[commonStyles.title, styles.headerTitle]}>Favorites</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
          {favorites.map((hairdresser) => (
            <HairdresserCard
              key={hairdresser.id}
              hairdresser={hairdresser}
              onPress={() => handleHairdresserPress(hairdresser.id)}
              showDistance={true}
            />
          ))}
          
          {favorites.length === 0 && (
            <View style={styles.emptyState}>
              <Icon name="heart-outline" size={64} color={colors.textLight} />
              <Text style={styles.emptyTitle}>No favorites yet</Text>
              <Text style={styles.emptySubtitle}>
                Tap the heart icon on hairdresser profiles to add them to your favorites
              </Text>
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
    lineHeight: 24,
    paddingHorizontal: 20,
  },
});
