import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom';

const Update = () => {
    const[name, setName] = useState("")
    const [errors, setErrors] = useState([])
    
    const nav = useNavigate()
    const {id} = useParams()

    useEffect(()=>{
        axios.get("http://localhost:8000/api/authors/" + id)
            .then(res =>{
                setName(res.data.name)
            })
            .catch(err => (err))
    }, [id]) 

    const UpdateHandler =(e) =>{
        e.preventDefault()
        axios.patch(`http://localhost:8000/api/authors/${id}`, {name})
            .then(res =>{
                console.log(res.data)
                nav('/')
            })
            .catch(err =>{
                const errorResponse = err.response.data.errors;
                const errorArr = [];
                for (const key of Object.keys(errorResponse)) {
                    errorArr.push(errorResponse[key].message)
                }
                setErrors(errorArr);
            })
    };

    return (
    <div className='container text-start col-5'>
        <Link to="/authors"><strong className='fs-5'>Home</strong></Link>
        <h4 className='mt-3'>Edit this author: </h4>
        <form onSubmit={UpdateHandler}>
                <div className=''>
                    <label htmlFor="name" className='form-label fs-5'>Name: </label>
                    <input className='form-control' value={name} onChange={e => { setName(e.target.value) }} />
                </div>
                <div>
                    {errors.map((err, index) => (
                        <p key="{index}" className='text-danger mt-2'>{err}</p>
                    ))}
                </div>
                <div className='mt-3'>
                    <button className=' btn btn-primary m-2' onClick={()=>nav('/')}>Cancel</button>
                    <button className='btn btn-primary'>Submit</button>
                </div>
            </form>
    </div>
    )
}

export default Update