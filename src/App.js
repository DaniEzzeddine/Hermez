import React, { Component } from 'react';
import Header from 'Header';
import ActiveMailingList from 'ActiveMailingList';

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <Header />
        < ActiveMailingList />
      </div>
    );
  }
}

export default App;
