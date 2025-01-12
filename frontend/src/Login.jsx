import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const nav = useNavigate();

    const clicked = async () => {
        try {
            const res = await fetch('https://to-do-app-nzxx.vercel.app/Login',{
                method:"POST",
                headers:{ "Content-Type":"application/JSON" },
                body:JSON.stringify({
                    email,
                    password
                })
            })
            if(res.status === 204){
                alert("User not found");
                return
            }
            else if(res.status === 400){
                alert("Incorrect password");
                return
            }
            else{
                const data = await res.json();
                console.log(data);
                alert("Succesfully Login");
                nav('/dashboard',{state:data});
            }
        } catch (error) {
            console.log(error);
            alert("Network error");
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
          <div className="flex flex-col justify-center items-center gap-4 bg-white shadow-lg p-6 rounded-lg w-96">
            <h1 className="mb-5 text-2xl font-bold text-blue-600">Login</h1>
            <div className="w-full">
              <input
                className="border border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="username"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="w-full">
              <input
                type="password"
                className="border border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="w-full">
              <button
                className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
                onClick={clicked}
              >
                Login
              </button>
            </div>
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-700 hover:underline">
                Register
              </Link>
            </p>
          </div>
        </div>
      );      
}

export default Login
