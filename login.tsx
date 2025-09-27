import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { commonStyles } from '../styles/commonStyles';

export default function LoginScreen() {
  const auth = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('password');
  if (!auth) return null;

  const onLogin = async () => {
    const ok = await auth.login(email.trim(), password);
    if (!ok) {
      Alert.alert(
        'Login failed',
        'Invalid credentials. Try one of the demo users in mockData with password "password".'
      );
    }
  };

  return (
    <View style={[commonStyles.container, commonStyles.center, { padding: 20 }]}>
      <Text style={[commonStyles.title, { marginBottom: 16 }]}>Welcome back</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={[commonStyles.input, { marginBottom: 12 }]}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={[commonStyles.input, { marginBottom: 12 }]}
      />
      <TouchableOpacity onPress={onLogin} style={[commonStyles.button]}>
        <Text style={commonStyles.buttonText}>Log in</Text>
      </TouchableOpacity>
      <Text style={[commonStyles.text, { marginTop: 12 }]}>
        Demo users available in <Text style={{ fontWeight: 'bold' }}>data/mockData.ts</Text>. 
        Use password "password".
      </Text>
    </View>
  );
}
