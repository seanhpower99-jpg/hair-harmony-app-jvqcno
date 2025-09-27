
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../styles/commonStyles';
import Icon from './Icon';

interface AppLogoProps {
  size?: 'small' | 'medium' | 'large';
  onPress?: () => void;
}

export default function AppLogo({ size = 'medium', onPress }: AppLogoProps) {
  const logoSize = size === 'small' ? 24 : size === 'medium' ? 32 : 40;
  const textSize = size === 'small' ? 16 : size === 'medium' ? 20 : 24;

  const LogoContent = () => (
    <View style={styles.logoContainer}>
      <View style={[styles.logoIcon, { width: logoSize, height: logoSize }]}>
        <Icon name="cut-outline" size={logoSize * 0.6} color="white" />
      </View>
      <Text style={[styles.logoText, { fontSize: textSize }]}>Trimz</Text>
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} style={styles.touchable}>
        <LogoContent />
      </TouchableOpacity>
    );
  }

  return <LogoContent />;
}

const styles = StyleSheet.create({
  touchable: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIcon: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  logoText: {
    fontWeight: '700',
    color: colors.primary,
    letterSpacing: -0.5,
  },
});
