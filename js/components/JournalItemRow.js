import React, { Component } from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  View
} from 'react-native';

const TouchableItem =
  Platform.OS === 'ios' ? TouchableOpacity : TouchableNativeFeedback;

export default class JournalItemRow extends Component {
  render() {
    const { item } = this.props;
    const date = new Date(item.date);
    const minutes =
      (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
    const time = `${date.getHours()}:${minutes}`;

    return (
      <TouchableItem>
        <View style={styles.container}>
          <Image style={styles.image} source={require('../../foto.png')} />
          <View style={styles.itemText}>
            <Text numberOfLines={3}>{item.text}</Text>
            <Text style={styles.time}>{time}</Text>
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
    paddingVertical: 3
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
