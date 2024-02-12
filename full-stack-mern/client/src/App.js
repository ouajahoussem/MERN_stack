import './App.css';
import { Routes, Route } from "react-router-dom";
import CreateProduct from './components/CreateProduct';
import Main from './components/Main';
import OneProduct from './components/OneProduct';
import UpdateProduct from './components/UpdateProduct';


function App() {
  return (
    <div className="App">


      <Routes>
        <Route path="/products" element={<Main />} />
        <Route path="/products/create" element={<CreateProduct />} />
        <Route path="/products/:id" element={<OneProduct />} />
        <Route path="/products/:id/update" element={<UpdateProduct/>} />
      </Routes>

    </div>
  );
}

export default App;
