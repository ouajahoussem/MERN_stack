
import './App.css';
import PersonCard from './components/PersonCard';

function App() {
  return (
    <div className="App">
      
      <PersonCard lastname={"Doe"} firstname={"Jane"} age={45} hair_color={"Black"}/>
      <PersonCard lastname={"Smith"} firstname={"John"} age={88} hair_color={"Brown"}/>
      <PersonCard lastname={"Fillmore"} firstname={"Millard"} age={50} hair_color={"Brown"}/>
      <PersonCard lastname={"Smith"} firstname={"Maria"} age={62} hair_color={"Brown"}/>
    </div>
  );
}

export default App;
