import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IJobPostAction {
    IndustryId: number;
    IndustryName: string;
    IndustryDesc: string;
    Active: boolean;
}
const initialState: IJobPostAction[] = [];

export const JobPostActionSlice = createSlice({
    name: "JobPostAction",
    initialState,
    reducers: {
        JobPostActiondata:  (state, payload: any) => {
            var temp=payload.payload
            state=[...temp]
          
            // console.log(state)
            return state;
        },
        
        
        
        
        //functions for sagas watching
        getJobPostActionfromapi:(state,payload:PayloadAction<any>)=>{
            // console.log(payload)
        },
        createIJobPostAction:(state,payload:PayloadAction<any>)=>{
console.log(payload)
        },
        updateIJobPostAction:(state,payload:PayloadAction<any>)=>{

        }

    },
});
export const {JobPostActiondata,getJobPostActionfromapi,createIJobPostAction,updateIJobPostAction}=JobPostActionSlice.actions
export default JobPostActionSlice.reducer