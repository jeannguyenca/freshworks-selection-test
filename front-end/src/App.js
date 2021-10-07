import * as React from 'react'
import Link from '@mui/material/Link'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom"

import Form from './pages/Form'
import Data from './pages/Data'

const LinkBehavior = React.forwardRef((props, ref) => (
  <NavLink ref={ref} {...props} activeStyle={{
    fontWeight: "bold",
  }} />
));

const App = () => {
  return (
    <Router>
      <Container disableGutters>
        <Box component="nav" sx={{
          width: '100%',
          height: 30,
          borderBottom: '1px solid black',
          typography: 'body1',
          '& > :not(style) + :not(style)': {
            ml: 2,
          },
          p: 2
        }}>
          <Link component={LinkBehavior} exact to="/">Form</Link>
          <Link component={LinkBehavior} to="/data">Data</Link>
        </Box>

        <Switch>
          <Route path="/data">
            <Data />
          </Route>
          <Route exact path="/">
            <Form />
          </Route>
        </Switch>
      </Container>
    </Router >
  );
}

export default App;
