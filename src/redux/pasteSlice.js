import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

const initialState={
    pastes:localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    :[]
}
export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPastes:(state,action)=>{
        const paste=action.payload;
        state.pastes.push(paste);
        localStorage.setItem("pastes",JSON.stringify(state.pastes));
       toast('Paste Created.')
    },
    updateToPaste:(state,action)=>{
      const paste=action.payload;
      const index=state.pastes.findIndex((item)=>item._id===paste._id);
      if(index>=0){
        state.pastes[index]=paste;
        localStorage.setItem("pastes",JSON.stringify(state.pastes));
        toast.success("Paste Updated");
      }
    },
    resetAllPaste:(state,action)=>{
       state.pastes=[];
       localStorage.removeItem("pastes");
    },
    removeFromPaste:(state,action)=>{
          const pasteId=action.payload;
          // console.log(paste);
          const index=state.pastes.findIndex((item)=>item._id===pasteId);
          if(index>=0){
            state.pastes.splice(index,1);
            localStorage.setItem("pastes",JSON.stringify(state.pastes));
            toast.success("Paste Deleted");
          }
  //          const pasteId = action.payload;

  // state.pastes = state.pastes.filter(
  //   (item) => item._id !== pasteId
  // );

  // localStorage.setItem("pastes", JSON.stringify(state.pastes));
  // toast.success("Paste Deleted");

    },
  },
})

// Action creators are generated for each case reducer function
export const { addToPastes, updateToPaste, resetAllPaste,removeFromPaste } = pasteSlice.actions

export default pasteSlice.reducer