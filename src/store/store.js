import { configureStore } from "@reduxjs/toolkit";
import loginStatusSlice from "./slice/loginStatusSlice";
import cartSlice from './slice/cartSlice'
import cartTotalSlice from './slice/cartTotalSlice'

export const store=configureStore({
    reducer:{
       loginStatus:loginStatusSlice,
       cart:cartSlice,
       cartTotal:cartTotalSlice,
    }
})