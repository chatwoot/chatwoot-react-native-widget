import React, {useState} from 'react';
import ChatWootWidget from '@chatwoot/react-native-widget';

import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import styles from './style';
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
  const websiteToken = 'gUuQpz4wKSBZ36zpWyXtShrJ';
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
          onChangeText={text => setLocale(locale)}
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
          onPress={() => toggleWidget(true)}
          underlayColor="#fff">
          <Text style={styles.buttonText}>Open Chatwoot Widget</Text>
        </TouchableOpacity>
      </View>
      <ChatWootWidget
        websiteToken={websiteToken}
        locale={locale}
        baseUrl={baseUrl}
        closeModal={() => toggleWidget(false)}
        isModalVisible={showWidget}
        user={user}
        customAttributes={customAttributes}
      />
    </SafeAreaView>
  );
};

export default App;
