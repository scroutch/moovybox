// == Import npm
import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router';

// == Import
import './styles.css';
import SignIn from 'src/components/SignIn';
import Move from 'src/components/Move';
import SignUp from 'src/components/SignUp';
import ResetPassword from 'src/components/ResetPassword';
import Profile from 'src/components/Profile';
import Contact from '../Contact';


// == Composant
const App = () => {
  const nickname = useSelector((state) => state.nickname);

  return (
    <div className="app">
      <Switch>
        <Route exact path="/signin">
          <SignIn />
        </Route>
        <Route
          exact
          path="/signin"
          render={() => {
            if (nickname === '') {
              return <Redirect to="/signin" />;
            }
            return <Move />;
          }}
        />
        <Route exact path="/signup">
          <SignUp />
        </Route>
        <Route exact path="/signup">
          <Profile />
        </Route>
        <Route exact path="/ResetPassword">
          <ResetPassword />
        </Route>
        <Route exact path="/contact">
          <Contact />
        </Route>
        <Route>404</Route>
      </Switch>
    </div>
  );
};

// == Export
export default App;
