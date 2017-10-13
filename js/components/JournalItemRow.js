import React, { Component } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  PanResponder,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { SimpleLineIcons } from '@expo/vector-icons';

import TouchableItem from './TouchableItem';

const WINDOW_WIDTH = Dimensions.get('window').width;

export default class JournalItemRow extends Component {
  state = {
    animSwipe: new Animated.Value(0),
    animHeight: new Animated.Value(75)
  };

  _cancelSwiping() {
    Animated.spring(this.state.animSwipe, { toValue: 0 }).start();
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dx < 5) {
          this.state.animSwipe.setValue(gestureState.dx);
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx < -(WINDOW_WIDTH / 3)) {
          Animated.sequence([
            Animated.spring(this.state.animSwipe, {
              toValue: -WINDOW_WIDTH,
              speed: 100
            }),
            Animated.timing(this.state.animHeight, {
              toValue: 0,
              duration: 50
            })
          ]).start(() => this.props.deleteItem());
        } else {
          this._cancelSwiping();
        }
      },
      onPanResponderTerminate: (evt, gestureState) => {
        this._cancelSwiping();
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
      <Animated.View
        {...this._panResponder.panHandlers}
        style={[{ height: this.state.animHeight }, styles.panContainer]}
      >
        <TouchableItem
          onPress={this.props.onPress}
          style={styles.touchableRow}
        >
          <Animated.View
            style={[
              { transform: [{ translateX: this.state.animSwipe }] },
              styles.container
            ]}
          >
            {photo}
            <View style={styles.itemText}>
              <Text numberOfLines={3}>{text}</Text>
              <Text style={styles.time}>
                {`${location || ''}  ${weather || ''}    ${time}`}
              </Text>
            </View>
          </Animated.View>
        </TouchableItem>
        <Animated.View
          style={[
            { transform: [{ translateX: this.state.animSwipe }] },
            styles.delete
          ]}
        >
          <SimpleLineIcons
            name="trash"
            size={24}
            color="white"
            style={{ paddingLeft: 20 }}
          />
        </Animated.View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  panContainer: {
    flexDirection: 'row'
  },
  touchableRow: {
    flex: 1
  },
  delete: {
    justifyContent: 'center',
    backgroundColor: 'orangered',
    width: WINDOW_WIDTH,
    marginRight: -WINDOW_WIDTH
  },
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
