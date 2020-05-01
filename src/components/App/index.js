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
import StickyFooter from 'src/components/modules/views/StickyFooter';

// == Composant
const App = () => {
  const nickname = useSelector((state) => state.nickname);

  return (
    <div className="app">
      <Switch>
        <Route exact path="/signin">
          <SignIn />
        </Route>
        <Route exact path="/sticky-footer">
          <StickyFooter />
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
        <Route>404</Route>
      </Switch>
    </div>
  );
};

// == Export
export default App;
