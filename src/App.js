import { BrowserRouter, Route, } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import TeamList from './TeamList'
import TeamMatches from './TeamMatches'
import './App.css';
import PageNotFound from './PageNotFound'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<div className="TeamList"><TeamList /></div>} />
        <Route exact path='/team-matches/:id' element={<div className="hey"><TeamMatches /></div>} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
