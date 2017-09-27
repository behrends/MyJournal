import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import JournalItems from './js/components/JournalItems';
import JournalItemInput from './js/components/JournalItemInput';

const journalItems = [];

export default class App extends Component {
  state = { items: journalItems };

  _addItem(text, photo) {
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
    const newItem = { text: text, photo: photo, date: now.getTime() };
    head.data = [newItem, ...head.data];
    items = [head, ...tail];
    this.setState({ items });
  }

  render() {
    return (
      <View style={styles.container}>
        <JournalItems items={this.state.items} />
        <JournalItemInput
          onSubmit={(text, photo) => this._addItem(text, photo)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
