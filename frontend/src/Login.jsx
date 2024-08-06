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
        <div className='flex justify-center items-center'>
        <div className='flex flex-col justify-center items-center gap-2'>
        <h1 className='mb-5 font-bold'>Login</h1>
            <div>
            <input className='border rounded' name="username" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
            </div>
            <div >
            <input  className='border rounded' name="username" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
            </div>
            <div>
                <button className='border round bg-green-500' onClick={clicked}>Login</button>
            </div>
            <p>Don't have an account? <Link to={"/register"} className='text-blue-700'>Register</Link></p>
            </div>
        </div>
    )
}

export default Login
