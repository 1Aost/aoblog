import { createSlice } from "@reduxjs/toolkit";

const initialState={
    articleType:[],
    articleList:[],
    articleId:0
}
export const articleSlice=createSlice({
    name:"article",
    initialState,
    reducers:{
        // 定义一个改变所有文章的方法
        all:(state,action)=>{
            state.articleList=action.payload;
        },
        // 定义改变类别的函数
        changetype:(state,action)=>{
            state.articleType=action.payload;
        },
        // 改变当前的文章id
        changeId:(state,action)=>{
            state.articleId=action.payload;
        }
    }
})
export const {all,changetype,changeId}=articleSlice.actions;
export default articleSlice.reducer;