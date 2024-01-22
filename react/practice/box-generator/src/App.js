import {useState} from 'react';
import './App.css';
import Form from './components/Form'
import Display from './components/Display'

function App() {
  const [boxes,setBoxes] = useState([])

  const addBoxtoBoxes =(oneBox)=>{
    console.log("hello")
    setBoxes([...boxes,oneBox])
  }


  return (
    <div className="App">
      
      <Form addBoxtoBoxes={addBoxtoBoxes}/>
      <Display boxes={boxes}/>
    </div>
  );
}

export default App;
