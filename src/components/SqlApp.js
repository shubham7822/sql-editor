import React from 'react'
import DataList from './List/DataList'
import QueryLists from './QueryLists/QueryLists'
import SqlEditor from './sqlEditor/SqlEditor'

const SqlApp = () => {
  return (
    <div className="mx-auto container flex flex-col  min-h-screen">
      <h1 className="text-2xl font-bold mb-4">SQL  App</h1>
         <SqlEditor/>

         <div className="mt-2 flex justify-center">
            <div className="w-3/4 mr-2">
              <DataList />
            </div>
        <div className="w-1/2 ml-2">
          <QueryLists />
        </div>
        </div>
      </div>
  )
}

export default SqlApp
