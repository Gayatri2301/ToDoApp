import './App.css';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Login from './Login';


function App() {
  const loc = useLocation();
  const data = loc.state;
  const ref = useRef([]);
  const [val, setVal] = useState('')
  const [items, setItems] = useState([])
  const email = data.email;
  const nav = useNavigate();
  function changed(e){
    setVal(e.target.value);
    }

    function clicked(){
      let id = items.length+1;
      let obj = {
        id:id,
        text:val,
        checked:false
      }
      setItems([...items,obj]);
      console.log(items);
      setVal('');
    }
    
    function click(e){
      let temp = [...items];
      temp.splice(e,1);
      setItems(temp);
    }

    function checked(index){
      ref.current[index].classList.toggle("click");
      console.log(ref.current[index].classList);
    }

    async function save(){
      const res = await fetch('https://to-do-app-nzxx.vercel.app/update',{
        method:"POST",
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ email, items }), 
      });
      if(res.ok){
        console.log("success");
      }
      else{
        console.log(res.text());
      }

    }

    const getItems = async () => {
      const res = await fetch('https://to-do-app-nzxx.vercel.app/items',{
        headers:{
          email:email
        }
      });
      const data = await res.json();
      console.log(data);
      setItems(data.data);
    }

    useEffect(() => {
      getItems();
    },[]);

    const logout = () => {
      alert("Successfully logout");
      nav('/');
    }

    return (
      <div className="App bg-gray-100 min-h-screen p-6 flex flex-col items-center">
        <button
            type="submit"
            onClick={logout}
            className="ml-64 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        <h2 className="text-2xl font-bold text-blue-600 mb-4">ToDo List</h2>
        <div className="flex items-center mb-6">
          <input
            type="text"
            id="text"
            value={val}
            onChange={changed}
            placeholder="Enter a task"
            className="border border-gray-300 rounded-lg p-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            onClick={clicked}
            className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Add
          </button>
        </div>
        <div className="w-full max-w-md space-y-4">
          {items.map((ele, index) => (
            <div
              className="ss flex items-center justify-between bg-white shadow-md rounded-lg p-3"
              key={index}
            >
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={`${index}`}
                  onClick={() => checked(index)}
                  className="h-5 w-5 text-blue-500 focus:ring-blue-400"
                />
                <label
                  htmlFor={`${index}`}
                  className="l text-gray-700"
                  ref={(el) => (ref.current[index] = el)}
                >
                  {ele.text}
                </label>
              </div>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                onClick={() => click(index)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <button
            className="Save bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
            onClick={save}
          >
            Save
          </button>
        </div>
      </div>
    );    
}

export default App;