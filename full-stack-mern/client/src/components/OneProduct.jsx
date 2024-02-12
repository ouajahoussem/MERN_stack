import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

const OneProduct = () => {
    const [product, setProduct] = useState(null)
    const { id } = useParams()

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/products/${id}`)
            .then(res=>{
                console.log(res.data)
                setProduct(res.data)
            })
            .catch(err =>{
                console.log(err)
            })
    },[id])

    return (
        <div>
            <h1>ONE PRODUCT</h1>
            <hr />
            {
                product ? (
                    <>
                        <h2 className='mb-3'>{product.title}</h2>
                        <h3 className='mb-3'>Price: ${product.price}</h3>
                        <p><strong>Description:</strong> {product.description}</p>
                    </>
                ):<h3>loading...</h3>
            }
            <Link to="/products/" className='fs-5'>Home</Link>
        </div>
    )
}

export default OneProduct
