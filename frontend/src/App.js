import React from 'react';
import Header from './Header/Header';
import Left from './left-sidebar/Left';
import Right from './right-sidebar/Right';
import Middle from './Main/Middle';
import './App.css';
import AddUser from './Users/AddUser';
import AddRestaurant from './Restuarant management/AddRestaurant';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route
        path='/addrestaurant'
        element = {
          <>
            <AddRestaurant/>
          </>
        }
        />
        <Route
        path='/addUser'
        element = {
          <>
            <AddUser/>
          </>
        }
        />
          <Route
            path='/'
            element={
              <>
                <Header/>
                <Left/>
                <Right/>
                <Middle/>
              </>
            }
          />
        </Routes>
      
      </Router>

    </div>
  );
}

export default App;
