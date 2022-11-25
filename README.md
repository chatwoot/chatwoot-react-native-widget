<h1>
chatwoot-react-native-widget
</h1>

![](https://img.shields.io/npm/v/@chatwoot/react-native-widget?style=flat)
![](https://img.shields.io/npm/dt/@chatwoot/react-native-widget.svg)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
![](https://img.shields.io/npm/l/@chatwoot/@chatwoot/react-native-widget)

- **Supported Chatwoot version:** 1.18.0+

<img src="https://user-images.githubusercontent.com/12408980/203909820-938136a6-bf5b-433e-9f68-d7f28a1303be.png" alt="screenshot" width="350">

### Installation

Install the library using either yarn or npm like so:

```sh
yarn add @chatwoot/react-native-widget
```

OR

```sh
npm install --save @chatwoot/react-native-widget
```

This library depends on [react-native-webview](https://www.npmjs.com/package/react-native-webview) and [async-storage](https://github.com/react-native-async-storage/async-storage). Please follow the instructions provided in the docs.

### iOS Installation

If you're using React Native versions > 60.0, it's relatively straightforward.

```sh
cd ios && pod install
```

### How to use

1. Create a website channel in chatwoot server by following the steps described here https://www.chatwoot.com/docs/channels/website
2. Replace `websiteToken` prop and `baseUrl`

```

import React, { useState } from 'react';

import { StyleSheet, View, SafeAreaView, TouchableOpacity, Text } from 'react-native';

import ChatWootWidget from '@chatwoot/react-native-widget';

const App = () => {
  const [showWidget, toggleWidget] = useState(false);
  const user = {
    identifier: 'john@gmail.com',
    name: 'John Samuel',
    avatar_url: '',
    email: 'john@gmail.com',
    identifier_hash: '',
  };
  const customAttributes = { accountId: 1, pricingPlan: 'paid', status: 'active' };
  const websiteToken = 'WEBSITE_TOKEN';
  const baseUrl = 'CHATWOOT_INSTALLATION_URL';
  const locale = 'en';

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TouchableOpacity style={styles.button} onPress={() => toggleWidget(true)}>
          <Text style={styles.buttonText}>Open widget</Text>
        </TouchableOpacity>
      </View>
      {
        showWidget&&
          <ChatWootWidget
            websiteToken={websiteToken}
            locale={locale}
            baseUrl={baseUrl}
            closeModal={() => toggleWidget(false)}
            isModalVisible={showWidget}
            user={user}
            customAttributes={customAttributes}
          />
      }

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

```

You're done!

The whole example is in the `/example` folder.

### Props

<table class="table">
<thead><tr>
  <th>Name</th><th>Default</th><th>Type</th><th>Description</th>
</tr></thead>
<tbody>
  <tr>
    <td>baseUrl</td>
    <td> - </td>
    <td> String </td>
    <td>Chatwoot installation URL</td>
  </tr>
 <tr>
    <td>websiteToken</td>
    <td> - </td>
    <td> String </td>
    <td>Website channel token</td>
  </tr>
  <tr>
    <td>locale</td>
    <td> en </td>
    <td> String </td>
    <td>Locale</td>
  </tr>
  <tr>
    <td>isModalVisible</td>
    <td> false </td>
    <td> Boolean </td>
    <td>Widget is visible or not</td>
  </tr>
    <tr>
    <td>closeModal</td>
    <td> - </td>
    <td> Function </td>
    <td>Close event</td>
  </tr>
  <tr>
	  <td>user</td>
    <td> {} </td>
    <td> Object </td>
    <td>User information about the user like email, username and avatar_url</td>
  </tr>
  <tr>
   <td>customAttributes</td>
    <td> {} </td>
    <td> Object </td>
    <td>Additional information about the customer</td>
  </tr>
 </tbody>
</table>

## Feedback & Contributing

Feel free to send us feedback on [Twitter](https://twitter.com/chatwootapp) or [file an issue](https://github.com/chatwoot/chatwoot-mobile-app/issues).

If there's anything you'd like to chat about, please feel free to join our [Discord](https://discord.gg/cJXdrwS) chat!

_Chatwoot_ &copy; 2017-2022, Chatwoot Inc - Released under the MIT License.
