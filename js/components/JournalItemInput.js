import React, { Component } from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  View
} from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';

import TouchableItem from './TouchableItem';

export default class JournalItemInput extends Component {
  _submit(text) {
    this.textInput.clear();
    this.props.onSubmit(text);
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding">
        <View style={styles.inputContainer}>
          <View style={styles.photoIcon}>
            <TouchableItem>
              <SimpleLineIcons
                name="camera"
                size={24}
                color="deepskyblue"
              />
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
  }
});
