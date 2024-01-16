import React, { useState } from 'react'

const Form = (props) => {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");





    return (
        <div className='mx-auto w-25'>
            <form className='my-4 text-start'>
                <div className='mb-3 '>
                    <label htmlFor="firstname" className='form-label'>First Name :</label>
                    <input type="text" name='firstname' className='form-control' onChange={(e) => setFirstname(e.target.value)} />
                </div>
                <div className='mb-3'>
                    <label htmlFor="lastname" className='form-label'>Last Name :</label>
                    <input type="text" name="lastname" className='form-control' onChange={(e) => setLastname(e.target.value)} />
                </div>
                <div className='mb-3'>
                    <label htmlFor="email" className='form-label'>Email :</label>
                    <input type="text" name="email" className='form-control' onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className='mb-3'>
                    <label htmlFor="password" className='form-label'>Password</label>
                    <input type="password" name="password" className='form-control' onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className='mb-3'>
                    <label htmlFor="confirm" className='form-label'>Confirm Password :</label>
                    <input type="password" name="confirm" className='form-control' onChange={(e) => setConfirm(e.target.value)} />
                </div>

            </form>
            <div>
                <h3></h3>
                <p>
                    <label > First Name : </label> {firstname}
                </p>
                <p>
                    <label >Last Name :</label>{lastname}
                </p>
                <p>
                    <label > Email :</label>{email}
                </p>
                <p>
                    <label >Password :</label>{password}
                </p>
                <p>
                    <label >Confirm Password :</label>{confirm}
                </p>
            </div>
        </div>
    )
}

export default Form;