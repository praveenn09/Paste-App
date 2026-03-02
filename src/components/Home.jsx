import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { addToPastes, updateToPaste } from '../redux/pasteSlice';
import './home.css';
const Home = () => {
  const [title,setTitle]=useState("");
  const [value,setValue]=useState('');
  const [searchParams,setSearchParams]=useSearchParams();
  const pasteId=searchParams.get("pasteId");

  const dispatch=useDispatch();
  const allPastes=useSelector((state)=>state.paste.pastes);

  useEffect(()=>{
         if(pasteId){
            const paste=allPastes.find((p)=>p._id===pasteId);
            setTitle(paste.title);
            setValue(paste.content);
            
         }
     },[pasteId])
  function createPaste(){
     const paste={
      title:title,
      content:value,
      _id:pasteId|| Date.now().toString(36),
      createdAt:new Date().toISOString(),
     }
    
     if(pasteId){
       //update
       dispatch(updateToPaste(paste));
     }
     else{
      //create
      dispatch(addToPastes(paste));

     }
     //after creation or updattion 
     setTitle('');
     setValue('');
     setSearchParams('');
  }

  return (
    <div className='main-container'>
      <div className='inp-field' >
      <input
        className='inp'
        type='text'
        placeholder='enter title here'
        value={title}
        onChange={(e)=>{
          setTitle(e.target.value)
        }}
      />
      <button className='btn' onClick={createPaste}>
        {
          pasteId?"Update My Paste":"Create My Paste"
        }

      </button>
    </div>
    <div >
       <textarea
       className='txt-area'
         value={value}
         placeholder='enter content here'
         rows={20}
         onChange={(e)=>
          setValue(e.target.value)
         }
       />
    </div>
    </div>
  )
}

export default Home
