import { useState } from 'react';

const Form = (props) => {
    const [content, setContent] = useState ("");
    const { updateTodolist } = props;


    const submitTodo=(e) =>{
        e.preventDefault();
        
        console.log("clicked")
        updateTodolist({
            content,
            isComplete : false,
            id: Math.floor(Math.random()*100000000).toString()
        })
        setContent("");
    }

    return (
        <div className='mx-auto my-4'>
            <form onSubmit={submitTodo}>
                <input type="text" onChange={(e)=>setContent(e.target.value)} value={content}/>
                <button className=' bg-primary mx-2'>Add</button>
            </form>
        </div>
    )

}
export default Form

    



