import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withDone } from 'react-router-server';
import { isPending, isComplete, hasFailed } from 'redux-saga-thunk';

import { LOAD_ITEMS, loadItems } from 'store/items/actions';

import styles from './styles.css';

@withDone
@connect(state => ({
  loadingItemsIsPending: isPending(state, LOAD_ITEMS),
  loadingItemsIsComplete: isComplete(state, LOAD_ITEMS),
  loadingItemsHasFailed: hasFailed(state, LOAD_ITEMS),
  items: state.items.list,
}), { loadItems })
export default class App extends Component {
  static propTypes = {
    loadingItemsIsPending: PropTypes.bool.isRequired,
    loadingItemsIsComplete: PropTypes.bool.isRequired,
    loadingItemsHasFailed: PropTypes.bool.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    })).isRequired,
    done: PropTypes.func.isRequired,
    loadItems: PropTypes.func.isRequired,
  };

  componentWillMount() {
    if (
      !this.props.loadingItemsIsPending &&
      !this.props.loadingItemsIsComplete
    ) {
      this.props.loadItems().then(this.props.done, this.props.done);
    }
  }

  render() {
    if (this.props.loadingItemsIsPending) {
      return 'Loading...';
    }

    if (this.props.loadingItemsHasFailed) {
      return 'Fail :(';
    }

    return [
      <h1 className={styles.heading} key="heading">This is SSR demo</h1>,
      <ul key="item-list">
        {this.props.items.map(item => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>,
    ];
  }
}
