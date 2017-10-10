import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class PhotosScreen extends Component {
  _getPhotos(items) {
    return items.map(item => (
      <Image
        style={styles.photo}
        source={{ uri: item.photo }}
        resizeMode="cover"
        key={item.date}
      />
    ));
  }

  render() {
    const items = this.props.screenProps.items.filter(
      item => item.photo !== null
    );

    if (items.length === 0)
      return (
        <View style={styles.noItems}>
          <Text style={styles.infoText}>Keine Fotos im Tagebuch.</Text>
        </View>
      );

    return <ScrollView>{this._getPhotos(items)}</ScrollView>;
  }
}

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  noItems: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  infoText: {
    color: 'darkslategray',
    fontSize: 22,
    fontWeight: '300'
  },
  photo: {
    width: width,
    height: width,
    marginBottom: 2
  }
});
