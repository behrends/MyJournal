import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text
} from 'react-native';

export default class ItemScreen extends Component {
  render() {
    // item wird durch navigate() an diesen Screen geliefert
    const item = this.props.navigation.state.params.item;
    const photo = item.photo ? (
      <Image
        style={styles.photo}
        source={{ uri: item.photo }}
        resizeMode="cover"
      />
    ) : null;

    return (
      <ScrollView>
        {photo}
        <Text style={styles.text}>{item.text}</Text>
      </ScrollView>
    );
  }
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  photo: {
    width: width,
    height: width
  },
  text: {
    fontSize: 16,
    padding: 15
  }
});
