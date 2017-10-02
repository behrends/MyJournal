import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import JournalItems from './js/components/JournalItems';
import JournalItemInput from './js/components/JournalItemInput';

import Store from './js/Store';

export default class App extends Component {
  state = { items: [] };

  componentWillMount() {
    this._refreshItems();
  }

  _refreshItems = async () => {
    const items = await Store.loadItems();
    this.setState({ items });
  };

  _getSectionTitleFromDate(date) {
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();
    return `${day}.${month}.${year}`;
  }

  _getItemsWithSections(items) {
    if (items.length === 0) return [];

    // Datenstruktur für Sections mit Eintrag initialisieren
    let sectionTitle = this._getSectionTitleFromDate(items[0].date);
    let sections = [{ data: [], title: sectionTitle }];
    items.forEach(item => {
      sectionTitle = this._getSectionTitleFromDate(item.date);
      let lastSection = sections[sections.length - 1];

      // trage item in section data ein, falls item am gleichen Tag
      if (lastSection.title == sectionTitle) {
        lastSection.data.push(item);
      } else {
        // neue Section anhängen, falls item an anderem Tag
        sections.push({ data: [item], title: sectionTitle });
      }
    });
    return sections;
  }

  _addItem(item) {
    let { items } = this.state;
    // Neuen Eintrag am Anfang der Liste eintragen und speichern
    item.date = new Date().getTime();
    items = [item, ...items];
    this.setState({ items: items });
    Store.saveItems(items);
  }

  render() {
    const sections = this._getItemsWithSections(this.state.items);
    return (
      <View style={styles.container}>
        <JournalItems items={sections} />
        <JournalItemInput
          onSubmit={item => this._addItem(item)}
          refresh={() => this.setState({ items: [] })}
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
