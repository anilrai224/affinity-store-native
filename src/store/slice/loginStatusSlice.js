import { createSlice } from "@reduxjs/toolkit";

const loginStatusSlice=createSlice({
    name:'isLoggedIn',
    initialState:{
        isLoggedIn:false,
        userDetail:{}
    },
    reducers:{
        setLoggedIn(state,action){
            state.isLoggedIn=action.payload;
        },
        setUserDetail(state,action){
            state.userDetail=action.payload
        }
    }
})

export const {setLoggedIn,setUserDetail}=loginStatusSlice.actions;
export default loginStatusSlice.reducer;