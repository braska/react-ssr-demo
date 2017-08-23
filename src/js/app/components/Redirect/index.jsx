import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect as RouterRedirect } from 'react-router-dom';

const Redirect = ({ from, to, status }) => (
  <Route
    render={({ staticContext }) => {
      // there is no `staticContext` on the client, so
      // we need to guard against that here
      if (staticContext && status) {
        // eslint-disable-next-line
        staticContext.status = status;
      }
      return <RouterRedirect from={from} to={to} />;
    }}
  />
);

Redirect.propTypes = {
  from: PropTypes.string,
  to: PropTypes.string.isRequired,
  status: PropTypes.number,
};

Redirect.defaultProps = {
  from: undefined,
  status: undefined,
};

export default Redirect;
