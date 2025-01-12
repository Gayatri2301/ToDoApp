import React, { useState } from 'react'
import Login from './Login';

const Signup = () => {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [confirm,setConfirm] = useState("");
  const clicked = async () => {
    try {
      if(password === confirm){
        const res = await fetch('https://to-do-app-nzxx.vercel.app/register',{
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
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="signup flex flex-col gap-4 bg-white shadow-lg p-6 rounded-lg w-96">
        <h1 className="text-2xl font-bold text-blue-600 text-center mb-6">Signup Page</h1>
        <input
          className="border border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="email"
          value={email}
          name="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="password"
          value={password}
          name="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className="border border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="password"
          value={confirm}
          name="confirm"
          placeholder="Confirm Password"
          onChange={(e) => setConfirm(e.target.value)}
        />
        <button
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
          onClick={clicked}
        >
          Register
        </button>
      </div>
    </div>
  );  
}

export default Signup
