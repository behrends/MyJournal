import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';

import TouchableItem from '../components/TouchableItem';

export default class ItemScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { navigate, state } = navigation;
    return {
      headerRight: (
        <TouchableItem
          onPress={() =>
            navigation.navigate('Edit', { item: state.params.item })}
        >
          <View>
            <Text style={styles.headerAction}>Bearbeiten</Text>
          </View>
        </TouchableItem>
      )
    };
  };
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
  headerAction: {
    padding: 10,
    color: 'deepskyblue'
  },
  photo: {
    width: width,
    height: width
  },
  text: {
    fontSize: 16,
    padding: 15
  }
});
