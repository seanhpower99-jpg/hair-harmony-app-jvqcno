import React, { useContext } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyles, colors } from '../styles/commonStyles';
import { AuthProvider, AuthContext } from '../context/AuthContext';
import { router } from 'expo-router';

function Inner() {
  const auth = React.useContext(AuthContext as any);
  if (!auth) return null;

  const { isLoading, user, userType } = auth;

  React.useEffect(() => {
    if (!isLoading) {
      if (user) {
        router.replace('/main');
      } else {
        router.replace('/login');
      }
    }
  }, [isLoading, user, userType]);

  if (isLoading) {
    return (
      <SafeAreaView style={commonStyles.container}>
        <View style={[commonStyles.container, commonStyles.center]}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={[commonStyles.text, { marginTop: 16 }]}>
            Loading Trimz...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return null;
}

export default function IndexScreen() {
  return (
    <AuthProvider>
      <Inner />
    </AuthProvider>
  );
}
