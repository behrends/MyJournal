import React, { Component } from 'react';
import {
  Platform,
  SectionList,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View
} from 'react-native';

const TouchableItem =
  Platform.OS === 'ios' ? TouchableOpacity : TouchableNativeFeedback;

export default class JournalItems extends Component {
  render() {
    if (this.props.items.length === 0)
      return (
        <View style={styles.noItems}>
          <Text style={styles.infoText}>Keine Einträge im Tagebuch</Text>
        </View>
      );

    return (
      <SectionList
        style={styles.list}
        sections={this.props.items}
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
  list: {
    marginTop: 24
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
