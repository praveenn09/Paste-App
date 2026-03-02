import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import "./viewpaste.css";
const ViewPaste = () => {
  const {id}=useParams();
  const allPaste=useSelector((state)=>state.paste.pastes);
  const paste=allPaste.filter((p)=>p._id===id)[0];

  return (
    <div className='main-container'>
      <div  className='inp-field'>
      <input
      className='inp'
      
        type='text'
        placeholder='enter title here'
        value={paste.title}
        disabled
        onChange={(e)=>{
          setTitle(e.target.value)
        }}
      />
    </div>
    <div>
       <textarea
         className='txt-area'
         value={paste.content}
         placeholder='enter content here'
         rows={20}
         disabled
         onChange={(e)=>
          setValue(e.target.value)
         }
       />
    </div>
    </div>
  )
}

export default ViewPaste
