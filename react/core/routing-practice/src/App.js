
import './App.css';
import { useParams } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';

const Home = (props) => {
  return (
    <div>
      <h1> Welcome!</h1>
    </div>
  )
}

const Params = (props) => {
  const { word, color, bgcolor } = useParams();
  return (
    <div>
      {

        isNaN(word) ?
          <h1 style={

            color ?
              { color: color, backgroundColor: bgcolor }
              : null
          }>
            This is a word: {word}
          </h1>
          :
          <h1>
            This is a number: {word}
          </h1>
      }
    </div>

  )
}




function App() {


  return (
    <div className="App">
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/:word/:color/:bgcolor' element={<Params />} />
        <Route path='/:word' element={<Params />} />
      </Routes>
    </div>
  );
}

export default App;
