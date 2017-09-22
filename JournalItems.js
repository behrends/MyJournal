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
      return <Text>Keine Einträge im Tagebuch</Text>;

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
      />
    );
  }
}

const styles = StyleSheet.create({
  list: {
    marginTop: 24
  },
  listHeader: {
    backgroundColor: 'darkgray'
  }
});
