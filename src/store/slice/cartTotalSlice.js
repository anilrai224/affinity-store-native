import { createSlice } from "@reduxjs/toolkit";

const cartTotalSlice = createSlice({
    name:'totalCartAmount',
    initialState:0,
    reducers:{
        setTotalCartAmount(_,action){
            return action.payload
        }
    }
})

export const {setTotalCartAmount} = cartTotalSlice.actions;
export default  cartTotalSlice.reducer;