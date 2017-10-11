import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class ItemScreen extends Component {
  render() {
    const item = { text: 'Ein Tagebucheintrag...' };
    return (
      <View style={styles.container}>
        <Text>{item.text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
