import React, { Component } from 'react';
import { Image, StyleSheet, TextInput, View } from 'react-native';

import { SimpleLineIcons } from '@expo/vector-icons';
import { ImagePicker, Location, Permissions } from 'expo';

import TouchableItem from '../components/TouchableItem';

export default class EditScreen extends Component {
  state = { item: this.props.navigation.state.params.item };

  _getWeather = async item => {
    try {
      const { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return null;
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
      item.location = name;
      item.weather = `${Math.floor(main.temp)}˚C ${
        weather[0].description
      }`;
      this.setState({ item: item });
    } catch (error) {
      console.log('Error fetching weather', error);
    }
  };

  _hasCameraPermissions = async () => {
    let permission = await Permissions.askAsync(Permissions.CAMERA);
    if (permission.status !== 'granted') {
      console.log('Permission to camera was denied');
      return false;
    }
    permission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (permission.status !== 'granted') {
      console.log('Permission to camera roll was denied');
      return false;
    }
    return true;
  };

  _launchCamera = async () => {
    if (this._hasCameraPermissions()) {
      const result = await ImagePicker.launchCameraAsync();
      if (!result.cancelled) {
        const { item } = this.state;
        item.photo = result.uri;
        this.setState({ item: item });
      }
    }
    this.textInput.focus();
  };

  componentWillMount() {
    const { item } = this.state;
    if (item.date === null) this._getWeather(item);
  }

  componentWillUnmount() {
    this.props.screenProps.onSubmit(this.state.item);
  }

  render() {
    const { item } = this.state;
    const photoIcon = item.photo ? (
      <Image style={styles.imagePreview} source={{ uri: item.photo }} />
    ) : (
      <SimpleLineIcons name="camera" size={48} color="deepskyblue" />
    );
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          ref={input => (this.textInput = input)}
          autoFocus={true}
          multiline={true}
          underlineColorAndroid="transparent"
          onChangeText={text => {
            item.text = text;
            this.setState({ item: item });
          }}
          value={item.text}
        />
        <View style={styles.photoIcon}>
          <TouchableItem onPress={() => this._launchCamera()}>
            {photoIcon}
          </TouchableItem>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  input: {
    fontSize: 16,
    height: '40%',
    textAlignVertical: 'top'
  },
  photoIcon: {
    alignSelf: 'center',
    marginLeft: 5,
    marginRight: 15
  },
  imagePreview: {
    width: 48,
    height: 48
  }
});
