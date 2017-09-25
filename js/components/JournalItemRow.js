import React, { Component } from 'react';
import {
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

    return (
      <TouchableItem>
        <View>
          <Text>{item.text}</Text>
        </View>
      </TouchableItem>
    );
  }
}
