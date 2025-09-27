
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { colors, commonStyles } from '../../styles/commonStyles';
import { mockHairdressers } from '../../data/mockData';
import HairdresserCard from '../../components/HairdresserCard';
import SearchBar from '../../components/SearchBar';
import SimpleBottomSheet from '../../components/BottomSheet';
import AppLogo from '../../components/AppLogo';
import Icon from '../../components/Icon';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function CustomerSearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    rating: 0,
    availableToday: false,
    services: [] as string[],
  });

  const filteredHairdressers = mockHairdressers.filter(hairdresser => {
    const matchesSearch = hairdresser.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         hairdresser.businessName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRating = filters.rating === 0 || hairdresser.rating >= filters.rating;
    const matchesAvailability = !filters.availableToday || hairdresser.isAvailableToday;
    
    return matchesSearch && matchesRating && matchesAvailability;
  });

  const handleHairdresserPress = (hairdresserId: string) => {
    console.log('Selected hairdresser:', hairdresserId);
    // Navigate to hairdresser profile
  };

  const clearFilters = () => {
    setFilters({
      rating: 0,
      availableToday: false,
      services: [],
    });
  };

  return (
    <View style={commonStyles.container}>
      <View style={[commonStyles.content, styles.responsiveContent]}>
        <View style={styles.header}>
          <AppLogo size="small" />
        </View>

        <View style={styles.titleSection}>
          <Text style={[commonStyles.title, styles.responsiveTitle]}>Search</Text>
        </View>

        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          onFilterPress={() => setShowFilters(true)}
        />

        <View style={styles.resultsHeader}>
          <Text style={styles.resultsCount}>
            {filteredHairdressers.length} hairdressers found
          </Text>
          {(filters.rating > 0 || filters.availableToday || filters.services.length > 0) && (
            <TouchableOpacity onPress={clearFilters}>
              <Text style={styles.clearFilters}>Clear Filters</Text>
            </TouchableOpacity>
          )}
        </View>

        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
          {filteredHairdressers.map((hairdresser) => (
            <HairdresserCard
              key={hairdresser.id}
              hairdresser={hairdresser}
              onPress={() => handleHairdresserPress(hairdresser.id)}
              showDistance={true}
            />
          ))}
          
          {filteredHairdressers.length === 0 && (
            <View style={styles.emptyState}>
              <Icon name="search-outline" size={64} color={colors.textLight} />
              <Text style={styles.emptyTitle}>No hairdressers found</Text>
              <Text style={styles.emptySubtitle}>
                Try adjusting your search or filters
              </Text>
            </View>
          )}
        </ScrollView>
      </View>

      <SimpleBottomSheet
        isVisible={showFilters}
        onClose={() => setShowFilters(false)}
      >
        <View style={styles.filtersContent}>
          <Text style={styles.filtersTitle}>Filters</Text>
          
          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Minimum Rating</Text>
            <View style={styles.ratingButtons}>
              {[0, 3, 4, 4.5].map((rating) => (
                <TouchableOpacity
                  key={rating}
                  style={[
                    styles.ratingButton,
                    filters.rating === rating && styles.ratingButtonActive
                  ]}
                  onPress={() => setFilters(prev => ({ ...prev, rating }))}
                >
                  <Text style={[
                    styles.ratingButtonText,
                    filters.rating === rating && styles.ratingButtonTextActive
                  ]}>
                    {rating === 0 ? 'Any' : `${rating}+`}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.filterSection}>
            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() => setFilters(prev => ({ ...prev, availableToday: !prev.availableToday }))}
            >
              <View style={[styles.checkbox, filters.availableToday && styles.checkboxActive]}>
                {filters.availableToday && (
                  <Icon name="checkmark" size={16} color="white" />
                )}
              </View>
              <Text style={styles.checkboxLabel}>Available Today</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.applyButton}
            onPress={() => setShowFilters(false)}
          >
            <Text style={styles.applyButtonText}>Apply Filters</Text>
          </TouchableOpacity>
        </View>
      </SimpleBottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  responsiveContent: {
    paddingHorizontal: Math.max(16, screenWidth * 0.05),
    paddingTop: Math.max(16, screenHeight * 0.02),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Math.max(24, screenHeight * 0.03),
    paddingHorizontal: 4,
  },
  titleSection: {
    marginBottom: Math.max(20, screenHeight * 0.025),
    paddingHorizontal: 4,
  },
  responsiveTitle: {
    fontSize: Math.min(28, Math.max(22, screenWidth * 0.07)),
    lineHeight: Math.min(36, Math.max(28, screenWidth * 0.09)),
    marginBottom: 0,
  },
  scrollView: {
    flex: 1,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  resultsCount: {
    fontSize: Math.min(16, Math.max(14, screenWidth * 0.04)),
    color: colors.textLight,
  },
  clearFilters: {
    fontSize: Math.min(14, Math.max(12, screenWidth * 0.035)),
    color: colors.primary,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: Math.min(20, Math.max(18, screenWidth * 0.05)),
    fontWeight: '600',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: Math.min(16, Math.max(14, screenWidth * 0.04)),
    color: colors.textLight,
    textAlign: 'center',
  },
  filtersContent: {
    padding: Math.max(16, screenWidth * 0.05),
  },
  filtersTitle: {
    fontSize: Math.min(24, Math.max(20, screenWidth * 0.06)),
    fontWeight: '700',
    color: colors.text,
    marginBottom: 24,
    textAlign: 'center',
  },
  filterSection: {
    marginBottom: 24,
  },
  filterLabel: {
    fontSize: Math.min(16, Math.max(14, screenWidth * 0.04)),
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  ratingButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  ratingButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: colors.background,
    alignItems: 'center',
  },
  ratingButtonActive: {
    backgroundColor: colors.primary,
  },
  ratingButtonText: {
    fontSize: Math.min(14, Math.max(12, screenWidth * 0.035)),
    fontWeight: '600',
    color: colors.text,
  },
  ratingButtonTextActive: {
    color: 'white',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.grey,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkboxLabel: {
    fontSize: Math.min(16, Math.max(14, screenWidth * 0.04)),
    color: colors.text,
  },
  applyButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  applyButtonText: {
    fontSize: Math.min(16, Math.max(14, screenWidth * 0.04)),
    fontWeight: '600',
    color: 'white',
  },
});
