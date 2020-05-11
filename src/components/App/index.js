// == Import npm
import React from 'react';
import Home from '../Home';

import { useSelector } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router';

// == Import
import './styles.css';
import SignIn from 'src/components/SignIn';
import Move from 'src/components/Move';
import FormMove from 'src/components/FormMove';
import SignUp from 'src/components/SignUp';
import ResetPassword from 'src/components/ResetPassword';
import Profile from 'src/components/Profile';
import Contact from '../Contact';



// == Composant
const App = () => {

  const email = useSelector((state) => state.email);
  const password = useSelector((state) => state.password);

  return (
    <div className="app">
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/signin">
         <SignIn />
        </Route>
        {/* <Route
          exact
          path="/move"
          render={() => {
            if ((email === '')||(password === '')) {
              return <Redirect to="/" />;
            }
            return <Move />;
          }}
        /> */}
        <Route exact path="/signup">
          <SignUp />
        </Route>
        <Route exact path="/profile">
          <Profile />
        </Route>
        <Route exact path="/ResetPassword">
          <ResetPassword />
        </Route>
        <Route exact path="/move">
          <Move />
        </Route>
        <Route exact path="/create-move">
          <FormMove />
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
