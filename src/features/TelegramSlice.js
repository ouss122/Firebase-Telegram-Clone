import { createSlice } from "@reduxjs/toolkit";

export const teleSlice=createSlice({
    name:'telegram',
    initialState:{
        selectedRoom:null,
        user:null,
        menuO:null,
        userGr:null,
        editing:null,
        showFullImage:null,
    },
    reducers:{
       selectRoom:(state,action)=>{
        state.selectedRoom=action.payload;
       },
       setUser:(state,action)=>{
        state.user=action.payload;
       },
       setMenuO:(state,action)=>{
        state.menuO=action.payload;
       },
       setUserGrp:(state,action)=>{
        state.userGr=action.payload;
       },
       setEditing:(state,action)=>{
        state.editing=action.payload;
       },
       setShowFullImage:(state,action)=>{
        state.showFullImage=action.payload;
       }
    }
})

export const {selectRoom,setUser,setUserGrp,setMenuO,setEditing,setShowFullImage}=teleSlice.actions;
export default teleSlice.reducer;

