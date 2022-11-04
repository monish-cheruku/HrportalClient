import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { quoteSlice } from "../Quotes/quoteslice";

export interface ExperienceLevel {
    ExperienceLevelId: number;
    ExperienceLevel: string;
    ExperienceRange: string;
    Active: boolean;
}
export interface IExperienceLeveloptions{
    key:number,
    label:string;
    value:number
}
const initialState: ExperienceLevel[] = [];

export const experiencelevelSlice = createSlice({
    name: "experiencelevel",
    initialState,
    reducers: {
        experiencelevelsdata:  (state, payload: any) => {
            console.log("experince data setting")
            var temp=payload.payload
            state=[...temp]
          
            console.log(state)
            return state;
        },
        
        
        
        
        //functions for sagas watching
        getexperiencelevelsaction:(state)=>{
            console.log("getexperiencelevelsaction")
        },
        createexperiencelevelaction:(state,payload:PayloadAction<any>)=>{
console.log(payload)
        },
        updateexperiencelevelaction:(state,payload:PayloadAction<any>)=>{

        }

    },
});
export const {experiencelevelsdata,getexperiencelevelsaction,createexperiencelevelaction,updateexperiencelevelaction}=experiencelevelSlice.actions
export default experiencelevelSlice.reducer