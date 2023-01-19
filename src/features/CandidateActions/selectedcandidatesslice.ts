import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ISelectedCandidates {
    
        id: Number
        CandidateApprovalID: Number,
        RoleName:  String,
        CandidateID: Number,
        CandidateCode: String,
        CandidateFirstName: String,
        CandidateLastName: String,
        CandidateName: String,
        ContactNo: String,
        CurrentCTC: Number,
        ExpectedCTC: Number,
        NegotiatedCTC: Number,
        Skills: String,
        CandidateResume: String,
        CurrentOrg: String,
        CurrentJobLocation: String,
        Email: String,
        ExpectedDOJ: String,
        CandidateReleventExp: String,
        CandidateOverallExp: String,
        HighestQualification: String,
        CandidateAvgApprovedCTC: Number,
        CandidateAvgBillRate: Number,
        JobPostID: Number,
        JobCode: String,
        UserName: String,
        HiringManager: String,
        ApproverName: String,
        ApproverDisplayName: String,
        ApproverEmail: String,
        JobTitle: String,
        JobDesc: String,
        EmploymentType: String,
        Duration: Number,
        NoOfPositions: Number,
        Qualification: String,
        OnBoardingDate: String,
        POReference: String,
        StageName: String,
        StageDesc: String,
        IndustryName: String,
        CompanyName: String,
        BusinessUnitName: String
        ServiceLineName: String,
        CustomerName: String,
        LocationName: String,
        ExperienceLevel: String,
        AvgApprovedCTC: Number,
        AvgBillRate: Number
    

}
const initialState: ISelectedCandidates[] = [];

const selectedcandidatesSlice=createSlice({
    name: 'selectedcandidates',
    initialState,
    reducers:{
        selectedandidatesdata:(state,payload:PayloadAction<any>)=>{
            // console.log("setting candidate details")
            var temp=payload.payload
            state=[...temp]
          
            return state;

    },



    selectedcandidatesaction:(state,payload:PayloadAction<any>)=>{

    },
    updateselectedcandidatesaction:(state,payload:PayloadAction<any>)=>{

    },
 
    
},
})
export const{selectedandidatesdata,selectedcandidatesaction,updateselectedcandidatesaction }=selectedcandidatesSlice.actions
export default selectedcandidatesSlice.reducer