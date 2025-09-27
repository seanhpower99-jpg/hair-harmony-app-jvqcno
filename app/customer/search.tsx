
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { colors, commonStyles } from '../../styles/commonStyles';
import { mockHairdressers, mockCustomer } from '../../data/mockData';
import HairdresserCard from '../../components/HairdresserCard';
import SearchBar from '../../components/SearchBar';
import SimpleBottomSheet from '../../components/BottomSheet';
import AppLogo from '../../components/AppLogo';
import Icon from '../../components/Icon';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface SearchFilters {
  rating: number;
  availableToday: boolean;
  services: string[];
  location: string;
  previousBarbers: boolean;
  distance: number;
}

export default function CustomerSearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [activePreset, setActivePreset] = useState<string | null>(null);
  const [filters, setFilters] = useState<SearchFilters>({
    rating: 0,
    availableToday: false,
    services: [],
    location: '',
    previousBarbers: false,
    distance: 10,
  });

  const presetOptions = [
    {
      id: 'available-now',
      label: 'Available Now',
      icon: 'time-outline',
      filters: { availableToday: true, rating: 4.0 }
    },
    {
      id: 'top-rated',
      label: 'Top Rated',
      icon: 'star-outline',
      filters: { rating: 4.5 }
    },
    {
      id: 'previous-barbers',
      label: 'Previous Barbers',
      icon: 'people-outline',
      filters: { previousBarbers: true }
    },
    {
      id: 'nearby',
      label: 'Nearby',
      icon: 'location-outline',
      filters: { distance: 2 }
    },
  ];

  const serviceCategories = [
    'haircut',
    'coloring',
    'styling',
    'treatment',
  ];

  const locationOptions = [
    'Manhattan',
    'Brooklyn',
    'Queens',
    'Bronx',
    'Staten Island',
  ];

  const filteredHairdressers = mockHairdressers.filter(hairdresser => {
    const matchesSearch = hairdresser.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         hairdresser.businessName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRating = filters.rating === 0 || hairdresser.rating >= filters.rating;
    const matchesAvailability = !filters.availableToday || hairdresser.isAvailableToday;
    const matchesDistance = !hairdresser.distance || hairdresser.distance <= filters.distance;
    const matchesLocation = !filters.location || 
                           hairdresser.location.city.toLowerCase().includes(filters.location.toLowerCase());
    
    const matchesPreviousBarbers = !filters.previousBarbers || 
                                  mockCustomer.previousHairdressers.includes(hairdresser.id);
    
    const matchesServices = filters.services.length === 0 || 
                           filters.services.some(service => 
                             hairdresser.services.some(s => s.category === service)
                           );
    
    return matchesSearch && matchesRating && matchesAvailability && 
           matchesDistance && matchesLocation && matchesPreviousBarbers && matchesServices;
  });

  const handleHairdresserPress = (hairdresserId: string) => {
    console.log('Selected hairdresser:', hairdresserId);
    // Navigate to hairdresser profile
  };

  const handlePresetPress = (preset: any) => {
    console.log('Applied preset:', preset.label);
    setActivePreset(preset.id);
    setFilters(prev => ({ ...prev, ...preset.filters }));
  };

  const clearFilters = () => {
    setFilters({
      rating: 0,
      availableToday: false,
      services: [],
      location: '',
      previousBarbers: false,
      distance: 10,
    });
    setActivePreset(null);
  };

  const hasActiveFilters = () => {
    return filters.rating > 0 || filters.availableToday || filters.services.length > 0 ||
           filters.location !== '' || filters.previousBarbers || filters.distance < 10;
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

        {/* Preset Options */}
        <View style={styles.presetsSection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.presetsScroll}>
            {presetOptions.map((preset) => (
              <TouchableOpacity
                key={preset.id}
                style={[
                  styles.presetButton,
                  activePreset === preset.id && styles.presetButtonActive
                ]}
                onPress={() => handlePresetPress(preset)}
              >
                <Icon 
                  name={preset.icon as any} 
                  size={18} 
                  color={activePreset === preset.id ? 'white' : colors.primary} 
                />
                <Text style={[
                  styles.presetButtonText,
                  activePreset === preset.id && styles.presetButtonTextActive
                ]}>
                  {preset.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.resultsHeader}>
          <Text style={styles.resultsCount}>
            {filteredHairdressers.length} hairdresser{filteredHairdressers.length !== 1 ? 's' : ''} found
          </Text>
          {hasActiveFilters() && (
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
          
          {/* Location Filter */}
          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Location</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.locationButtons}>
                <TouchableOpacity
                  style={[
                    styles.locationButton,
                    filters.location === '' && styles.locationButtonActive
                  ]}
                  onPress={() => setFilters(prev => ({ ...prev, location: '' }))}
                >
                  <Text style={[
                    styles.locationButtonText,
                    filters.location === '' && styles.locationButtonTextActive
                  ]}>
                    All Areas
                  </Text>
                </TouchableOpacity>
                {locationOptions.map((location) => (
                  <TouchableOpacity
                    key={location}
                    style={[
                      styles.locationButton,
                      filters.location === location && styles.locationButtonActive
                    ]}
                    onPress={() => setFilters(prev => ({ ...prev, location }))}
                  >
                    <Text style={[
                      styles.locationButtonText,
                      filters.location === location && styles.locationButtonTextActive
                    ]}>
                      {location}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* Rating Filter */}
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

          {/* Services Filter */}
          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Services</Text>
            <View style={styles.servicesGrid}>
              {serviceCategories.map((service) => (
                <TouchableOpacity
                  key={service}
                  style={[
                    styles.serviceButton,
                    filters.services.includes(service) && styles.serviceButtonActive
                  ]}
                  onPress={() => {
                    setFilters(prev => ({
                      ...prev,
                      services: prev.services.includes(service)
                        ? prev.services.filter(s => s !== service)
                        : [...prev.services, service]
                    }));
                  }}
                >
                  <Text style={[
                    styles.serviceButtonText,
                    filters.services.includes(service) && styles.serviceButtonTextActive
                  ]}>
                    {service.charAt(0).toUpperCase() + service.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Quick Filters */}
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

            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() => setFilters(prev => ({ ...prev, previousBarbers: !prev.previousBarbers }))}
            >
              <View style={[styles.checkbox, filters.previousBarbers && styles.checkboxActive]}>
                {filters.previousBarbers && (
                  <Icon name="checkmark" size={16} color="white" />
                )}
              </View>
              <Text style={styles.checkboxLabel}>Previous Barbers Only</Text>
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
  presetsSection: {
    marginBottom: 16,
  },
  presetsScroll: {
    paddingHorizontal: 4,
  },
  presetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: colors.background,
    marginRight: 12,
    gap: 6,
  },
  presetButtonActive: {
    backgroundColor: colors.primary,
  },
  presetButtonText: {
    fontSize: Math.min(14, Math.max(12, screenWidth * 0.035)),
    fontWeight: '600',
    color: colors.primary,
  },
  presetButtonTextActive: {
    color: 'white',
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
  locationButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  locationButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: colors.background,
    alignItems: 'center',
  },
  locationButtonActive: {
    backgroundColor: colors.primary,
  },
  locationButtonText: {
    fontSize: Math.min(14, Math.max(12, screenWidth * 0.035)),
    fontWeight: '600',
    color: colors.text,
  },
  locationButtonTextActive: {
    color: 'white',
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
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  serviceButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: colors.background,
    alignItems: 'center',
  },
  serviceButtonActive: {
    backgroundColor: colors.primary,
  },
  serviceButtonText: {
    fontSize: Math.min(14, Math.max(12, screenWidth * 0.035)),
    fontWeight: '600',
    color: colors.text,
  },
  serviceButtonTextActive: {
    color: 'white',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
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
