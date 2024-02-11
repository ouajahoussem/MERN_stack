import axios from 'axios'
import React, { useState } from 'react'


const CreateProduct = () => {
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")

    const SubmitHandler = (e) => {
        e.preventDefault()
        console.log("it's Working")
        axios.post("http://localhost:8000/api/products", { title, price, description })
            .then(res => {
                console.log("✅✅✅✅✅", res.data)
                setTitle("");
                setPrice("");
                setDescription("");
            })
            .catch(err => console.log("❌❌❌❌❌❌", err))
    }

    return (
        <div>
            Title :{JSON.stringify(title)}<br />
            Price:{JSON.stringify(price)}<br />
            Description :{JSON.stringify(description)}<br />
            <hr />
            

            <form onSubmit={SubmitHandler} className='col-3 mx-auto'>
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
                <button className='btn btn-primary'>Add Product</button>

            </form>

        </div>
    )
}

export default CreateProduct