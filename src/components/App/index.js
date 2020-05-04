// == Import npm
import React from 'react';
import Contact from '../Contact';
import { useDispatch, useSelector } from 'react-redux';

// == Import
import './styles.css';

// == Composant
const App = () => {
  const dispatch = useDispatch();


  return (
    <div className="app">
      <Contact />
    </div>
  );
};

// == Export
export default App;
