import React from 'react';
import Header from './Header/Header';
import Left from './left-sidebar/Left';
import Right from './right-sidebar/Right';
import Middle from './Main/Middle';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header/>
      <Left/>
      <Right/>
      <Middle/>


    </div>
  );
}

export default App;
