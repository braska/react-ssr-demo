import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './styles.css';

const Home = ({ loadingItemsIsPending, loadingItemsHasFailed, items }) => {
  if (loadingItemsIsPending) {
    return 'Loading...';
  }

  if (loadingItemsHasFailed) {
    return 'Fail :(';
  }

  return [
    <h1 className={styles.heading} key="heading">This is SSR demo</h1>,
    <ul key="item-list">
      {items.map(item => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>,
    <Link to="/second-page" key="link">Go to second page</Link>,
  ];
};

Home.propTypes = {
  loadingItemsIsPending: PropTypes.bool.isRequired,
  loadingItemsHasFailed: PropTypes.bool.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,
};

export default Home;
