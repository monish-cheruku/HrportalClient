import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const pdfdownloadSlice=createSlice({
    'name':'pdfdownload',
    initialState:{},
    reducers:{
        genpdf:(state,payload:PayloadAction<any>)=>{
            console.log(payload)
        }
    }
})
export const {genpdf}=pdfdownloadSlice.actions
export default pdfdownloadSlice.reducer;