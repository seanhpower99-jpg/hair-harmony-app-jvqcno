
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { colors, commonStyles } from '../../styles/commonStyles';
import { mockCustomer } from '../../data/mockData';
import SearchBar from '../../components/SearchBar';
import Icon from '../../components/Icon';

export default function HairdresserClientsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock client data - in a real app this would come from API
  const mockClients = [
    {
      ...mockCustomer,
      lastVisit: new Date('2024-01-15'),
      totalSpent: 180,
      visitCount: 3,
    },
    {
      id: 'client2',
      name: 'Jane Doe',
      email: 'jane@example.com',
      phone: '+1234567894',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      rating: 4.8,
      reviewCount: 8,
      lastVisit: new Date('2024-01-10'),
      totalSpent: 320,
      visitCount: 5,
    },
    {
      id: 'client3',
      name: 'Mike Johnson',
      email: 'mike@example.com',
      phone: '+1234567895',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      rating: 4.6,
      reviewCount: 4,
      lastVisit: new Date('2024-01-08'),
      totalSpent: 140,
      visitCount: 4,
    },
  ];

  const filteredClients = mockClients.filter(client =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleClientPress = (clientId: string) => {
    console.log('Selected client:', clientId);
  };

  const formatLastVisit = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
  };

  const renderClientCard = (client: any) => (
    <TouchableOpacity
      key={client.id}
      style={[commonStyles.card, styles.clientCard]}
      onPress={() => handleClientPress(client.id)}
    >
      <View style={styles.clientHeader}>
        <Image source={{ uri: client.avatar }} style={styles.avatar} />
        <View style={styles.clientInfo}>
          <Text style={styles.clientName}>{client.name}</Text>
          <Text style={styles.clientEmail}>{client.email}</Text>
          <View style={styles.ratingRow}>
            <Icon name="star" size={14} color={colors.warning} />
            <Text style={styles.rating}>{client.rating}</Text>
            <Text style={styles.reviews}>({client.reviewCount} reviews)</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.contactButton}>
          <Icon name="chatbubble-outline" size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.clientStats}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{client.visitCount}</Text>
          <Text style={styles.statLabel}>Visits</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>${client.totalSpent}</Text>
          <Text style={styles.statLabel}>Total Spent</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{formatLastVisit(client.lastVisit)}</Text>
          <Text style={styles.statLabel}>Last Visit</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={commonStyles.container}>
      <View style={commonStyles.content}>
        <Text style={commonStyles.title}>My Clients</Text>

        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search clients..."
        />

        <View style={styles.statsHeader}>
          <View style={styles.totalStats}>
            <Text style={styles.totalNumber}>{filteredClients.length}</Text>
            <Text style={styles.totalLabel}>Total Clients</Text>
          </View>
          <TouchableOpacity style={styles.exportButton}>
            <Icon name="download-outline" size={20} color={colors.primary} />
            <Text style={styles.exportText}>Export</Text>
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
          {filteredClients.length > 0 ? (
            filteredClients.map(renderClientCard)
          ) : (
            <View style={styles.emptyState}>
              <Icon name="people-outline" size={48} color={colors.textLight} />
              <Text style={styles.emptyTitle}>No clients found</Text>
              <Text style={styles.emptySubtitle}>
                {searchQuery ? 'Try adjusting your search' : 'Your clients will appear here after their first booking'}
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  statsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  totalStats: {
    alignItems: 'center',
  },
  totalNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
  },
  totalLabel: {
    fontSize: 14,
    color: colors.textLight,
  },
  exportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: colors.backgroundAlt,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  exportText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
    marginLeft: 8,
  },
  clientCard: {
    marginHorizontal: 20,
    marginBottom: 16,
  },
  clientHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  clientInfo: {
    flex: 1,
  },
  clientName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  clientEmail: {
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
  contactButton: {
    padding: 8,
  },
  clientStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.grey,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textLight,
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
});
