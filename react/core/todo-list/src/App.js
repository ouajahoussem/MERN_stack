import {useState} from 'react'
import './App.css';
import Form from './components/Form'
import Display from './components/Display'

function App() {
  const [todolist,setTodolist] = useState([])


  const updateTodolist =(newTodo) =>{
    console.log("hello")
    setTodolist([...todolist,newTodo])
}
  const deleteButton = (idFromBelow)=>{
    const filteredtodos = todolist.filter((todo)=>{
      return todo.id !== idFromBelow
    })
    setTodolist(filteredtodos);
};
  const handleCompleted =(todoFromBelow)=>{
    let updateTodos = todolist.map((todo)=>{
      if (todo === todoFromBelow){
        let newTodo = {...todo}
        newTodo.isComplete = !newTodo.isComplete
        return newTodo
      }
      else{
        return todo;
      }
    })
    setTodolist(updateTodos)

  }


  return (
    <div className="App">
      <Form  updateTodolist ={updateTodolist}/>
      <Display todolist={todolist} deleteButton={deleteButton} handleCompleted={handleCompleted}/>
    </div>
  );
}

export default App;
