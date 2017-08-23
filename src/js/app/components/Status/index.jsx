import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';


const Status = ({ code, children }) => (
  <Route
    render={({ staticContext }) => {
      if (staticContext) {
        // eslint-disable-next-line
        staticContext.status = code;
      }
      return children;
    }}
  />
);

Status.propTypes = {
  children: PropTypes.node,
  code: PropTypes.number.isRequired,
};

Status.defaultProps = {
  children: null,
};

export default Status;
