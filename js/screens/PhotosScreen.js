import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class PhotosScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text style={{ textAlign: 'center' }}>Fotos</Text>
      </View>
    );
  }
}
