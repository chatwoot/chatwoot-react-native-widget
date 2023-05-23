import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  BG_COLOR_WHITE,
  BG_COLOR_DARK,
  COLOR_WHITE,
  WOOT_PREFIX,
  POST_MESSAGE_EVENTS,
} from './constants';

export const isJsonString = (string) => {
  try {
    JSON.parse(string);
  } catch (e) {
    return false;
  }
  return true;
};

export const createWootPostMessage = (object) => {
  const stringfyObject = `'${WOOT_PREFIX}${JSON.stringify(object)}'`;
  const script = `window.postMessage(${stringfyObject});`;
  return script;
};

export const getMessage = (data) => data.replace(WOOT_PREFIX, '');

export const generateScripts = ({ colorScheme, user, locale, customAttributes }) => {
  let script = '';
  if (user) {
    const userObject = {
      event: POST_MESSAGE_EVENTS.SET_USER,
      identifier: user.identifier,
      user,
    };
    script += createWootPostMessage(userObject);
  }
  if (locale) {
    const localeObject = { event: POST_MESSAGE_EVENTS.SET_LOCALE, locale };
    script += createWootPostMessage(localeObject);
  }
  if (customAttributes) {
    const attributeObject = {
      event: POST_MESSAGE_EVENTS.SET_CUSTOM_ATTRIBUTES,
      customAttributes,
    };
    script += createWootPostMessage(attributeObject);
  }
  if (colorScheme) {
    const themeObject = { event: POST_MESSAGE_EVENTS.SET_COLOR_SCHEME, darkMode: colorScheme };
    script += createWootPostMessage(themeObject);
  }
  return script;
};
export const storeHelper = {
  getCookie: async () => {
    const cookie = await AsyncStorage.getItem('cwCookie');
    return cookie;
  },
  storeCookie: async (value) => {
    await AsyncStorage.setItem('cwCookie', value);
  },
};

export const findColors = ({ colorScheme, appColorScheme }) => {
  let headerBackgroundColor = COLOR_WHITE;
  let mainBackgroundColor = BG_COLOR_WHITE;

  if (colorScheme === 'dark' || (colorScheme === 'auto' && appColorScheme === 'dark')) {
    headerBackgroundColor = BG_COLOR_DARK;
    mainBackgroundColor = BG_COLOR_DARK;
  } else if (colorScheme === 'auto' && appColorScheme === 'light') {
    headerBackgroundColor = COLOR_WHITE;
    mainBackgroundColor = BG_COLOR_WHITE;
  }

  return {
    headerBackgroundColor,
    mainBackgroundColor,
  };
};
