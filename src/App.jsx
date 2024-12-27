import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Main from './components/Main';
import Header from './components/Header';
import './App.css';

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xl">
        <Header />
        <Main />
      </Container>
    </React.Fragment>
  );
}

export default App;