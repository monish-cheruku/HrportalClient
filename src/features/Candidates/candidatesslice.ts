import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IJobPost {
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
        ExperianceLevel: String


}
const initialState: IJobPost[] = [];

export const CandidateSlice = createSlice({
    name: 'Candidate',
    initialState,
    reducers: {
        Candidatedata:  (state, payload: any) => {
            var temp=payload.payload
            state=[...temp]
          
            // console.log(state)
            return state;
        },
        
        
        
        
        //functions for sagas watching
        getCandidatefromapi:(state,payload:PayloadAction<any>)=>{
            // console.log(payload)
        },
        createnewjobpost:(state,payload:PayloadAction<any>)=>{
console.log(payload)
        },
        updateICandidate:(state,payload:PayloadAction<any>)=>{

        },
        candidatessubmit:(state,payload:PayloadAction<any>)=>{

        },
        
       
       

    },
});
export const {Candidatedata,getCandidatefromapi,createnewjobpost,updateICandidate,candidatessubmit}=CandidateSlice.actions
export default CandidateSlice.reducer