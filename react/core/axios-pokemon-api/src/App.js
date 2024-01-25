import axios from 'axios';
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [pokemon ,setPokemon] = useState([]);

  useEffect(()=> {
    axios.get("https://pokeapi.co/api/v2/pokemon?limit=807")
    .then(res =>{
      console.log(res.data.results)
      setPokemon(res.data.results)
    })
    .catch(err=>{
      console.log(err)
    })
  },[]);

  return (
    <div className="App">
      
      <ul>
        {
          pokemon.map((poke, index)=>{
            return <li key={index}>{poke.name}</li>
          })
        }
      </ul>
    </div>
  );
}

export default App;
