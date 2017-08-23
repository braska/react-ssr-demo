import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomeContainer from 'containers/HomeContainer';
import Redirect from 'components/Redirect';
import PageNotFound from 'components/PageNotFound';
import SecondPage from 'components/SecondPage';

const App = () => (
  <Switch>
    <Route path="/" exact component={HomeContainer} />
    <Route path="/second-page" component={SecondPage} />
    <Redirect from="/redirect-demo" to="/" />
    <Route component={PageNotFound} />
  </Switch>
);

export default App;
