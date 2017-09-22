import React from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import JournalItems from './JournalItems';

const journalItems = [];

export default class App extends React.Component {
  state = { items: journalItems };

  _addItem(text) {
    let { items } = this.state;
    let [head, ...tail] = items;

    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    const today = `${day}.${month}.${year}`;

    if (head === undefined || head.title !== today) {
      // ggf. neuer Abschnitt für heutiges Datum
      head = { data: [], title: today };
      tail = items;
    }
    const newItem = { text: text, date: now.getTime() };
    head.data = [newItem, ...head.data];
    items = [head, ...tail];
    this.setState({ items });
    this.textInput.clear();
  }

  render() {
    return (
      <View style={styles.container}>
        <JournalItems items={this.state.items} />
        <KeyboardAvoidingView behavior="padding">
          <TextInput
            style={styles.input}
            ref={input => (this.textInput = input)}
            placeholder="Tagebucheintrag erstellen"
            returnKeyType="done"
            onSubmitEditing={event =>
              this._addItem(event.nativeEvent.text)}
          />
        </KeyboardAvoidingView>
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
