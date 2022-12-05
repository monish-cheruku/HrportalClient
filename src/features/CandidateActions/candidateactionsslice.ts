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
export const CandidateActionSlice = createSlice({
    name: 'CandidateAction',
    initialState:initialState,
    reducers: {
        Candidatedata:  (state, payload: any) => {
            var temp=payload.payload
            state=[...temp]
          
            console.log(state)
            return state;
        },
        
        createnewcandidate:(state,payload:PayloadAction<any>)=>{
console.log(payload)
        },
        updatenewcandidate:(state,payload:PayloadAction<any>)=>{

        },
        
        getCandidatefromapi:(state,payload:PayloadAction<any>)=>{
            console.log(payload)
        },
       

    },
}


)
export const {Candidatedata,getCandidatefromapi,createnewcandidate,updatenewcandidate}=CandidateActionSlice.actions
export default CandidateActionSlice.reducer