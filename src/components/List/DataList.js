import React, { useState ,useContext} from 'react'
import { useWorker } from "@koale/useworker";
import toast, { Toaster } from 'react-hot-toast';
import { queryContext } from '../../context/queryContext';
import Button from '../Button/Button';
import { downloadFile } from '../../misllenious';
import Tabel from '../Tabel/Tabel';
import { QURIES } from '../data/Quries';
import { cities,names } from '../data/randomTabledata';


  function getRandomAge(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  function getRandomCity() {
    const randomIndex = Math.floor(Math.random() * cities.length);
    return cities[randomIndex];
  }
  
  const customersTableData = [...Array(500000)].map(e => {
    const randomIndex = Math.floor(Math.random() * names.length);
    return {"age":getRandomAge(20,50),"city":getRandomCity(),"name":names[randomIndex]}
  });

   const dataSet = (tabledata) => tabledata;  
  
   const DataList = () => {
    const{queryInputValue} = useContext(queryContext)
    const [timeTaken,setTimeTaken] = useState(0)
    const[listForRunningQurries,setListForRunningQurries] =  useState([])
    const [customerWebWorker, { status: workerStatus, kill: killWebWorker }] = useWorker(dataSet);
    const [isloading,setLoading] = useState(false)

  
    let excecuteQuerry =  async() => {
      const time1 =  performance.now(); 
      const  listResponse = await customerWebWorker(customersTableData); 
      if(listResponse) {
        let time2= performance.now(); 
        setTimeTaken(time2 - time1)
      }

     let result =[]
      switch(queryInputValue){
        case 'SELECT name, age FROM customers WHERE age BETWEEN 25 AND 35':
          result = listResponse?.filter((item) => item.age >= 25 && item.age <= 35).map(({ name, age }) => ({ name, age }));
          break;
    
        case 'SELECT * FROM customers WHERE name IN ("Kabir", "Neha", "Mohit","Tanvi")':
          result = listResponse?.filter((item) => ["Kabir", "Neha", "Mohit","Tanvi"].includes(item.name));
          break;
         
         case 'SELECT * FROM customers' :
            result = listResponse
            break;

        default:
          result = [];
          break;
        }
        
           if(result.length > 0) setLoading(false)
          setListForRunningQurries([...result])

    }

    async function runQuery(e){
      if(QURIES.includes(queryInputValue)){
      setLoading(true)
      setListForRunningQurries([])
      excecuteQuerry()
      }else {
        toast('Please Enter/Select quries from given quries',
          {
            icon: '👎',
            style: {
              borderRadius: '10px',
              background: 'black',
              color: '#00aa00',
            },
          }
);
      }
      e.preventDefault()
      };


      
  return (
    <div>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    <div className='flex items-center'>
    <Button  className="mt-10 mb-10" onClick={(e) => runQuery(e)}>Run Query</Button>

    <Button  className={`m-3 ${listForRunningQurries?.length === 0 && "cursor-not-allowed"}`} onClick={() => {
      downloadFile({data:JSON.stringify(listForRunningQurries),fileName:"customers.json",fileType:"text/json"})
    }}>Download</Button>
   </div>
      {listForRunningQurries?.length > 0 ? <p className='p-2'>renderd {listForRunningQurries?.length} rows in {Math.floor(timeTaken)} ms</p> : isloading ? <p>loading Data</p> :
      <p>load data from customers datset of 500000+ customers by clicking on run query 
        or select any query and run</p>
      }
      <Tabel tableArray={listForRunningQurries || []}/>
     </div>
  )
}

export default DataList

