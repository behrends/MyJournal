import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';

import { SimpleLineIcons } from '@expo/vector-icons';

import JournalScreen from './screens/JournalScreen';
import PhotosScreen from './screens/PhotosScreen';
import SettingsScreen from './screens/SettingsScreen';
import ItemScreen from './screens/ItemScreen';

const Tabs = TabNavigator(
  {
    Journal: {
      screen: JournalScreen,
      navigationOptions: {
        title: 'Tagebuch',
        tabBarIcon: ({ tintColor }) => (
          <SimpleLineIcons name="book-open" size={24} color={tintColor} />
        )
      }
    },
    Photos: {
      screen: PhotosScreen,
      navigationOptions: {
        title: 'Fotos',
        tabBarIcon: ({ tintColor }) => (
          <SimpleLineIcons name="picture" size={24} color={tintColor} />
        )
      }
    },
    Settings: {
      screen: SettingsScreen,
      navigationOptions: {
        title: 'Einstellungen',
        tabBarIcon: ({ tintColor }) => (
          <SimpleLineIcons name="settings" size={24} color={tintColor} />
        )
      }
    }
  },
  {
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: 'deepskyblue',
      inactiveTintColor: '#929292',
      style: {
        backgroundColor: '#f4f4f4' // Hintergrundfarbe der Tableiste
      },
      indicatorStyle: {
        height: 0 // Kein Strich am unteren Rand in Android
      },
      showIcon: true,
      upperCaseLabel: false,
      labelStyle: {
        // nur Android: kein Abstand nach unten
        ...Platform.select({ android: { marginBottom: 0 } })
      }
    }
  }
);

const AppNavigator = StackNavigator(
  {
    Root: {
      screen: Tabs
    },
    Item: {
      screen: ItemScreen
    }
  },
  {
    navigationOptions: {
      headerTintColor: 'deepskyblue',
      headerStyle: {
        ...Platform.select({
          android: { marginTop: StatusBar.currentHeight },
          ios: { backgroundColor: 'white' }
        })
      }
    },
    cardStyle: {
      backgroundColor: 'white'
    }
  }
);

export default AppNavigator;
