import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const theme = createMuiTheme({
  typography:{
    fontFamily: [
      'Poppins',
      'sans-serif',
    ].join(','),
  }
});

ReactDOM.render(
  <React.StrictMode>
  <Router>
  <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
