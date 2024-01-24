import { useState } from 'react';
import './App.css';

function App() {
  const [pokemon, setPokemon] = useState([])

  const fetchHeroes = () => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=807")
      .then(res => {
        console.log(res)
        return res.json()

      })
      .then(actualRes => {
        console.log(actualRes)
        setPokemon(actualRes.results)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div className="App">
      <button onClick={fetchHeroes}> Fetch Pokemons</button> <br />
      
      <ul>
        {
          pokemon.map((pok) => {
            return <li>{pok.name}</li>
          })
        }
      </ul>







    </div>
  );
}

export default App;
