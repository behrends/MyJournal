import React, { Component } from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native';

import JournalItemRow from './JournalItemRow';

export default class JournalItems extends Component {
  state = { scrollEnabled: true };

  render() {
    if (this.props.items.length === 0)
      return (
        <View style={styles.noItems}>
          <Text style={styles.infoText}>Keine Einträge im Tagebuch</Text>
        </View>
      );

    return (
      <SectionList
        bounces={false}
        sections={this.props.items}
        scrollEnabled={this.state.scrollEnabled}
        renderItem={({ item }) => (
          <JournalItemRow
            item={item}
            onPress={() => this.props.onPress(item)}
            deleteItem={() => this.props.deleteItem(item)}
            toggleScrolling={flag =>
              this.setState({ scrollEnabled: flag })}
          />
        )}
        renderSectionHeader={({ section }) => (
          <Text style={styles.listHeader}>{section.title}</Text>
        )}
        keyExtractor={item => item.date}
        ItemSeparatorComponent={() => (
          <View style={styles.listSeparator} />
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  infoText: {
    color: 'darkslategray',
    fontSize: 22,
    fontWeight: '300'
  },
  noItems: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  listHeader: {
    color: 'gray',
    backgroundColor: 'lightcyan',
    textAlign: 'center'
  },
  listSeparator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'lightblue'
  }
});
