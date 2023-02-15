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

        },
        documentdownloadaction: (state, payload: PayloadAction<any>) => {

        },
        deletedocumentaction: (state, payload: PayloadAction<any>) => {

        },
        uploaddocumentaction: (state, payload: PayloadAction<any>) => {

        },
        getcandidateinfoclearanceaction: (state, payload: PayloadAction<any>) => {

        },
        acceptofferletteraction: (state, payload: PayloadAction<any>) => {

        },
        addtostatecandidateinfoclearanceaction: (state, payload: PayloadAction<any>) => {
            console.log(payload.payload)
            var clearance = payload.payload
            state = { ...state, clearance }

            return state;
        },


        verifydocumentaction: (state, payload: PayloadAction<any>) => {
            console.log("working")
            console.log(payload.payload)
        }
    }
})
export const { Candidateinfodata, candidateinfogetaction, documentdownloadaction, deletedocumentaction, uploaddocumentaction, getcandidateinfoclearanceaction, acceptofferletteraction, verifydocumentaction } = candidateinfoSlice.actions
export default candidateinfoSlice.reducer