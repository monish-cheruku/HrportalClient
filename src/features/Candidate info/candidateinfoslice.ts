import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState: any = {};

const candidateinfoSlice = createSlice({
    name: 'candidateinfo',
    initialState,
    reducers: {
        Candidateinfodata: (state, payload: PayloadAction<any>) => {
            // console.log("setting candidate details")
            var temp = payload.payload
            state = temp

            return state;

        },
        candidateinfogetaction: (state, payload: PayloadAction<any>) => {
            
        }







    },
})
export const { Candidateinfodata, candidateinfogetaction } = candidateinfoSlice.actions
export default candidateinfoSlice.reducer