import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

const UpdateProduct = () => {
    const [product, setProduct] = useState(null)

    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")

    const nav = useNavigate()
    const { id } = useParams()

    const UpdateHandler = (e) => {
        e.preventDefault()
        console.log("it's Working")
        axios.patch(`http://localhost:8000/api/products/${id}`, { title, price, description })
            .then(res => {
                console.log("✅✅✅✅✅", res.data)
                nav("/products")
                setTitle("");
                setPrice("");
                setDescription("");
            })
            .catch(err => console.log("❌❌❌❌❌❌", err))
    }

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/products/${id}`)
            .then(res=>{
                console.log(res.data)
                setTitle(res.data.title)
                setPrice(res.data.price)
                setDescription(res.data.description)
            })
            .catch(err =>{
                console.log(err)
            })
    },[id])


    return (
        <div>
            {JSON.stringify(product)}
            <form onSubmit={UpdateHandler} className='col-3 mx-auto'>
                <div className='mb-3 text-start' >
                    <label htmlFor="" className='form-label fs-4'>Title :</label>
                    <input className='form-control' value={title} onChange={e => { setTitle(e.target.value) }} />
                </div>
                <div className='mb-3 text-start'>
                    <label htmlFor="" className='form-label fs-4'>Price :</label>
                    <input className='form-control' value={price} onChange={e => { setPrice(e.target.value) }} />
                </div>
                <div className='mb-3 text-start'>
                    <label htmlFor="" className='form-label fs-4'>Description :</label>
                    <input className='form-control' value={description} onChange={e => { setDescription(e.target.value) }} />
                </div>
                <button className='btn btn-primary mb-3'>Update Product</button> <br />
                <Link to="/products/" className='fs-5'>Home</Link>

            </form>
            </div>
    )
}

export default UpdateProduct