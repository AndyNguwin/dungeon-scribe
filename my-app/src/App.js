import React from 'react';

import './App.css';
import ChatBox from './ChatBox';
import RoleplayNotes from './RoleplayNotes';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import axios from 'axios'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<RoleplayNotes> </RoleplayNotes>}> </Route>
      </Routes>
    </Router>
  )
  
}

export default App;
