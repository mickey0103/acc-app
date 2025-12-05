import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useTheme } from '../../theme/ThemeProvider';
import { Card, Button, Badge } from '../../components/common';
import { useInvestmentStore } from '../../store';
import { mockInvestments } from '../../data/mockData';

export const MarketplaceInvestmentDetailScreen: React.FC = () => {
  const { theme } = useTheme();
  const route = useRoute();
  const navigation = useNavigation();
  const { investmentId } = route.params as { investmentId: string };
  const { setSelectedInvestment } = useInvestmentStore();

  const investment = mockInvestments.find((i) => i.id === investmentId);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [investmentAmount, setInvestmentAmount] = useState(investment?.minimumBuyIn || 10000);

  if (!investment) {
    return null;
  }

  const ownershipPercentage = (investmentAmount / investment.totalPrice) * 100;
  const expectedAnnualReturn = investmentAmount * (investment.roi / 100);

  const handleContinue = () => {
    setSelectedInvestment(investment);
    navigation.navigate('Checkout' as never, { investmentId, amount: investmentAmount } as never);
  };

  const adjustAmount = (delta: number) => {
    const newAmount = Math.max(
      investment.minimumBuyIn,
      Math.min(investment.totalPrice, investmentAmount + delta)
    );
    setInvestmentAmount(newAmount);
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.content}
    >
      {/* Title */}
      <Text style={[styles.title, { color: theme.colors.text.primary }]}>
        {investment.name}
      </Text>

      {/* Image Carousel */}
      <Card style={styles.carouselCard} elevated>
        <View style={styles.imageContainer}>
          <Text style={styles.imagePlaceholder}>📷</Text>
        </View>
        <View style={styles.imageIndicators}>
          {[0, 1, 2].map((index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                selectedImageIndex === index && {
                  backgroundColor: theme.colors.primary[500],
                },
                { backgroundColor: theme.colors.neutral[300] },
              ]}
            />
          ))}
        </View>
      </Card>

      {/* Investment Summary */}
      <Card style={styles.summaryCard} elevated>
        <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
          Investment Summary
        </Text>
        <View style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, { color: theme.colors.text.secondary }]}>
            Location
          </Text>
          <Text style={[styles.summaryValue, { color: theme.colors.text.primary }]}>
            {investment.location}
          </Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, { color: theme.colors.text.secondary }]}>
            Total Price
          </Text>
          <Text style={[styles.summaryValue, { color: theme.colors.text.primary }]}>
            ${investment.totalPrice.toLocaleString()}
          </Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, { color: theme.colors.text.secondary }]}>
            Minimum Buy-in
          </Text>
          <Text style={[styles.summaryValue, { color: theme.colors.text.primary }]}>
            ${investment.minimumBuyIn.toLocaleString()}
          </Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, { color: theme.colors.text.secondary }]}>
            Expected ROI
          </Text>
          <Text style={[styles.summaryValue, { color: theme.colors.primary[500] }]}>
            {investment.roi}%
          </Text>
        </View>
      </Card>

      {/* Included Features */}
      <Card style={styles.featuresCard} elevated>
        <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
          Included Features
        </Text>
        <View style={styles.featuresGrid}>
          {investment.features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <Text style={styles.featureIcon}>✓</Text>
              <Text style={[styles.featureText, { color: theme.colors.text.secondary }]}>
                {feature}
              </Text>
            </View>
          ))}
        </View>
      </Card>

      {/* Call to Action */}
      <Card style={styles.ctaCard} elevated>
        <Text style={[styles.ctaTitle, { color: theme.colors.text.primary }]}>
          Start Your Investment
        </Text>
        <View style={styles.amountSection}>
          <Text style={[styles.amountLabel, { color: theme.colors.text.secondary }]}>
            Investment Amount
          </Text>
          <View style={styles.amountControls}>
            <TouchableOpacity
              style={[styles.amountButton, { backgroundColor: theme.colors.surface }]}
              onPress={() => adjustAmount(-1000)}
            >
              <Text style={[styles.amountButtonText, { color: theme.colors.text.primary }]}>
                -$1K
              </Text>
            </TouchableOpacity>
            <View style={styles.amountDisplay}>
              <Text style={[styles.amountValue, { color: theme.colors.text.primary }]}>
                ${investmentAmount.toLocaleString()}
              </Text>
            </View>
            <TouchableOpacity
              style={[styles.amountButton, { backgroundColor: theme.colors.surface }]}
              onPress={() => adjustAmount(1000)}
            >
              <Text style={[styles.amountButtonText, { color: theme.colors.text.primary }]}>
                +$1K
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.ownershipInfo}>
            <Text style={[styles.ownershipText, { color: theme.colors.text.secondary }]}>
              You are purchasing: {ownershipPercentage.toFixed(2)}% Ownership
            </Text>
            <Text style={[styles.returnText, { color: theme.colors.primary[500] }]}>
              Expected Annual Return: ${expectedAnnualReturn.toLocaleString()}
            </Text>
          </View>
        </View>
        <Button
          title="Continue to Extras"
          onPress={handleContinue}
          fullWidth
          style={styles.continueButton}
        />
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 24,
  },
  carouselCard: {
    marginBottom: 24,
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: 300,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePlaceholder: {
    fontSize: 64,
  },
  imageIndicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    padding: 16,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  summaryCard: {
    padding: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  featuresCard: {
    padding: 20,
    marginBottom: 24,
  },
  featuresGrid: {
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureIcon: {
    fontSize: 16,
    color: '#22C55E',
    marginRight: 12,
    fontWeight: '700',
  },
  featureText: {
    fontSize: 14,
    flex: 1,
  },
  ctaCard: {
    padding: 20,
  },
  ctaTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
  },
  amountSection: {
    marginBottom: 24,
  },
  amountLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  amountControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  amountButton: {
    padding: 12,
    borderRadius: 8,
    minWidth: 60,
    alignItems: 'center',
  },
  amountButtonText: {
    fontSize: 14,
    fontWeight: '700',
  },
  amountDisplay: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    alignItems: 'center',
  },
  amountValue: {
    fontSize: 24,
    fontWeight: '700',
  },
  ownershipInfo: {
    gap: 8,
  },
  ownershipText: {
    fontSize: 14,
  },
  returnText: {
    fontSize: 16,
    fontWeight: '700',
  },
  continueButton: {
    marginTop: 8,
  },
});

