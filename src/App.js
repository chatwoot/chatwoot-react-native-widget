import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import { storeHelper } from './utils';
import WebView from './WebView';
import styles from './style';
const propTypes = {
  isModalVisible: PropTypes.bool.isRequired,
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
  customattributes: {},
};

const ChatWootWidget = ({
  isModalVisible,
  baseUrl,
  websiteToken,
  user,
  locale,
  customAttributes,
  closeModal,
}) => {
  const [cwCookie, setCookie] = useState('');
  useEffect(() => {
    async function fetchData() {
      const value = await storeHelper.getCookie();
      setCookie(value);
    }
    fetchData();
  }, []);

  return (
    <Modal
      style={styles.modal}
      coverScreen
      isVisible={isModalVisible}
      onSwipeComplete={() => isModalVisible}
      swipeDirection="left"
      onBackdropPress={closeModal}
      onBackButtonPress={closeModal}>
      <View style={styles.mainView}>
        <WebView
          websiteToken={websiteToken}
          cwCookie={cwCookie}
          user={user}
          baseUrl={baseUrl}
          locale={locale}
          customAttributes={customAttributes}
          closeModal={closeModal}
        />
      </View>
    </Modal>
  );
};

ChatWootWidget.defaultProps = defaultProps;
ChatWootWidget.propTypes = propTypes;

export default ChatWootWidget;
