import React from 'react';
import RepoIssues from "./components/RepoIssues"
import TokenInput from "./components/TokenInput"
import Repos from "./components/Repos"
import {Helmet} from "react-helmet";

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

function App() {
  return (
    <>
      <Router>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Routable Issue Priority</title>
        <link rel="icon" type="image/png" href="https://s3-us-west-2.amazonaws.com/routable/favicon/favicon-16x16.png" sizes="16x16" />
      </Helmet>
        <Switch>
          <Route exact path="/" component={TokenInput} /> 
          <Route exact path="/repos/:repo_id" component={RepoIssues} />
          <Route path="/repos" component={Repos} />
        </Switch>
      </Router>
    </>
  )
}

export default App;
