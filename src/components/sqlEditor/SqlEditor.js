import React,{useCallback,useContext} from 'react'
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { queryContext } from '../../context/queryContext';
import Button from '../Button/Button';

const SqlEditor = (props) => {
    // const {setQueryInputValue} =  props
    const{setQueryInputValue,queryInputValue} = useContext(queryContext)
   
    const onChange = useCallback((value, viewUpdate) => {
        setQueryInputValue(value)
      }, []);

    
    return (
       <>
       <CodeMirror
      value={queryInputValue || ""}
      height="100px"
      extensions={[javascript({ jsx: true })]}
      onChange={onChange}
      className="text-[#00aa00] editor-bg"
    />
    </>
  )
}

export default SqlEditor
