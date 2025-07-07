import React, { useState } from 'react';
import ChatWootWidget from './src/App';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
} from 'react-native';

const App = () => {
  const [showWidget, toggleWidget] = useState(false);
  const [user, setUser] = useState({
    identifier: 'sabir.k@example.com',
    name: 'Nova Rider',
    avatar_url: 'https://i.pravatar.cc/150',
    email: 'nova.rider@example.com',
    identifier_hash: '5e9a3d5a71143059d3a3e87a0847ad8e8880defd6772c8d61c0e324b9e7a95a1',
  });
  const customAttributes = {
    order_id: 1212,
  };
  const websiteToken = '3mxLvj762wfcMvMUphvKsLg1';
  const baseUrl = 'https://sdsdsd.chatwoot.dev';
  const [locale, setLocale] = useState('en');

  const clearCookies = async () => {
    try {
      await AsyncStorage.removeItem('cwCookie');
      Alert.alert('Success', 'Cookies cleared successfully');
      // Force widget to refresh by toggling it if it's open
      if (showWidget) {
        toggleWidget(false);
        setTimeout(() => toggleWidget(true), 100);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to clear cookies');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) =>
            setUser((prevUser) => ({
              ...prevUser,
              name: text,
            }))
          }
          value={user.name}
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) =>
            setUser((prevUser) => ({
              ...prevUser,
              email: text,
              identifier: text,
            }))
          }
          value={user.email}
        />
        <Text style={styles.label}>Language</Text>
        <TextInput style={styles.input} value={locale} onChangeText={() => setLocale(locale)} />
        <Text style={styles.label}>Avatar</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) =>
            setUser((prevUser) => ({
              ...prevUser,
              avatar_url: text,
            }))
          }
          value={user.avatar_url}
        />
        <TouchableOpacity style={styles.button} onPress={() => toggleWidget(true)}>
          <Text style={styles.buttonText}>Open Chatwoot Widget</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.clearButton]} onPress={clearCookies}>
          <Text style={styles.buttonText}>Clear Cookies</Text>
        </TouchableOpacity>
      </View>
      <ChatWootWidget
        websiteToken={websiteToken}
        locale={locale}
        baseUrl={baseUrl}
        colorScheme="light"
        closeModal={() => toggleWidget(false)}
        isModalVisible={showWidget}
        user={user}
        customAttributes={customAttributes}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    flex: 1,
    paddingVertical: 32,
  },

  button: {
    height: 48,
    marginTop: 32,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: '#1F93FF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#fff',
    justifyContent: 'center',
  },
  clearButton: {
    backgroundColor: '#FF6B6B',
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    paddingLeft: 10,
    fontWeight: '600',
    fontSize: 16,
    paddingRight: 10,
  },
  label: {
    marginTop: 16,
  },
  input: {
    height: 40,
    width: 300,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8,
    fontWeight: '600',
    fontSize: 16,
    color: 'gray',
  },
});

export default App;
