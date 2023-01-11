import { createSlice} from "@reduxjs/toolkit"
export interface Iglobalstore{
    dashboardactivetab:String
}
const initialState:Iglobalstore={
    dashboardactivetab: ""
}


export const globalSlice=createSlice({
    name:"global",
    initialState,
    reducers:{
        setdashboardactivetab:(state,payload)=>{
            state.dashboardactivetab=payload.payload

            return state
        }

    }

})
export const {setdashboardactivetab}=globalSlice.actions
export default globalSlice.reducer