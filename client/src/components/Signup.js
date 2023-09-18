import { useMutation } from '@apollo/client'
import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import { SIGNUP_USER } from '../gqlOperation/mutation'

export default function Signup() {
    const [formData,setFormData] = useState({})
    const [signUpUser,{data,loading,error}]=useMutation(SIGNUP_USER);

    const handleChange = (e)=>{
        setFormData({
         ...formData,
         [e.target.name]:e.target.value
        })
    
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        //we have to pass userNew as defined in out SIGNUP_USER
        signUpUser(formData)
    }

    if(loading) return <h1>Loading</h1>
    if(error){
        console.log(error)
    }
    return (
        <div className="container my-container">
            <h5>Signup!!</h5>
            <form onSubmit={handleSubmit}>
                <input
                 type="text"
                 placeholder="First Name"
                 name="firstName"
                 onChange={handleChange}
                 required
                 />
                <input
                 type="text"
                 placeholder="Last Name"
                 name="lastName"
                 onChange={handleChange}
                 required
                 />
                <input
                 type="email"
                 placeholder="email"
                 name="email"
                 onChange={handleChange}
                 required
                 />
                <input
                 type="password"
                 placeholder="password"
                 name="password"
                 onChange={handleChange}
                 required
                 />
                  <Link to="/login"><p>Already have an account ?</p></Link> 
                 <button className="btn #673ab7 blue" type="submit">Submit</button>
            </form>
        </div>
    )
}