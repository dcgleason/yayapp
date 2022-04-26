import { useState, useEffect } from 'react'
import logo from './logo.svg'
import './App.css'
import {Footer, Header, Main, Input} from "./components/index"

import React from 'react';
import './index.css'

const App = () => {

  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("https://yay-api.herokuapp.com/api")
      .then((res) => {
        if (res.ok){
          return res.json()
        }
      }
        )
      .then((data) => setData(data.message));
      console.log('fetched data');
  }, []);

  return (
    <div className="App">
  
        <Input/>
      
    </div>
  );
}

export default App;
  
