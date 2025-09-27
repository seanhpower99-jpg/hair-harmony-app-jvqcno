
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, commonStyles } from '../../styles/commonStyles';
import { mockHairdressers } from '../../data/mockData';
import HairdresserCard from '../../components/HairdresserCard';
import SearchBar from '../../components/SearchBar';
import SimpleBottomSheet from '../../components/BottomSheet';
import Icon from '../../components/Icon';

export default function CustomerSearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    rating: 0,
    distance: 10,
    priceRange: 'all',
    availability: 'all',
    services: [] as string[],
  });

  const filteredHairdressers = mockHairdressers.filter(hairdresser => {
    const matchesSearch = hairdresser.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         hairdresser.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         hairdresser.services.some(service => 
                           service.name.toLowerCase().includes(searchQuery.toLowerCase())
                         );
    
    const matchesRating = hairdresser.rating >= selectedFilters.rating;
    const matchesDistance = !hairdresser.distance || hairdresser.distance <= selectedFilters.distance;
    const matchesAvailability = selectedFilters.availability === 'all' || 
                               (selectedFilters.availability === 'today' && hairdresser.isAvailableToday);

    return matchesSearch && matchesRating && matchesDistance && matchesAvailability;
  });

  const handleHairdresserPress = (hairdresserId: string) => {
    console.log('Selected hairdresser:', hairdresserId);
  };

  const clearFilters = () => {
    setSelectedFilters({
      rating: 0,
      distance: 10,
      priceRange: 'all',
      availability: 'all',
      services: [],
    });
  };

  return (
    <View style={commonStyles.container}>
      <View style={commonStyles.content}>
        <View style={styles.header}>
          <Text style={commonStyles.title}>Search</Text>
        </View>

        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          onFilterPress={() => setShowFilters(true)}
        />

        <View style={styles.resultsHeader}>
          <Text style={styles.resultsText}>
            {filteredHairdressers.length} hairdressers found
          </Text>
          {(selectedFilters.rating > 0 || selectedFilters.availability !== 'all') && (
            <TouchableOpacity onPress={clearFilters}>
              <Text style={styles.clearFiltersText}>Clear filters</Text>
            </TouchableOpacity>
          )}
        </View>

        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
          {filteredHairdressers.map((hairdresser) => (
            <HairdresserCard
              key={hairdresser.id}
              hairdresser={hairdresser}
              onPress={() => handleHairdresserPress(hairdresser.id)}
            />
          ))}
          
          {filteredHairdressers.length === 0 && (
            <View style={styles.emptyState}>
              <Icon name="search-outline" size={48} color={colors.textLight} />
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
                    selectedFilters.rating === rating && styles.ratingButtonActive
                  ]}
                  onPress={() => setSelectedFilters(prev => ({ ...prev, rating }))}
                >
                  <Text style={[
                    styles.ratingButtonText,
                    selectedFilters.rating === rating && styles.ratingButtonTextActive
                  ]}>
                    {rating === 0 ? 'Any' : `${rating}+`}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Availability</Text>
            <View style={styles.availabilityButtons}>
              {[
                { key: 'all', label: 'Any time' },
                { key: 'today', label: 'Available today' }
              ].map((option) => (
                <TouchableOpacity
                  key={option.key}
                  style={[
                    styles.availabilityButton,
                    selectedFilters.availability === option.key && styles.availabilityButtonActive
                  ]}
                  onPress={() => setSelectedFilters(prev => ({ ...prev, availability: option.key }))}
                >
                  <Text style={[
                    styles.availabilityButtonText,
                    selectedFilters.availability === option.key && styles.availabilityButtonTextActive
                  ]}>
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </SimpleBottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 20,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  resultsText: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
  },
  clearFiltersText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
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
  filtersContent: {
    padding: 20,
  },
  filtersTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 24,
    textAlign: 'center',
  },
  filterSection: {
    marginBottom: 24,
  },
  filterLabel: {
    fontSize: 16,
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
    borderRadius: 12,
    backgroundColor: colors.backgroundAlt,
    borderWidth: 1,
    borderColor: colors.grey,
    alignItems: 'center',
  },
  ratingButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  ratingButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  ratingButtonTextActive: {
    color: 'white',
  },
  availabilityButtons: {
    gap: 8,
  },
  availabilityButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: colors.backgroundAlt,
    borderWidth: 1,
    borderColor: colors.grey,
    alignItems: 'center',
  },
  availabilityButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  availabilityButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  availabilityButtonTextActive: {
    color: 'white',
  },
});
