import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../theme/ThemeProvider';
import { Card, Badge, Button } from '../../components/common';
import { useInvestmentStore } from '../../store';
import { mockInvestments } from '../../data/mockData';

type SortOption = 'roi_high' | 'roi_low' | 'price_low' | 'price_high' | 'location';

export const MarketplaceScreenEnhanced: React.FC = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const { investments } = useInvestmentStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('roi_high');
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    minROI: '',
    maxROI: '',
    location: '',
  });

  const allInvestments = investments.length > 0 ? investments : mockInvestments;

  const filteredInvestments = allInvestments.filter((inv) => {
    if (searchQuery && !inv.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (filters.minPrice && inv.totalPrice < parseInt(filters.minPrice)) return false;
    if (filters.maxPrice && inv.totalPrice > parseInt(filters.maxPrice)) return false;
    if (filters.minROI && inv.roi < parseFloat(filters.minROI)) return false;
    if (filters.maxROI && inv.roi > parseFloat(filters.maxROI)) return false;
    if (filters.location && !inv.location.toLowerCase().includes(filters.location.toLowerCase())) {
      return false;
    }
    return true;
  });

  const sortedInvestments = [...filteredInvestments].sort((a, b) => {
    switch (sortBy) {
      case 'roi_high':
        return b.roi - a.roi;
      case 'roi_low':
        return a.roi - b.roi;
      case 'price_low':
        return a.totalPrice - b.totalPrice;
      case 'price_high':
        return b.totalPrice - a.totalPrice;
      default:
        return 0;
    }
  });

  const renderInvestment = ({ item }: { item: typeof mockInvestments[0] }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('MarketplaceInvestmentDetail' as never, { investmentId: item.id } as never);
      }}
      activeOpacity={0.7}
    >
      <Card style={styles.investmentCard} elevated>
        <View style={styles.imagePlaceholder}>
          <Text style={styles.imageText}>📷</Text>
        </View>
        <View style={styles.investmentInfo}>
          <Text style={[styles.investmentName, { color: theme.colors.text.primary }]}>
            {item.name}
          </Text>
          <View style={styles.locationRow}>
            <Text style={styles.locationIcon}>📍</Text>
            <Text style={[styles.locationText, { color: theme.colors.text.secondary }]}>
              {item.location}
            </Text>
          </View>
          <View style={styles.metricsRow}>
            <View style={styles.metric}>
              <Text style={[styles.metricLabel, { color: theme.colors.text.secondary }]}>ROI</Text>
              <Text style={[styles.metricValue, { color: theme.colors.primary[500] }]}>
                {item.roi}%
              </Text>
            </View>
            <View style={styles.metric}>
              <Text style={[styles.metricLabel, { color: theme.colors.text.secondary }]}>
                Price
              </Text>
              <Text style={[styles.metricValue, { color: theme.colors.text.primary }]}>
                ${(item.totalPrice / 1000).toFixed(0)}K
              </Text>
            </View>
          </View>
          <View style={styles.priceRow}>
            <View>
              <Text style={[styles.priceLabel, { color: theme.colors.text.secondary }]}>
                Total Price
              </Text>
              <Text style={[styles.priceValue, { color: theme.colors.text.primary }]}>
                ${item.totalPrice.toLocaleString()}
              </Text>
            </View>
            <View>
              <Text style={[styles.priceLabel, { color: theme.colors.text.secondary }]}>
                Min Buy-in
              </Text>
              <Text style={[styles.priceValue, { color: theme.colors.text.primary }]}>
                ${item.minimumBuyIn.toLocaleString()}
              </Text>
            </View>
          </View>
          <Badge
            label={item.status === 'available' ? 'Available' : 'Limited Units Left'}
            variant={item.status === 'available' ? 'success' : 'warning'}
            style={styles.availabilityBadge}
          />
        </View>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Search and Sort */}
      <View style={[styles.searchSection, { backgroundColor: theme.colors.surface }]}>
        <TextInput
          style={[
            styles.searchInput,
            {
              backgroundColor: theme.colors.background,
              color: theme.colors.text.primary,
              borderColor: theme.colors.border,
            },
          ]}
          placeholder="Search investment opportunities"
          placeholderTextColor={theme.colors.text.tertiary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity
          style={[styles.sortButton, { backgroundColor: theme.colors.background }]}
          onPress={() => {
            // TODO: Show sort options
          }}
        >
          <Text style={[styles.sortText, { color: theme.colors.text.primary }]}>
            Sort: {sortBy === 'roi_high' ? 'ROI (High→Low)' : 'Price (Low→High)'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={[styles.filtersSection, { backgroundColor: theme.colors.surface }]}
        contentContainerStyle={styles.filtersContent}
      >
        <TouchableOpacity
          style={[
            styles.filterChip,
            { backgroundColor: theme.colors.primary[500] },
          ]}
        >
          <Text style={styles.filterChipText}>Min Price</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterChip,
            { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
          ]}
        >
          <Text style={[styles.filterChipText, { color: theme.colors.text.primary }]}>
            Max Price
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterChip,
            { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
          ]}
        >
          <Text style={[styles.filterChipText, { color: theme.colors.text.primary }]}>
            ROI Range
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterChip,
            { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
          ]}
        >
          <Text style={[styles.filterChipText, { color: theme.colors.text.primary }]}>
            Location
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Investment List */}
      <FlatList
        data={sortedInvestments}
        renderItem={renderInvestment}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={[styles.title, { color: theme.colors.text.primary }]}>
              Investment Marketplace
            </Text>
            <Text style={[styles.subtitle, { color: theme.colors.text.secondary }]}>
              {sortedInvestments.length} opportunities available
            </Text>
          </View>
        }
        ListFooterComponent={
          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: theme.colors.text.tertiary }]}>
              Investments are subject to availability and allows only logged in Users
            </Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  searchInput: {
    borderRadius: 8,
    borderWidth: 1,
    padding: 12,
    fontSize: 14,
    marginBottom: 12,
  },
  sortButton: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  sortText: {
    fontSize: 14,
    fontWeight: '600',
  },
  filtersSection: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  filtersContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  filterChipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  listContent: {
    padding: 24,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
  investmentCard: {
    marginBottom: 20,
    overflow: 'hidden',
  },
  imagePlaceholder: {
    width: '100%',
    height: 200,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageText: {
    fontSize: 48,
  },
  investmentInfo: {
    padding: 20,
  },
  investmentName: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  locationIcon: {
    fontSize: 16,
    marginRight: 4,
  },
  locationText: {
    fontSize: 14,
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 24,
    marginBottom: 16,
  },
  metric: {
    flex: 1,
  },
  metricLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '700',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  priceLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  priceValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  availabilityBadge: {
    alignSelf: 'flex-start',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    textAlign: 'center',
  },
});

