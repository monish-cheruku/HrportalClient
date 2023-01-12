import { createSlice, PayloadAction} from "@reduxjs/toolkit"
export interface Iglobalstore{
    dashboardactivetab:String,
    candidateinfoactivetab:number
}
const initialState:Iglobalstore={
    dashboardactivetab: "",
    candidateinfoactivetab:0

}


export const globalSlice=createSlice({
    name:"global",
    initialState,
    reducers:{
        setdashboardactivetab:(state,payload)=>{
            state.dashboardactivetab=payload.payload

            return state
        },
        setnextcandidateinfotab:(state,payload:PayloadAction<any>)=>{
            console.log("+1")
            state.candidateinfoactivetab+=1
            return state
        },
        setprevcandidateinfotab:(state,payload:PayloadAction<any>)=>{
            console.log("-1")
            state.candidateinfoactivetab-=1
            return state
        },
        setcandidateinfotab:(state,payload:PayloadAction<any>)=>{
            console.log(payload.payload)
            state.candidateinfoactivetab=payload.payload
            return state
        }

    }

})
export const {setdashboardactivetab,setnextcandidateinfotab,setprevcandidateinfotab,setcandidateinfotab}=globalSlice.actions
export default globalSlice.reducer