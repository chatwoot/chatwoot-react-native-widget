import React from 'react';
import { StyleSheet, Linking } from 'react-native';
import { WebView } from 'react-native-webview';
import PropTypes from 'prop-types';
import { isJsonString, storeHelper, generateScripts, getMessage } from './utils';
const propTypes = {
  websiteToken: PropTypes.string.isRequired,
  baseUrl: PropTypes.string.isRequired,
  cwCookie: PropTypes.string,
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
};

const WebViewComponent = ({
  baseUrl,
  websiteToken,
  cwCookie,
  locale,
  user,
  customAttributes,
  closeModal,
}) => {
  let widgetUrl = `${baseUrl}/widget?website_token=${websiteToken}&locale=${locale}`;

  if (cwCookie) {
    widgetUrl = `${widgetUrl}&cw_conversation=${cwCookie}`;
  }
  const injectedJavaScript = generateScripts({
    user,
    locale,
    customAttributes,
  });

  const onShouldStartLoadWithRequest = (request) => {
    const shouldRedirectToBrowser = !widgetUrl.includes(request.url);
    if (shouldRedirectToBrowser) {
      Linking.openURL(request.url);
      return false;
    }

    return true;
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
