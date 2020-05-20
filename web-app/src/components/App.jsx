import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import CustomNavbar from './CustomNavbar';
import EditUser from './EditUser';
import Home from './Home';
import Main from './Main';
import NoMatch from './NoMatch';
import RegisterUser from './RegisterUser';


class App extends React.Component {
  render() {
    return (

      <React.Fragment>

        <Router>
          <CustomNavbar/>
          <Switch>
            <Route exact={true} path="/" component={ Home } />
            <Route path="/home" component={ Home } />
            <Route path="/main" component={ Main } />
            <Route path="/edit-user" component={ EditUser } />
            <Route path="/register-user" component={ RegisterUser } />
            <Route path="*" component= { NoMatch }/>
          </Switch>
        </Router>
        
      </React.Fragment>
    );
  }
}

export default App;
