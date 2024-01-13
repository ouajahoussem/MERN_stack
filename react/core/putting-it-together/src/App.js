
import './App.css';
import PersonCard from './components/PersonCard';

function App() {
  const personArr =[
    {firstname:"Jane",lastname:"Doe",age:45, haircolor:"black"},
    {firstname:"John",lastname:"Smith", age:88, haircolor:"brown"}]
  const [personOne,personTwo] = personArr;
  return (
    <fieldset className="App">
      <legend>App.js</legend>
      <PersonCard person={personOne}/>
      <PersonCard person ={personTwo}/>
      
    </fieldset>
      
  );
}

export default App;
