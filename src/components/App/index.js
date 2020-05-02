// == Import npm
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Home from '../Home';


// == Import
// import reactLogo from './react-logo.svg';
import './styles.css';

// == Composant
const App = () => {
  const dispatch = useDispatch();

  return (
    <div className="app">
      <Home />
    </div>
  );
};

// == Export
export default App;
