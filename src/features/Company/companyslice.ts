import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Company {
    BusinessUnitName: string;
    BusinessUnitId: number;
    CompanyId: number;
    CompanyName: string;
    CompanyDesc: string;
    Active: boolean;
}
export interface ICompanyoptions{
    key:number,
    label:string;
    value:number
}
const initialState: Company[] = [];
// const companiesdata = createAction<number>('companiesdata')
export const companySlice = createSlice({
    name: "company",
    initialState,
    reducers: {
        companiesdata:  (state, payload: any) => {
            
            var temp=payload.payload
            state=[...temp]
          
            // console.log(state)
            return state;
        },
        
        
        
        
        //functions for sagas watching
        getcompaniesaction:(state)=>{
        },
        createcompanyaction:(state,payload:PayloadAction<any>)=>{
console.log(payload)
        },
        updatecompanyaction:(state,payload:PayloadAction<any>)=>{

        }

    },
});
export const {companiesdata,getcompaniesaction,createcompanyaction,updatecompanyaction}=companySlice.actions
export default companySlice.reducer