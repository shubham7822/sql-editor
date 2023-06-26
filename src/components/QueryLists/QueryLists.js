import React,{useContext} from 'react'
import {QURIES} from "../data/Quries"
import { queryContext } from '../../context/queryContext'


const QueryLists = () => {

    const{setQueryInputValue,queryInputValue} = useContext(queryContext)
    
    const handleQueryClick = (e,query) => {
        setQueryInputValue(() => query)
        e.preventDefault()
    }


  return (
    <div>
        <h2>Select a query to run it</h2>
     {QURIES.map((query,index) => {
        return (
            <div onClick={(e) => handleQueryClick(e,query)} key={index} className='border border-dotted flex m-2 p-2 cursor-pointer'>
            <p>{">"}</p>
            <p>{query}</p>
            </div>
        )
     })}      
    </div>
  )
}

export default QueryLists
