import React, {useState} from 'react';
import ChatWootWidget from './src/App';

import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';

const App = () => {
  const [showWidget, toggleWidget] = useState(false);
  const [user, setUser] = useState({
    identifier: 'sandra.lawrence@example.com',
    name: 'Sandra Lawrence',
    avatar_url: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    email: 'sandra.lawrence@example.com',
    identifier_hash: '',
  });
  const customAttributes = {
    accountId: 1,
    pricingPlan: 'paid',
    status: 'active',
  };
  const websiteToken = 'RY3LaFtwmkPhDdZVmRd4ektW';
  const baseUrl = 'https://staging.chatwoot.com';
  const [locale, setLocale] = useState('en');

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={text =>
            setUser(prevUser => ({
              ...prevUser,
              name: text,
            }))
          }
          value={user.name}
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          onChangeText={text =>
            setUser(prevUser => ({
              ...prevUser,
              email: text,
              identifier: text,
            }))
          }
          value={user.email}
        />
        <Text style={styles.label}>Language</Text>
        <TextInput
          style={styles.input}
          value={locale}
          onChangeText={() => setLocale(locale)}
        />
        <Text style={styles.label}>Avatar</Text>
        <TextInput
          style={styles.input}
          onChangeText={text =>
            setUser(prevUser => ({
              ...prevUser,
              avatar_url: text,
            }))
          }
          value={user.avatar_url}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => toggleWidget(true)}>
          <Text style={styles.buttonText}>Open Chatwoot Widget</Text>
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