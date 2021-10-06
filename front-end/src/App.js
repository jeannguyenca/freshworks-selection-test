import * as React from 'react'
import Link from '@mui/material/Link'
import Container from '@mui/material/Container'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"

import Form from './pages/Form'

const App = () => {
  fetch("http://localhost:5000").then(res => res.json()).then(json => {
    console.log(json)
  })
  return (
    <Router>
      <Container>
        <nav>
          <Link to="/">Form</Link>
          <Link to="/data">Data</Link>
        </nav>

        <Switch>
          <Route path="/">
            <Form />
          </Route>
          <Route path="/data">
            <div />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
