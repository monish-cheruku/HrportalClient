import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState: any = [];
export const CandidateActionSlice = createSlice({
    name: 'CandidateAction',
    initialState,
    reducers: {
       
        createnewcandidate:(state,payload:PayloadAction<any>)=>{
console.log(payload)
        },
        updatenewcandidate:(state,payload:PayloadAction<any>)=>{

        },
        
       
       

    },
}


)
export const {createnewcandidate,updatenewcandidate}=CandidateActionSlice.actions
export default CandidateActionSlice.reducer