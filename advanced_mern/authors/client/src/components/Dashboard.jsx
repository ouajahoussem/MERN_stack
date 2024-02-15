import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Link,useNavigate } from 'react-router-dom'
import './Dashboard.css'

const Dashboard = () => {
    const [authors, setAuthors] = useState([])

    const nav = useNavigate()
    useEffect(() => {
        axios.get("http://localhost:8000/api/authors")
            .then(res => {
                console.log(res.data)
                setAuthors(res.data)
            })
            .catch((err) => { console.log(err) })
    }, [])

    const DeleteAuthor = (id) => {
        console.log(id)
        axios.delete(`http://localhost:8000/api/authors/${id}`)
            .then(res => {
                console.log(res.data)
                setAuthors(authors.filter(a =>
                    a._id !== id
                ))
            })
            .catch(err => console.log(err) )
    }

    return (
        <>
            <div className='container col-5 text-start'>
                <Link to="/authors/create" ><strong className='fs-5'>Add An Author</strong></Link>
                <h4 className='mt-3'> We have quotes by :</h4>
                <table className='table table-bordered table-striped'>
                    <thead>
                        <tr>
                            <th>Authors</th>
                            <th>Actions available</th>
                        </tr>
                    </thead>
                    <tbody>
                        {authors.map(a => (
                            <tr key={a._id}>
                                <td>{a.name}</td>
                                <td className='d-flex justify-content-center gap-5'>
                                    <button className='btn btn-warning' onClick={()=>nav(`/authors/${a._id}/edit`)}>Edit</button>
                                    <button className='btn btn-danger' onClick={()=> DeleteAuthor(a._id)}>Delete</button>
                                </td>
                            </tr>
                        ))

                        }
                    </tbody>

                </table>
            </div>
        </>

    )
}

export default Dashboard