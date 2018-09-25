import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import React from 'react'

import Dashboard from './Dashboard/Loadable'

export default () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Dashboard} />
    </Switch>
  </Router>
)
