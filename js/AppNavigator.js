import React from 'react';
import { Platform, View } from 'react-native';
import {
  createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation';

import { SimpleLineIcons } from '@expo/vector-icons';

import JournalScreen from './screens/JournalScreen';
import PhotosScreen from './screens/PhotosScreen';
import SettingsScreen from './screens/SettingsScreen';
import ItemScreen from './screens/ItemScreen';
import EditScreen from './screens/EditScreen';
import TouchableItem from './components/TouchableItem';

const Tabs = createBottomTabNavigator(
  {
    Journal: {
      screen: JournalScreen,
      navigationOptions: {
        title: 'Tagebuch'
      }
    },
    Photos: {
      screen: PhotosScreen,
      navigationOptions: {
        title: 'Fotos'
      }
    },
    Settings: {
      screen: SettingsScreen,
      navigationOptions: {
        title: 'Einstellungen'
      }
    }
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Journal') iconName = 'book-open';
        else if (routeName === 'Photos') iconName = 'picture';
        else if (routeName === 'Settings') iconName = 'settings';

        return <SimpleLineIcons name={iconName} size={24} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      activeTintColor: 'deepskyblue',
      inactiveTintColor: '#929292'
    }
  }
);

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: Tabs,
      navigationOptions: ({ navigation }) => ({
        headerRight: (
          <TouchableItem
            onPress={() => {
              const newItem = { text: null, photo: null, date: null };
              navigation.navigate('Edit', { item: newItem });
            }}
          >
            <View>
              <SimpleLineIcons
                style={{ padding: 10 }}
                name="plus"
                size={24}
                color="deepskyblue"
              />
            </View>
          </TouchableItem>
        )
      })
    },
    Item: ItemScreen,
    Edit: EditScreen
  },
  {
    navigationOptions: {
      headerTintColor: 'deepskyblue',
      headerStyle: {
        ...Platform.select({
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
