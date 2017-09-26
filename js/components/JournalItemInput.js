import React, { Component } from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  View
} from 'react-native';

export default class JournalItemInput extends Component {
  _submit(text) {
    this.textInput.clear();
    this.props.onSubmit(text);
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding">
        <View style={styles.inputContainer}>
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
    borderColor: 'deepskyblue',
    borderRadius: 8,
    borderWidth: 1,
    margin: 5,
    paddingHorizontal: 5
  },
  input: {
    height: 40
  }
});
