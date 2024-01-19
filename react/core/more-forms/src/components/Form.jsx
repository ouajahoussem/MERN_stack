import React, { useState } from 'react'

const Form = (props) => {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [formVal, setFormVal] = useState("");

    return (
        <div className='mx-auto w-25'>
            <form className='my-4 text-start' >
                <div className='mb-3 '>
                    <label htmlFor="firstname" className='form-label'>First Name :</label>
                    <input type="text" name='firstname' className='form-control' onChange={(e) => setFirstname(e.target.value)} />
                    {firstname.length < 2 && firstname.length > 0 ?
                        (<p> first name must have at least 2 characters!</p>) : null}

                </div>
                <div className='mb-3'>
                    <label htmlFor="lastname" className='form-label'>Last Name :</label>
                    <input type="text" name="lastname" className='form-control' onChange={(e) => setLastname(e.target.value)} />
                    {lastname.length < 2 && lastname.length > 0 ?
                        (<p> last name must have at least 2 characters!</p>) : null}
                </div>
                <div className='mb-3'>
                    <label htmlFor="email" className='form-label'>Email :</label>
                    <input type="text" name="email" className='form-control' onChange={(e) => setEmail(e.target.value)} />
                    {email.length < 5 && email.length > 0 ? (<p>email must have at least 5 characters!</p>) : null}
                </div>
                <div className='mb-3'>
                    <label htmlFor="password" className='form-label'>Password</label>
                    <input type="password" name="password" className='form-control' onChange={(e) => setPassword(e.target.value)} />
                    {password.length < 8 && password.length > 0 ? (<p>password must have at least 8 characters!</p>) : null}
                </div>
                <div className='mb-3'>
                    <label htmlFor="confirm" className='form-label'>Confirm Password :</label>
                    <input type="password" name="confirm" className='form-control' onChange={(e) => setConfirm(e.target.value)} />
                    {confirm !== password ? (<p>password must match!</p>) : null}
                </div>
                
            </form>
            <div>

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

export default Form

   



