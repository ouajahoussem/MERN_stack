import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'


const Main = () => {
    const [products, setProducts] = useState([])

    useEffect(()=>{
        axios.get("http://localhost:8000/api/products")
        .then(res =>{
            console.log(res.data)
            setProducts(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    },[])

    const DeleteProduct = (deleteId)=>{
        axios.delete(`http://localhost:8000/api/products/${deleteId}`)
        .then(res =>{
            const filteredProduct = products.filter((eachProduct)=>{
                return eachProduct._id !== deleteId
            })
        setProducts(filteredProduct)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    return (
        <div className='mt-3'>
            <h1> ALL PRODUCTS :</h1>
            <hr/>
            {
                products.map((oneProduct)=>{
                    return(
                        

                        <div key={oneProduct._id} className='mb-4'>
                            <Link to={"/products/" + oneProduct._id}>
                                <h3>{oneProduct.title}</h3>
                            </Link>
                            <button onClick={()=>{DeleteProduct(oneProduct._id)}} className='btn btn-danger mb-4 mt-4'>Delete</button><br />
                            <Link to={`/products/${oneProduct._id}/update`} className='mt-5 fs-5'>Update Product</Link>
                            <hr />
                        </div>
                        
                        
                        )
                    })
                }
                <Link to="/products/create" className='mt-3 fs-5'>Create New Product</Link>
        </div>
    )
}

export default Main
