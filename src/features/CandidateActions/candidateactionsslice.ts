import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface ICandidate {
    // id: number,
    // JobPostApprovalID: number,
    // JobPostID: number,
    // JobCode: String,
    // UserName: String,
    // HiringManager:  String,
    // ApproverName: String,
    // ApproverDisplayName:String,
    // ApproverEmail: String,
    // JobTitle: String,
    // JobDesc: String,
    // EmploymentType:String,
    // Duration: String,
    // NoOfPositions: number,
    // Qualification: String,
    // OnBoardingDate: string,
    // POReference: number,
    // Stage: String,
    // StageDesc: String,
    // Industry: String,
    // Company: String,
    // BusinessUnit: String,
    // ServiceLine:  String,
    // Customer: String,
    // Location: String,
    // ExperianceLevel: String



    Jobpost:String
    Job_Code:String
    HRUserName: String,

CanFirstName: String
CanLastName: String
CandidateCode:String
CandidateId:Number
ContactNo:Number
Qualification: String
ExpectedDOJ:Date
Job_Post_ID:1
OverallExpYear:4
OverallExpMonth:4
ReleventExpYear:3
ReleventExpMonth:6
CurrentCTC:100000
ExpectedCTC:100000
NegotiatedCTC:0
Stage:String
CurrentOrganization:String
CurrentJobLocation:String
Skills:String
Email:String
ConatctNo:932234566
AvgApprovedCTC:100000
AvgBillRate:23
Resume:File
CreatedBy:String
ModifiedBy:String
ModifiedOn:Date
CreatedOn:Date


}

const initialState: ICandidate[] = [];
export const CandidateActionSlice = createSlice({
    name: 'CandidateAction',
    initialState:initialState,
    reducers: {
        Candidatedata:  (state, payload: any) => {
           
            var temp=payload.payload
            state=[...temp]
          
            // console.log(state)
            return state;
        },
        
        createnewcandidate:(state,payload:PayloadAction<any>)=>{
// console.log(payload)
        },
        updatecandidate:(state,payload:PayloadAction<any>)=>{
console.log("updating cand")
        },
        
        getCandidatefromapi:(state,payload:PayloadAction<any>)=>{
            // console.log(payload)
        },
       

    },
}


)
export const {Candidatedata,getCandidatefromapi,createnewcandidate,updatecandidate}=CandidateActionSlice.actions
export default CandidateActionSlice.reducer