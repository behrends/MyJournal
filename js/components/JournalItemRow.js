import React, { Component } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import TouchableItem from './TouchableItem';

export default class JournalItemRow extends Component {
  render() {
    const { item } = this.props;
    const { text, location, weather } = item;
    const date = new Date(item.date);
    const minutes =
      (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
    const time = `${date.getHours()}:${minutes}`;
    const photo = item.photo ? (
      <Image style={styles.image} source={{ uri: item.photo }} />
    ) : null;

    return (
      <TouchableItem onPress={this.props.onPress}>
        <View style={styles.container}>
          {photo}
          <View style={styles.itemText}>
            <Text numberOfLines={3}>{text}</Text>
            <Text style={styles.time}>
              {`${location || ''}  ${weather || ''}    ${time}`}
            </Text>
          </View>
        </View>
      </TouchableItem>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 5,
    paddingVertical: 3,
    minHeight: 50
  },
  image: {
    width: 70,
    height: 70,
    marginRight: 5
  },
  itemText: {
    flex: 1,
    justifyContent: 'space-between'
  },
  time: {
    color: 'gray',
    fontSize: 11,
    fontWeight: '100',
    alignSelf: 'flex-end'
  }
});
