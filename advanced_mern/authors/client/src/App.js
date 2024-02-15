import './App.css';
import { Routes, Route, Navigate} from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Create from './components/Create'
import Update from './components/Update'

function App() {
  return (
    <div className="App">
      <h1 className='mt-3'> Favorite Authors</h1>
      <Routes>
        <Route path='/' element={<Navigate to="/authors" />}/>
        <Route path='/authors' element={<Dashboard />} />
        <Route path='/authors/create' element={<Create/>}/>
        <Route path='/authors/:id/edit' element={<Update />}/> 
      </Routes>
    </div>
  );
}

export default App;
