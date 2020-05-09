import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './components/Home';
import Main from './components/Main';
import QRScreen from './components/QRScreen';
import RegisterClass from './components/RegisterClass';
import RegisterUser from './components/RegisterUser';
import Navbar from './components/CustomNavbar';


function App() {
    return (
      <Router>
        <div>
          {/*<Navbar />*/}
          <Route exact path="/" component={Home} />
          <Route path="/main" component={Main} />
          <Route path="/QRScreen" component={QRScreen} />
          <Route path="/RegisterClass" component={RegisterClass} />
          <Route path="/RegisterUser" component={RegisterUser} />
        </div>
      </Router>
    );
}

export default App;
