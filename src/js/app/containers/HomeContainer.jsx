import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withDone } from 'react-router-server';
import { isPending, isComplete, hasFailed } from 'redux-saga-thunk';

import { LOAD_ITEMS, loadItems } from 'store/items/actions';
import Home from 'components/Home';

@withDone
@connect(state => ({
  loadingItemsIsPending: isPending(state, LOAD_ITEMS),
  loadingItemsIsComplete: isComplete(state, LOAD_ITEMS),
  loadingItemsHasFailed: hasFailed(state, LOAD_ITEMS),
  items: state.items.list,
}), { loadItems })
export default class HomeContainer extends Component {
  static propTypes = {
    loadingItemsIsPending: PropTypes.bool.isRequired,
    loadingItemsIsComplete: PropTypes.bool.isRequired,
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
    return (
      <Home {...this.props} />
    );
  }
}
