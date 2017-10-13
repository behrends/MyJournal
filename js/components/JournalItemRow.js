import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  PanResponder,
  StyleSheet,
  Text,
  View
} from 'react-native';

import TouchableItem from './TouchableItem';

export default class JournalItemRow extends Component {
  state = { backgroundColor: 'transparent' };

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => {
        this.setState({ backgroundColor: 'yellow' });
      },
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dx < -(Dimensions.get('window').width / 3)) {
          this.setState({ backgroundColor: 'red' });
        } else {
          this.setState({ backgroundColor: 'yellow' });
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        this.setState({ backgroundColor: 'transparent' });
      },
      onPanResponderTerminate: (evt, gestureState) => {
        this.setState({ backgroundColor: 'transparent' });
      }
    });
  }

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
      <View {...this._panResponder.panHandlers}>
        <TouchableItem onPress={this.props.onPress}>
          <View
            style={[
              styles.container,
              { backgroundColor: this.state.backgroundColor }
            ]}
          >
            {photo}
            <View style={styles.itemText}>
              <Text numberOfLines={3}>{text}</Text>
              <Text style={styles.time}>
                {`${location || ''}  ${weather || ''}    ${time}`}
              </Text>
            </View>
          </View>
        </TouchableItem>
      </View>
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
