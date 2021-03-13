import React, {useState} from 'react';
import ChatWootWidget from '@chatwoot/chatwoot-react-native-widget-testing';

import {SafeAreaView, StyleSheet, Text, TouchableOpacity} from 'react-native';

const App = () => {
  const [showWidget, toggleWidget] = useState(false);
  const [user, setUser] = useState({
    identifier: 'gustavo_hoffman@gmail.com',
    name: 'Gustavo Hoffman',
    avatar_url: 'https://i.pravatar.cc/300',
    email: 'gustavo_hoffman@gmail.com',
    identifier_hash: '',
  });
  const customAttributes = {
    accountId: 1,
    pricingPlan: 'paid',
    status: 'active',
  };
  const websiteToken = 'TOKEN';
  const baseUrl = 'https://staging.chatwoot.com';
  const [locale, setLocale] = useState('ml');

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => toggleWidget(true)}
        underlayColor="#fff">
        <Text style={styles.buttonText}>Open Chatwoot Widget</Text>
      </TouchableOpacity>
      {showWidget && (
        <ChatWootWidget
          websiteToken={websiteToken}
          locale={locale}
          baseUrl={baseUrl}
          closeModal={() => toggleWidget(false)}
          isModalVisible={showWidget}
          user={user}
          customAttributes={customAttributes}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
});

export default App;
