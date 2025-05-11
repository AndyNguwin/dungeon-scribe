import './App.css';
import RoleplayNotes from './RoleplayNotes';
import LoreNotes from './LoreNotes';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<RoleplayNotes> </RoleplayNotes>}> </Route>
        <Route path='lore-build' element={<LoreNotes></LoreNotes>}></Route>
      </Routes>
    </Router>
  )
  
}

export default App;
