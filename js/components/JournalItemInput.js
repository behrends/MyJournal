import React, { Component } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  View
} from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import { ImagePicker } from 'expo';

import TouchableItem from './TouchableItem';

export default class JournalItemInput extends Component {
  state = { photo: null };

  _launchCamera = async () => {
    const result = await ImagePicker.launchCameraAsync();
    if (!result.cancelled) {
      this.setState({ photo: result.uri });
      this.textInput.focus();
    }
  };

  _submit(text) {
    this.textInput.clear();
    this.props.onSubmit(text, this.state.photo);
    this.setState({ photo: null });
  }

  render() {
    const photoIcon = this.state.photo ? (
      <Image
        style={styles.imagePreview}
        source={{ uri: this.state.photo }}
      />
    ) : (
      <SimpleLineIcons name="camera" size={24} color="deepskyblue" />
    );
    return (
      <KeyboardAvoidingView behavior="padding">
        <View style={styles.inputContainer}>
          <View style={styles.photoIcon}>
            <TouchableItem onPress={() => this._launchCamera()}>
              {photoIcon}
            </TouchableItem>
          </View>
          <TextInput
            style={styles.input}
            ref={input => (this.textInput = input)}
            placeholder="Tagebucheintrag erstellen"
            returnKeyType="done"
            underlineColorAndroid="transparent"
            onSubmitEditing={event => this._submit(event.nativeEvent.text)}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    borderColor: 'deepskyblue',
    borderRadius: 8,
    borderWidth: 1,
    margin: 5,
    paddingHorizontal: 5
  },
  input: {
    flex: 1,
    height: 40
  },
  photoIcon: {
    alignSelf: 'center',
    marginLeft: 5,
    marginRight: 15
  },
  imagePreview: {
    width: 24,
    height: 24
  }
});
