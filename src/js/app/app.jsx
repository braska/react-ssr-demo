import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomeContainer from 'containers/HomeContainer';
import Redirect from 'components/Redirect';
import PageNotFound from 'components/PageNotFound';

const App = () => (
  <Switch>
    <Route path="/" exact component={HomeContainer} />
    <Redirect from="/redirect-demo" to="/" />
    <Route component={PageNotFound} />
  </Switch>
);

export default App;
