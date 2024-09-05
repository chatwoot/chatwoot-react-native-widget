import React from 'react';
import { StyleSheet, Linking } from 'react-native';
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

const defaultProps = {
  cwCookie: '',
  user: {},
  locale: 'en',
  customAttributes: {},
  colorScheme: 'light',
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

  return (
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
      style={styles.WebViewStyle}
      injectedJavaScript={injectedJavaScript}
      onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
      onNavigationStateChange={handleWebViewNavigationStateChange}
      scrollEnabled
    />
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    borderRadius: 4,
    overflow: 'hidden',
  },
  webViewContainer: {
    flex: 1,
  },
});
WebViewComponent.defaultProps = defaultProps;
WebViewComponent.propTypes = propTypes;
export default WebViewComponent;
