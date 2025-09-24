import React, { useState, useMemo } from 'react';
import { StyleSheet, Linking, View, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import PropTypes from 'prop-types';
import { isJsonString, storeHelper, generateScripts, getMessage } from './utils';
const propTypes = {
  websiteToken: PropTypes.string.isRequired,
  baseUrl: PropTypes.string.isRequired,
  cwCookie: PropTypes.string,
  colorScheme: PropTypes.oneOf(['light', 'dark', 'auto']),
  user: PropTypes.shape({
    name: PropTypes.string,
    avatar_url: PropTypes.string,
    email: PropTypes.string,
    identifier_hash: PropTypes.string,
  }),
  locale: PropTypes.string,
  customAttributes: PropTypes.shape({}),
  closeModal: PropTypes.func,
};

const WebViewComponent = ({
  baseUrl,
  websiteToken,
  cwCookie,
  locale,
  colorScheme,
  user,
  customAttributes,
  closeModal,
}) => {
  const [currentUrl, setCurrentUrl] = React.useState(null);
  const [loading, setLoading] = useState(true);
  let widgetUrl = `${baseUrl}/widget?website_token=${websiteToken}&locale=${locale}`;

  if (cwCookie) {
    widgetUrl = `${widgetUrl}&cw_conversation=${cwCookie}`;
  }
  const injectedJavaScript = generateScripts({
    user,
    locale,
    customAttributes,
    colorScheme,
  });

  const onShouldStartLoadWithRequest = (request) => {
    const isMessageView = currentUrl && currentUrl.includes('#/messages');
    const isAttachmentUrl = !widgetUrl.includes(request.url);
    // Open the attachments only in the external browser
    const shouldRedirectToBrowser = isMessageView && isAttachmentUrl;
    if (shouldRedirectToBrowser) {
      Linking.openURL(request.url);
      return false;
    }

    return true;
  };

  const handleWebViewNavigationStateChange = (newNavState) => {
    setCurrentUrl(newNavState.url);
  };

  const opacity = useMemo(() => {
    if (loading) {
      return {
        opacity: 0,
      };
    }
    return {
      opacity: 1,
    };
  }, [loading]);

  const renderLoadingComponent = () => {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <WebView
        source={{
          uri: widgetUrl,
        }}
        onMessage={(event) => {
          const { data } = event.nativeEvent;
          const message = getMessage(data);
          if (isJsonString(message)) {
            const parsedMessage = JSON.parse(message);
            const { event: eventType, type } = parsedMessage;
            if (eventType === 'loaded') {
              const {
                config: { authToken },
              } = parsedMessage;
              storeHelper.storeCookie(authToken);
            }
            if (type === 'close-widget') {
              closeModal();
            }
          }
        }}
        scalesPageToFit
        useWebKit
        sharedCookiesEnabled
        javaScriptEnabled={true}
        domStorageEnabled={true}
        style={[styles.WebViewStyle, opacity]}
        injectedJavaScript={injectedJavaScript}
        onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
        onNavigationStateChange={handleWebViewNavigationStateChange}
        onLoadStart={() => setLoading(true)}
        onLoadProgress={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        scrollEnabled
      />
      {loading && renderLoadingComponent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modal: {
    flex: 1,
    borderRadius: 4,
    overflow: 'hidden',
  },
  webViewContainer: {
    flex: 1,
  },
  WebViewStyle: {
    flex: 1,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
});

WebViewComponent.propTypes = propTypes;
export default WebViewComponent;
