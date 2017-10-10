import React from 'react';
import { TabNavigator } from 'react-navigation';

import { SimpleLineIcons } from '@expo/vector-icons';

import JournalScreen from './screens/JournalScreen';
import PhotosScreen from './screens/PhotosScreen';
import SettingsScreen from './screens/SettingsScreen';

const Tabs = TabNavigator({
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
});

export default Tabs;
