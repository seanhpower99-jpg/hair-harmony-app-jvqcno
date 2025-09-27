
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors, commonStyles, buttonStyles } from '../styles/commonStyles';
import { useUserType } from '../hooks/useUserType';

export default function WelcomeScreen() {
  const { switchUserType } = useUserType();

  const handleUserTypeSelection = (type: 'customer' | 'hairdresser') => {
    console.log('Selected user type:', type);
    switchUserType(type);
    router.replace('/main');
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=120&h=120&fit=crop' }}
            style={styles.logo}
          />
          <Text style={styles.title}>Welcome to Trimz</Text>
          <Text style={styles.subtitle}>
            Connect with the best hairdressers in your area
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[buttonStyles.primary, styles.button]}
            onPress={() => handleUserTypeSelection('customer')}
          >
            <Text style={styles.buttonText}>I'm looking for a hairdresser</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[buttonStyles.outline, styles.button]}
            onPress={() => handleUserTypeSelection('hairdresser')}
          >
            <Text style={[styles.buttonText, { color: colors.primary }]}>I'm a hairdresser</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.features}>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>📍</Text>
            <Text style={styles.featureText}>Find nearby professionals</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>⭐</Text>
            <Text style={styles.featureText}>Read reviews & ratings</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>📅</Text>
            <Text style={styles.featureText}>Easy online booking</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: 'space-between',
    paddingVertical: 40,
  },
  header: {
    alignItems: 'center',
    marginTop: 60,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: colors.textLight,
    textAlign: 'center',
    lineHeight: 26,
  },
  buttonContainer: {
    gap: 16,
  },
  button: {
    paddingVertical: 16,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  features: {
    gap: 20,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  featureIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  featureText: {
    fontSize: 16,
    color: colors.textLight,
    flex: 1,
  },
});
