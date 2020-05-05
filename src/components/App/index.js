// == Import npm
import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router';

// == Import
// import reactLogo from './react-logo.svg';
import './styles.css';
import SignIn from 'src/components/SignIn';
import Move from 'src/components/Move';
import SignUp from 'src/components/SignUp';
import ResetPassword from 'src/components/ResetPassword';
import Profile from 'src/components/Profile';


// == Composant
const App = () => {
  const email = useSelector((state) => state.email);

  return (
    <div className="app">
      <Switch>
        <Route exact path="/">
          <SignIn />
        </Route>
        <Route
          exact
          path="/move"
          render={() => {
            if (email === '') {
              return <Redirect to="/" />;
            }
            return <Move />;
          }}
        />
        <Route exact path="/signup">
          <SignUp />
        </Route>
        <Route exact path="/profile">
          <Profile />
        </Route>
        <Route exact path="/ResetPassword">
          <ResetPassword />
        </Route>
        <Route>404</Route>
      </Switch>
    </div>
  );
};

// == Export
export default App;
