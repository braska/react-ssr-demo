import React from 'react';
import Status from 'components/Status';

const PageNotFound = () => (
  <Status code={404}>
    <h1>404 &mdash; страница не найдена</h1>
  </Status>
);

export default PageNotFound;
