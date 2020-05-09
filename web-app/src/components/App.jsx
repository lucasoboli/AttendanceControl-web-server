import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BackgroundImagePath from '../images/background2.jpg';

import Home from './Home';
import Main from './Main';
import NoMatch from './NoMatch';
import QRScreen from './QRScreen';
import RegisterClass from './RegisterClass';
import RegisterUser from './RegisterUser';
//*import CustomNavbar from './CustomNavbar';


const BackgroundImage = {
    position: 'fixed',
    backgroundSize: 'auto',
    backgroundPosition: 'center',
    opacity: '0.6',
    zIndex: '-1'
};


class App extends React.Component {
  render() {
    return (

      <React.Fragment>
        {/*<CustomNavbar />*/}
        <img src={BackgroundImagePath} alt="/" style={BackgroundImage} />
        <Router>
          <Switch>
            <Route exact path="/" component={ Home } />
            <Route path="/home" component={ Home } />
            <Route path="/main" component={ Main } />
            <Route path="/qrscreen" component={ QRScreen } />
            <Route path="/registerclass" component={ RegisterClass } />
            <Route path="/registeruser" component={ RegisterUser } />
            <Route component= { NoMatch }/>
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
