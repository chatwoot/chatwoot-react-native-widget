declare module '@chatwoot/react-native-widget' {
  import React from 'react';

  export interface ChatWootWidgetProps {
    websiteToken: string;
    locale: string;
    baseUrl: string;
    closeModal: () => void;
    isModalVisible: boolean;
    user: {
      identifier: string;
      name: string;
      avatar_url: string;
      email: string;
      identifier_hash: string;
    };
  }

  class ChatWootWidget extends React.Component<ChatWootWidgetProps, any> {}
  export default ChatWootWidget;
}

