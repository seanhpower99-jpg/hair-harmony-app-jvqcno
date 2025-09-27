
import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyles, colors } from '../styles/commonStyles';
import { useUserType } from '../hooks/useUserType';

export default function IndexScreen() {
  const { userType, isLoading } = useUserType();

  useEffect(() => {
    if (!isLoading) {
      if (userType) {
        router.replace('/main');
      } else {
        router.replace('/welcome');
      }
    }
  }, [userType, isLoading]);

  if (isLoading) {
    return (
      <SafeAreaView style={commonStyles.container}>
        <View style={[commonStyles.container, commonStyles.center]}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={[commonStyles.text, { marginTop: 16 }]}>Loading Trimz...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return null;
}
