
import { StyleSheet, ViewStyle, TextStyle, Dimensions, Platform } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const colors = {
  primary: '#20B2AA',      // Teal
  secondary: '#B0E0E6',    // Light teal
  accent: '#008B8B',       // Dark teal
  background: '#F5F5F5',   // Light gray
  backgroundAlt: '#FFFFFF', // White
  text: '#2F4F4F',         // Dark gray
  textLight: '#708090',    // Slate gray
  grey: '#D3D3D3',         // Light gray
  card: '#FFFFFF',         // White
  success: '#32CD32',      // Lime green
  warning: '#FFD700',      // Gold
  error: '#FF6347',        // Tomato
  shadow: 'rgba(0, 0, 0, 0.1)',
};

export const buttonStyles = StyleSheet.create({
  primary: {
    backgroundColor: colors.primary,
    paddingHorizontal: Math.max(20, screenWidth * 0.06),
    paddingVertical: Math.max(10, screenHeight * 0.015),
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: `0px 4px 8px ${colors.shadow}`,
    elevation: 4,
  },
  secondary: {
    backgroundColor: colors.secondary,
    paddingHorizontal: Math.max(20, screenWidth * 0.06),
    paddingVertical: Math.max(10, screenHeight * 0.015),
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: `0px 2px 4px ${colors.shadow}`,
    elevation: 2,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.primary,
    paddingHorizontal: Math.max(20, screenWidth * 0.06),
    paddingVertical: Math.max(10, screenHeight * 0.015),
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const commonStyles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
    // Add padding bottom for iOS to account for the new bottom nav positioning
    paddingBottom: Platform.OS === 'ios' ? 100 : 80,
  },
  content: {
    flex: 1,
    paddingHorizontal: Math.max(16, screenWidth * 0.05),
    paddingTop: Math.max(16, screenHeight * 0.02),
  },
  title: {
    fontSize: Math.min(28, Math.max(22, screenWidth * 0.07)),
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
    lineHeight: Math.min(36, Math.max(28, screenWidth * 0.09)),
  },
  subtitle: {
    fontSize: Math.min(20, Math.max(18, screenWidth * 0.05)),
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
    lineHeight: Math.min(28, Math.max(24, screenWidth * 0.065)),
  },
  text: {
    fontSize: Math.min(16, Math.max(14, screenWidth * 0.04)),
    fontWeight: '400',
    color: colors.text,
    lineHeight: Math.min(24, Math.max(20, screenWidth * 0.055)),
  },
  textLight: {
    fontSize: Math.min(14, Math.max(12, screenWidth * 0.035)),
    fontWeight: '400',
    color: colors.textLight,
    lineHeight: Math.min(20, Math.max(18, screenWidth * 0.05)),
  },
  section: {
    marginBottom: Math.max(20, screenHeight * 0.025),
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: Math.max(14, screenWidth * 0.04),
    marginBottom: 12,
    boxShadow: `0px 2px 8px ${colors.shadow}`,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Legacy bottom nav styles (kept for Android)
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: colors.backgroundAlt,
    paddingVertical: Math.max(10, screenHeight * 0.015),
    paddingHorizontal: Math.max(16, screenWidth * 0.05),
    borderTopWidth: 1,
    borderTopColor: colors.grey,
    boxShadow: `0px -2px 8px ${colors.shadow}`,
    elevation: 8,
  },
  bottomNavItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  input: {
    backgroundColor: colors.backgroundAlt,
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 12,
    paddingHorizontal: Math.max(14, screenWidth * 0.04),
    paddingVertical: Math.max(10, screenHeight * 0.015),
    fontSize: Math.min(16, Math.max(14, screenWidth * 0.04)),
    color: colors.text,
    marginBottom: 16,
  },
  searchBar: {
    backgroundColor: colors.backgroundAlt,
    borderRadius: 25,
    paddingHorizontal: Math.max(16, screenWidth * 0.05),
    paddingVertical: Math.max(10, screenHeight * 0.015),
    marginBottom: Math.max(16, screenHeight * 0.02),
    flexDirection: 'row',
    alignItems: 'center',
    boxShadow: `0px 2px 4px ${colors.shadow}`,
    elevation: 2,
  },
});
