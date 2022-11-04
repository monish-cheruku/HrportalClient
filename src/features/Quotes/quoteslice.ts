import { createSlice, PayloadAction } from "@reduxjs/toolkit"; 

interface quote{
    id:number,
    desc:string,
    author:string
}
const initialState:quote={
    id:1,
    desc:"",
    author:""
}
export const quoteSlice=createSlice({
    name:'quote',
    initialState,
    reducers:{
        getquote:(state,payload:any)=>{
            console.log(payload.payload.data)
            console.log(payload.payload.quote)
            var temp=payload.payload.data
            state={
                id:temp.id,
                desc:temp.quote,
                author:temp.author
            }
            return state;
        },
        getquoteaction:(state,payload:PayloadAction<number>)=>{
console.log(payload.payload)
// alert(payload.payload)
        }
    }
})
export const {getquoteaction,getquote}=quoteSlice.actions
export default quoteSlice.reducer