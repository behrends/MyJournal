import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import JournalItems from '../components/JournalItems';

export default class JournalScreen extends Component {
  _getSectionTitleFromDate(date) {
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();
    return `${day}.${month}.${year}`;
  }

  _getItemsWithSections(items) {
    if (items.length === 0) return [];

    let sectionTitle = this._getSectionTitleFromDate(items[0].date);
    let sections = [{ data: [], title: sectionTitle }];
    items.forEach(item => {
      sectionTitle = this._getSectionTitleFromDate(item.date);
      let lastSection = sections[sections.length - 1];
      if (lastSection.title == sectionTitle) {
        lastSection.data.push(item);
      } else {
        sections.push({ data: [item], title: sectionTitle });
      }
    });
    return sections;
  }

  render() {
    const { navigate } = this.props.navigation;
    const { items, deleteItem } = this.props.screenProps;
    const sections = this._getItemsWithSections(items);
    return (
      <View style={styles.container}>
        <JournalItems
          items={sections}
          onPress={item => navigate('Item', { item: item })}
          deleteItem={deleteItem}
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
