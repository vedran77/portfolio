import React from 'react';
import Main from './components/Main';
import Navbar from './components/Navbar';

class App extends React.Component {
  public render(): JSX.Element {
    return (
      <>
        <Navbar/>
        <Main/>
      </>
    )
  }
}

export default App;
