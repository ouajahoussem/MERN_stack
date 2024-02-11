import './App.css';
import CreateProduct from './components/CreateProduct';
import {Routes, Route} from "react-router-dom"


function App() {
  return (
    <div className="App">
      <h1>Product Manager</h1>
      <hr/>
      <Routes>
        <Route path="/products" element={<CreateProduct />} />
      </Routes>
      
    </div>
  );
}

export default App;
