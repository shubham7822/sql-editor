import React, { useEffect, useRef, useState } from 'react'
import { queryContext } from '../../context/queryContext'
import {tabelHeaderKeys} from "../data/randomTabledata"

const Tabel = (props) => {
    
     const {tableArray} = props 
     const[visibleItems,setVisibleItems] =  useState([])
     const cloneArray = [...tableArray]
     const tableRef = useRef(false);
     const totalItems =  cloneArray?.length
     const visibleColumns = ['age', 'name', 'city']

    useEffect(() => {

        if(tableArray.length === 0 ){
            setVisibleItems([])
        }
        const container = tableRef.current;
        let isFetchingData = false;
     
      let currentVisibleCount  = Math.ceil(window.innerHeight / 50);

        const handleScroll = () => {
            const scrollTop = container.scrollTop;
            const scrollHeight = container.scrollHeight;
            const containerHeight = container.clientHeight; 
            const scrollOffset = scrollHeight - (scrollTop + containerHeight);
            if (!isFetchingData && scrollOffset < 50 * currentVisibleCount) {
            loadMoreData();
            }
          };


          const loadMoreData = () => {
            isFetchingData = true
            const start = 0;
            const end = Math.min(start + 50, totalItems);
            setTimeout(() => {
              const newItems = tableArray?.slice(start,end);   
              setVisibleItems((prevData) => [ ...prevData,...newItems]);
              isFetchingData = false;
            }, 500);
          }
        container.addEventListener('scroll',handleScroll)

        loadMoreData()
          
        return () => {
            container.removeEventListener('scroll',handleScroll)
        };
    },[tableArray])

  return (
    <div  ref={tableRef} style={{ height: '500px',width:"700px", overflowY: 'auto' }}>
    <table  className="border border-dotted w-full">
        <thead>
        <tr>
                {visibleItems?.length > 0  &&  <th className='p-2'>sr no</th>}          
                {visibleColumns?.map((item,index) => {
                    return (
                         visibleItems?.some(visibleitem => visibleitem?.hasOwnProperty(item)) ?  <th className="p-2">{item}</th> : "" 
                        )
                })}
        </tr>
        </thead>
            {visibleItems?.map((item,i) => {
                            return (
                        <tr key={i} className="border-t">
                                <td className='p-2 text-center'>{i + 1}</td>
                                {visibleColumns?.map((column) => {
                                    return (
                                        item.hasOwnProperty(column) && (
                                        <td key={column} className="p-2 text-center">
                                            {item[column]}
                                        </td>
                                        )
                                    );
                               })}
                        </tr>
                     )
            })}
        </table>
    </div>
  )
}

export default Tabel
 