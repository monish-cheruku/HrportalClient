import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Iannexure {
    
       

}
const initialState: Iannexure={} ;

const selectedcandidatesSlice=createSlice({
    name: 'annexure',
    initialState,
    reducers:{
        annexuredata:(state,payload:PayloadAction<any>)=>{
            // console.log("setting candidate details")
            var temp=payload.payload
            state=temp
          
            return state;

    },



    // annexuregetaction:(state,payload:PayloadAction<any>)=>{

    // },
    
 
    
},
})
export const{annexuredata }=selectedcandidatesSlice.actions
export default selectedcandidatesSlice.reducer