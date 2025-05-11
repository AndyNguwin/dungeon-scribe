import './App.css';
import RoleplayNotes from './RoleplayNotes';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

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
