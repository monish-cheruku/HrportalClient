import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ICandidate {
    id: number,
    JobPostApprovalID: number,
    JobPostID: number,
    JobCode: String,
    UserName: String,
    HiringManager:  String,
    ApproverName: String,
    ApproverDisplayName:String,
    ApproverEmail: String,
    JobTitle: String,
    JobDesc: String,
    EmploymentType:String,
    Duration: String,
    NoOfPositions: number,
    Qualification: String,
    OnBoardingDate: string,
    POReference: number,
    Stage: String,
    StageDesc: String,
    Industry: String,
    Company: String,
    BusinessUnit: String,
    ServiceLine:  String,
    Customer: String,
    Location: String,
    ExperianceLevel: String,
    approversDetails:any

}
const initialState: ICandidate[] = [];

const candidateactionSlice=createSlice({
    name: 'Candidateactiondetails',
    initialState,
    reducers:{
        Candidates:(state,payload:PayloadAction<any>)=>{
            var temp=payload.payload
            state=[...temp]
          
            return state;

    },



    candidateaction:(state,payload:PayloadAction<any>)=>{

    }
},
})
export const{Candidates,candidateaction}=candidateactionSlice.actions
export default candidateactionSlice.reducer