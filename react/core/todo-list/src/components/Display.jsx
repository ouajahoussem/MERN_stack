import React from 'react'



const Display = (props) => {
    const {todolist, deleteButton, handleCompleted} = props;   
    return (
        <>
            {
                todolist.map((todo, index)=>(
                    <div className='d-flex gap-3 justify-content-center align-items-center  col-4 mx-auto  my-3 fs-5' key={todo.id}>
                        <p className={todo.isComplete ? "completed" : ""}>{todo.content}.</p>
                        <input type="checkbox" onChange={()=>handleCompleted(todo)} />
                        <button className='bg-warning' onClick={()=>deleteButton(todo.id)}>Delete</button>

                    </div>

                ))
            }
        </>
    )
}

export default Display