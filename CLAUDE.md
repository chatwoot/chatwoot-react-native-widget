# Chatwoot React Native Widget

## Project Overview
This is a React Native widget library for integrating Chatwoot chat functionality into React Native applications. It provides a WebView-based chat interface that connects to Chatwoot server installations.

## Key Information
- **Package**: @chatwoot/react-native-widget
- **Supported Chatwoot version**: 2.16.0+
- **Main dependencies**: react-native-webview, async-storage
- **Current branch**: develop
- **License**: MIT

## Core Component
The main component is `ChatWootWidget` which accepts the following props:
- `baseUrl` (String, required): Chatwoot installation URL
- `websiteToken` (String, required): Website channel token
- `colorScheme` (String, default: 'light'): Widget color scheme (light/dark/auto)
- `locale` (String, default: 'en'): Locale setting
- `isModalVisible` (Boolean, default: false): Widget visibility state
- `closeModal` (Function, required): Close event handler
- `user` (Object, default: {}): User information (email, name, avatar_url, identifier, identifier_hash)
- `customAttributes` (Object, default: {}): Additional customer information

## Project Structure
- `/example` folder contains usage examples
- Main source code in library structure
- Uses React Native WebView for chat interface

## Installation Requirements
- React Native 60.0+
- iOS: requires `cd ios && pod install`
- Dependencies: react-native-webview, async-storage

## Usage Pattern
Typically used as a modal overlay that can be toggled on/off, providing a chat interface within React Native applications.

## Local Development & Testing
The widget source code is located in the `src/` directory. To test changes locally:

1. **Navigate to example project**: `cd Example`
2. **Install dependencies**: `npm install` or `yarn install`
3. **For iOS**: `cd ios && pod install && cd ..`
4. **Run on iOS**: `npx react-native run-ios`
5. **Run on Android**: `npx react-native run-android`

The example project uses the local source code from `src/` for testing widget changes during development.