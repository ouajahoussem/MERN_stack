import './App.css';
import {Routes, Route} from "react-router-dom"
import Planets from './components/Planets';
import People from './components/People';
import Form from './components/Form';

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="/planets/:id" element={<Planets/>}/>
          <Route path="/people/:id" element={<People/>}/>
          <Route path="/" element={<Form/>}/>
      </Routes>
    </div>
  );
}

export default App;
