import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SectionList,
  StyleSheet,
  Text,
  TextInput,
  TouchableNativeFeedback,
  TouchableOpacity,
  View
} from 'react-native';

const journalItems = [
  {
    data: [
      {
        text: 'Umgang mit SectionList in React Native gelernt',
        date: 1
      }
    ],
    title: '29.7.2017'
  },
  {
    data: [
      { text: 'Einkauf im Supermarkt', date: 2 },
      { text: 'Wochenendausflug geplant', date: 3 }
    ],
    title: '28.7.2017'
  }
];

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
    const TouchableItem =
      Platform.OS === 'ios' ? TouchableOpacity : TouchableNativeFeedback;
    let content = <Text>Keine Einträge im Tagebuch</Text>;
    if (this.state.items.length > 0) {
      content = (
        <SectionList
          style={styles.list}
          sections={this.state.items}
          renderItem={({ item }) => (
            <TouchableItem>
              <View>
                <Text>{item.text}</Text>
              </View>
            </TouchableItem>
          )}
          renderSectionHeader={({ section }) => (
            <Text style={styles.listHeader}>{section.title}</Text>
          )}
          keyExtractor={item => item.date}
        />
      );
    }
    return (
      <View style={styles.container}>
        {content}
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
  list: {
    marginTop: 24
  },
  input: {
    height: 40
  },
  listHeader: {
    backgroundColor: 'darkgray'
  }
});
