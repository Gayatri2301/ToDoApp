import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./index.css";
import Login from './Login';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Signup from './Signup';
import PrivateLayout from './PrivateLayout';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div className=''>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/dashboard' element={<App/>}></Route>
        <Route path='/register' element={<Signup/>}></Route>
      
        <Route path='*' element={<h1>Element not Found</h1>}></Route>
      </Routes>
    </BrowserRouter>
    </div>
  </React.StrictMode>
);

