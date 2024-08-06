import React, { useState } from 'react'
import Login from './Login';

const Signup = () => {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [confirm,setConfirm] = useState("");
  const clicked = async () => {
    try {
      if(password === confirm){
        const res = await fetch('http://localhost:4000/register',{
          method:"POST",
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify({
            email,
            password,
          })
        })
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
    
  }


  return (
    <div className=''>
      <div className='signup'>
      <h1>Signup page</h1>
      <input className='border rounded' type='email' value={email} name='email' placeholder='Email' onChange={e=>setEmail(e.target.value)}></input>
      <input className='border rounded' type='password' value={password} name='password' onChange={e => setPassword(e.target.value)} placeholder='Password'></input>
      <input className='border rounded' type='password' value={confirm} name='confirm' onChange={e => setConfirm(e.target.value)} placeholder='Confirm Password'></input>
      <button className='w-1/2 bg-green-500 ml-20 border rounded' onClick={clicked}>Register</button>
      </div>
    </div>
  )
}

export default Signup
