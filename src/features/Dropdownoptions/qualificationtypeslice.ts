import {createSlice,PayloadAction} from '@reduxjs/toolkit'
export  interface Qualification{
    QualificationId: Number
    Qualification: String
    Active:Boolean
}

const initialState:Qualification[]=[]
export const QualificationSlice=createSlice({
    name:'Qualifications',
    initialState,
    reducers:{
        qualificationdata:(state,payload:any)=>{
            var temp=payload.payload
            state=[...temp]
            return state
        }
    }
})