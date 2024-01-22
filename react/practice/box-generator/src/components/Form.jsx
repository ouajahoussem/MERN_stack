import React,{useState} from 'react'

const Form = (props) => {
    const [color,setColor] = useState("")
    const {addBoxtoBoxes} = props


    const CreateBox= (e)=>{
        e.preventDefault()
        console.log("clicked")
        const newBox={color}
        addBoxtoBoxes(newBox)
    }


    return (
        <form onSubmit={CreateBox}  >
        <div className=' mx-auto d-flex align-items-center col-4 gap-3 '>
            <label htmlFor="color" className='form-label p-3 fs-4'> Color </label>
            <input  className='form-control' value={color} onChange={(e)=>{setColor(e.target.value)}} />
            <button className='btn btn-primary '>Add</button>
        </div>
        </form>
    )
}

export default Form