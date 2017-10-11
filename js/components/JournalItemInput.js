import React, { Component } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  View
} from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import { ImagePicker, Location, Permissions } from 'expo';

import TouchableItem from './TouchableItem';
import Store from '../Store';

export default class JournalItemInput extends Component {
  state = { photo: null };

  _deleteItems() {
    Alert.alert(
      'Einträge löschen',
      'Sollen wirklich alle Einträge gelöscht werden?',
      [
        {
          text: 'Nein',
          style: 'cancel'
        },
        {
          text: 'Ja',
          onPress: async () => {
            await Store.deleteItems();
            this.props.refresh();
          }
        }
      ]
    );
  }

  _launchCamera = async () => {
    const result = await ImagePicker.launchCameraAsync();
    if (!result.cancelled) {
      this.setState({ photo: result.uri });
      this.textInput.focus();
    }
  };

  _getWeather = async () => {
    let result = { location: null, weather: null };
    try {
      const { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return result;
      }

      const position = await Location.getCurrentPositionAsync({});
      const { longitude, latitude } = position.coords;
      const location = `lon=${longitude}&lat=${latitude}`;
      const apiKey = 'APPID='; // OpenWeatherMap API-Key einsetzen
      const url =
        'http://api.openweathermap.org/data/2.5/weather?' +
        location +
        '&' +
        apiKey +
        '&units=metric&lang=de';
      const response = await fetch(url);
      const weatherJSON = await response.json();
      const { weather, main, name } = weatherJSON;
      result = {
        location: name,
        weather: `${Math.floor(main.temp)}˚C ${weather[0].description}`
      };
    } catch (error) {
      console.log('Error fetching weather', error);
    }
    return result;
  };

  _submitWithWeather = async (text, photo) => {
    const { location, weather } = await this._getWeather();
    this.props.onSubmit({ text, photo, location, weather });
  };

  _submit(text) {
    this.textInput.clear();
    this._submitWithWeather(text, this.state.photo);
    this.setState({ photo: null });
  }

  render() {
    const photoIcon = this.state.photo ? (
      <Image
        style={styles.imagePreview}
        source={{ uri: this.state.photo }}
      />
    ) : (
      <SimpleLineIcons name="camera" size={24} color="deepskyblue" />
    );
    return (
      <KeyboardAvoidingView keyboardVerticalOffset={64} behavior="padding">
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <View style={styles.photoIcon}>
              <TouchableItem onPress={() => this._launchCamera()}>
                {photoIcon}
              </TouchableItem>
            </View>
            <TextInput
              style={styles.input}
              ref={input => (this.textInput = input)}
              placeholder="Tagebucheintrag erstellen"
              returnKeyType="done"
              underlineColorAndroid="transparent"
              onSubmitEditing={event =>
                this._submit(event.nativeEvent.text)}
            />
          </View>
          <TouchableItem onPress={() => this._deleteItems()}>
            <View>
              <SimpleLineIcons
                name="trash"
                size={24}
                color="deepskyblue"
              />
            </View>
          </TouchableItem>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    borderColor: 'deepskyblue',
    borderRadius: 8,
    borderWidth: 1,
    margin: 5,
    paddingHorizontal: 5
  },
  input: {
    flex: 1,
    height: 40
  },
  photoIcon: {
    alignSelf: 'center',
    marginLeft: 5,
    marginRight: 15
  },
  imagePreview: {
    width: 24,
    height: 24
  }
});
