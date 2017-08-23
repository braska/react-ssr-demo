import React from 'react';
import { renderToString } from 'react-dom/server';
import App from 'app';

export default () => {
  return renderToString(<App />);
};
