import logo from './logo.svg';
import './App.css';
import './index.css';
import SqlApp from './components/SqlApp';
import {queryContext} from "./context/queryContext"
import { useEffect, useState } from 'react';


function App() {

    useEffect(() => {
    const loadTime = performance.now();
    return () => {
      const unmount = performance.now() - loadTime; 
      console.log(`App loaded in ${Math.ceil(unmount)} milliseconds`);
    };
  },[])

  const [queryInputValue,setQueryInputValue] =  useState('SELECT * FROM customers')

  return (
    <div className="bg-black text-[#00aa00] font-mono">
    <queryContext.Provider value={{
      queryInputValue,
      setQueryInputValue
    }}>
      <SqlApp/>
      <h1>test</h1>
 </queryContext.Provider>
    </div>
  );
}

export default App;
