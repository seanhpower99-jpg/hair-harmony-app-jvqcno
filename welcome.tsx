import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { commonStyles } from '../styles/commonStyles';

export default function WelcomeScreen() {
  const auth = useContext(AuthContext);
  if (!auth) return null;

  return (
    <View style={[commonStyles.container, commonStyles.center, { padding: 20 }]}>
      <Text style={commonStyles.title}>Welcome to Trimz</Text>
      <Text style={[commonStyles.text, { marginVertical: 12 }]}>
        Please log in to continue as a customer or hairdresser.
      </Text>
      <TouchableOpacity onPress={() => {}} style={[commonStyles.button, { marginBottom: 8 }]}>
        <Text style={commonStyles.buttonText}>Create account (not implemented)</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {}} style={[commonStyles.button, { backgroundColor: '#eee' }]}>
        <Text style={[commonStyles.buttonText, { color: '#333' }]}>Browse demo (not implemented)</Text>
      </TouchableOpacity>
    </View>
  );
}
