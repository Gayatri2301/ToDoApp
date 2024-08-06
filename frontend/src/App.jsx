import './App.css';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Login from './Login';


function App() {
  const loc = useLocation();
  const data = loc.state;
  const ref = useRef([]);
  const [val, setVal] = useState('')
  const [items, setItems] = useState([])
  const email = data.email;
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

  return (
    <div className="App">
      <h2>ToDo List</h2>
      <input type='text' id='text' value={val} onChange={changed}></input>
      <button type='submit' onClick={clicked}>Add</button>
      {items.map((ele, index) => 
      <div className='ss' key={index}>
        <input type='checkbox' id={`${index}`} onClick={() => checked(index)}></input>
        <label htmlFor={`${index}`} className='l' ref={el => ref.current[index]=el}>{ele.text}</label>
        <button style={{"height":"25px"}} onClick={() => click(index)}>Delete</button>
      </div>
      )}
      <div>
        <button className='Save' onClick={save}>Save</button>
      </div>
    </div>
  );
}

export default App;