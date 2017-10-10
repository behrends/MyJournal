import React, { Component } from 'react';
import AppNavigator from './js/AppNavigator';

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

  _addItem(item) {
    let { items } = this.state;
    item.date = new Date().getTime();
    items = [item, ...items];
    this.setState({ items: items });
    Store.saveItems(items);
  }

  render() {
    return (
      <AppNavigator
        screenProps={{
          items: this.state.items,
          refresh: this._refreshItems,
          onSubmit: item => this._addItem(item)
        }}
      />
    );
  }
}
