import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import EditUser from './EditUser';
import Home from './Home';
import Main from './Main';
import NoMatch from './NoMatch';
import PasswordRecover from './PasswordRecover';
import RegisterUser from './RegisterUser';


class App extends React.Component {
  render() {
    return (

      <React.Fragment>

        <Router>
          <Switch>

            <Route exact={true} path="/" render={(props) => <Home {...props} />} />
            <Route exact={true} path="/home" render={(props) => <Home {...props} />} />
            <Route exact={true} path="/register-user" render={(props) => <RegisterUser {...props} />} />
            <Route exact={true} path="/password-recover" render={(props) => <PasswordRecover {...props} />} />

            <Route exact={true} path="/main" render={(props) => <Main {...props} />} />
            <Route exact={true} path="/edit-user" render={(props) => <EditUser {...props} />} />

            <Route path="*" component= { NoMatch }/>
            
          </Switch>
        </Router>
        
      </React.Fragment>
    );
  }
}

export default App;
