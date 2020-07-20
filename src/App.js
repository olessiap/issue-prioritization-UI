import React from 'react';
import RepoIssues from "./components/RepoIssues"
import TokenInput from "./components/TokenInput"
import Repos from "./components/Repos"

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={TokenInput} /> 
          {/* <Route exact path="/repos/:repo_id" component={RepoIssues} /> */}
          <Route path="/repos" component={Repos} />
        </Switch>
      </Router>
    </>
  )
}

export default App;
