import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Layout } from 'common';
import HomePage from 'pages/home';
import TaskPage from "./pages/task";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Layout>
            <HomePage />
          </Layout>
        </Route>
        <Route path="/task/:id" exact>
          <Layout>
            <TaskPage />
          </Layout>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

