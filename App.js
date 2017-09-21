import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Keine Einträge im Tagebuch</Text>
        <TextInput
          style={styles.input}
          placeholder="Tagebucheintrag erstellen"
          returnKeyType="done"
          onSubmitEditing={event => console.log(event.nativeEvent.text)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  input: {
    height: 40
  }
});
