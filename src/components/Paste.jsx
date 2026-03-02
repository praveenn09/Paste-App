import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPaste } from '../redux/pasteSlice';
import "./paste.css";
import toast from 'react-hot-toast';
import { NavLink } from "react-router-dom";

const Paste = () => {
   
  const pastes=useSelector((state)=>state.paste.pastes);
  
  const dispatch=useDispatch();

  const [searchTerm,setSearchTerm]=useState('');
  const filteredData=pastes.filter(
    (paste)=>paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  )
  function handleDelete(pasteId){
   dispatch(removeFromPaste(pasteId))
  }
  return (
   <div className="paste-container">
  <input
    className="search-input"
    type="search"
    placeholder="Search here..."
    value={searchTerm}
    onChange={(e)=>setSearchTerm(e.target.value)} 
  />
      <div className="paste-list" >
          {
            filteredData.length>0 && filteredData.map((paste,index)=>{
                return(
                   <div key={paste._id} className="paste-card">
                      <div className='title'>
                          {paste.title}
                        </div>
                        <div className='content'>
                          {paste.content}
                        </div>
                        <div className='btn-grp'>
                          <button>
                            <NavLink
                             to={`/?pasteId=${paste?._id}`}
                            >
                              Edit
                            </NavLink>
                          </button>
                          <button>
                            <NavLink
                             to={`/pastes/${paste?._id}`}
                            >
                              View
                            </NavLink>
                          </button>
                          <button onClick={()=>handleDelete(paste?._id)}>Delete</button>
                          <button  onClick={() => 
                          {navigator.clipboard.writeText(paste?.content)
                             toast.success("copied to clipboard");
                          }}
                          >Copy</button>
                          <button
  onClick={async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: paste.title,
          text: paste.content,
          url: window.location.href,
        });
      } else {
        alert("Sharing not supported in this browser");
      }
    } catch (error) {
      console.log("Error sharing:", error);
    }
  }}
>
  Share
</button>
                        </div>
                        <div className='date'>
                          {paste.createdAt}
                        </div>
                  </div>
                )
            })
          } 
      </div>
    </div>
  )
}

export default Paste
