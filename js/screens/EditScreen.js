import React, { Component } from 'react';
import { Image, StyleSheet, TextInput, View } from 'react-native';

import { SimpleLineIcons } from '@expo/vector-icons';
import { ImagePicker } from 'expo';

import TouchableItem from '../components/TouchableItem';

export default class EditScreen extends Component {
  state = { item: this.props.navigation.state.params.item };

  _launchCamera = async () => {
    const result = await ImagePicker.launchCameraAsync();
    if (!result.cancelled) {
      const { item } = this.state;
      item.photo = result.uri;
      this.setState({ item: item });
    }
    this.textInput.focus();
  };

  componentWillUnmount() {
    this.props.screenProps.onSubmit(this.state.item);
  }

  render() {
    const { item } = this.state;
    const photoIcon = item.photo ? (
      <Image style={styles.imagePreview} source={{ uri: item.photo }} />
    ) : (
      <SimpleLineIcons name="camera" size={48} color="deepskyblue" />
    );
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          ref={input => (this.textInput = input)}
          autoFocus={true}
          multiline={true}
          underlineColorAndroid="transparent"
          onChangeText={text => {
            item.text = text;
            this.setState({ item: item });
          }}
          value={item.text}
        />
        <View style={styles.photoIcon}>
          <TouchableItem onPress={() => this._launchCamera()}>
            {photoIcon}
          </TouchableItem>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  input: {
    fontSize: 16,
    height: '40%',
    textAlignVertical: 'top'
  },
  photoIcon: {
    alignSelf: 'center',
    marginLeft: 5,
    marginRight: 15
  },
  imagePreview: {
    width: 48,
    height: 48
  }
});
