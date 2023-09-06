import { createSlice } from "@reduxjs/toolkit";

const initialState={
    isLogined: false,
    user:{},
    isVaild: -1,
}
export const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        // 定义一个改变isLogined的方法
        change:(state,action)=>{
            console.log(action.payload);
            
            state.isLogined=action.payload;
        },
        userMess:(state,action)=>{
            state.user={...action.payload,password:""};
        },
        changeIsVaild:(state,action)=>{
            state.isVaild=action.payload;
        }
    }
})
export const {change,userMess,changeIsVaild}=userSlice.actions;
export default userSlice.reducer;