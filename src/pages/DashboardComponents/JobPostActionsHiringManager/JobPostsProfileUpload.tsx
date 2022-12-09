import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { Checkbox } from 'primereact/checkbox'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { InputTextarea } from 'primereact/inputtextarea'
import { RadioButton } from 'primereact/radiobutton'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { RootState } from '../../../app/store'
import { getCandidatefromapi } from "../../../features/CandidateActions/candidateactionsslice"
import { genpdf } from '../../../features/Downloadpdfs/pdfslice'
// import { getJobPostActionfromapi, IJobPost, jobpostactionssubmit } from '../../features/JobPostActions/jobpostactionsslice'
import { getJobPostActionfromapi, IJobPost, jobpostactionssubmit } from '../../../features/JobPostActions/jobpostactionsslice'
import JobPostDetails from '../../DashboardComponents/JobPostDetails'
import CandidateDetails from '../CandidateDetails'


function JobPostProfileUpload() {
    const jobsdata = useSelector((store: RootState) => store.JobPostAction)
    const Logindata = useSelector((store: RootState) => store.Login)
    const candidatesdata = useSelector((store: RootState) => store.CandidateAction)
    const billrate = useSelector((store: RootState) => store.ManageBill)

    const [submitted, setSubmitted] = useState(false);

    const { JobCode } = useParams()
    const [editmode, setEditmode] = useState(false);
    // console.log(JobCode)
    //     const [jobpostobject,setJobpostobject]=useState()
    // const jobpostdata=useSelector(store=>store.JobPostAction)
    //     console.log(jobcode)
    const [res, setres] = useState("")
    const [comments, setcomments] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [issave, setissave] = useState(false);
    const [productDialog, setProductDialog] = useState(false);
    const [jobdata, setjobdata] = useState<IJobPost>(jobsdata.filter((i) => i.JobCode == JobCode)[0])
    useEffect(() => {
        if (jobdata == null) {
            // console.log(jobdata)
            // console.log(Logindata.username)
            dispatch(getJobPostActionfromapi(Logindata.username))
            // dispatch(getJobPostActionfromapi("sbatchu"))
        }
        // console.log(Logindata)
        setjobdata(jobsdata.filter((i) => i.JobCode == JobCode)[0])
        dispatch(getCandidatefromapi({
            "jobpostID": jobdata.JobPostID
        }))
        // console.log(jobdata.AvgApprovedCTC)
       
// billrate.forEach((i)=>
// (i.BusinessUnitId==
//     )
        // console.log(billrate)
    }, [])
    const hideDialog = () => {
        setissave(false)
        setSubmitted(false);
        setProductDialog(false);
    };
    // console.log(jobdata)
    // const onsubmithandle = () => {
    //     // console.log(res)
    //     // console.log(comments)



    //     var payloaddata: any = {}
    //     if (res) {

    //         payloaddata.JobPostApprovalId = jobdata?.JobPostApprovalID
    //         payloaddata.JobPostId = jobdata.id
    //         payloaddata.ApprovalStatus = res
    //         payloaddata.ApprovalComments = comments
    //     }
    //     if (res) {
    //         if (!(res == "R" && comments == "")) {

    //             console.log(payloaddata)
    //             dispatch(jobpostactionssubmit(payloaddata))
    //         }
    //     }
    // }

    const actionBodyTemplate = (data) => {
        return (
            <React.Fragment>
                <Button
                    icon="pi pi-pencil"
                    className="p-button-rounded p-button-success mr-2"
                    onClick={(e) => {
                        // setEditmode(true);
                        // console.log(rowdata)
                        // setCompanyid(data.CompanyId);
                        // setCompanydesc(data.CompanyDesc);
                        // setCompanyname(data.CompanyName);
                        // setActive(data.Active);
                        // setProductDialog(true);
                        navigate("/candidate/updatecandidateprofile",{state:{data}})
                    }}
                />
            </React.Fragment>
        );
    };
    const productDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button
                label="Save"
                icon="pi pi-check"
                className="p-button-text"
                onClick={() => {
                    setissave(true);
                    // console.log(companyname);
                    // console.log(companydesc);
                    // console.log(active);
                    // var c = {
                    //     CompanyId: companyid,
                    //     CompanyName: companyname,
                    //     CompanyDesc: companydesc,
                    //     Active: active,
                    // };
                    // if(companyname!="")
                    // {
                    // if (editmode === false) {
                    //     dispatch(createcompanyaction(c));
                    // } else {
                    //     dispatch(updatecompanyaction(c));
                    // }
                    // setProductDialog(false);}
                    // axios.post("http://10.154.155.135:8000/api/company");
                    // hideDialog();
                }}
            />
        </React.Fragment>
    );
    const nametemplate = (rowdata) => {
        return (
            <>{rowdata.CanFirstName + ", " + rowdata.CanLastName}</>
        )
    }
    const exptemplate=(rowdata)=>{
        return(
            <div>{rowdata.OverallExpYear +"."+rowdata.OverallExpMonth+" Years"}</div>
        )
    }
    const linktemplate=(rowdata) =>{
        return(
            <Link to="/candidate/candidatedetails" state={rowdata}>{rowdata.CandidateCode}</Link>
        )
    }

    return (
        <div>
            <Card title="Job Post Details">

                <div style={{textAlign:"right",marginRight:"100px"}}>

                    <Button className='' style={{ }} onClick={e => {
                        dispatch(genpdf({ "JobPostId": jobdata.JobPostID }))


                    }}>Generate pdf</Button>

                </div>
                <br></br>
                <div>

                    <JobPostDetails JobData={jobdata}></JobPostDetails>
                </div>
                <div style={{textAlign:"center"}} >

                <Button onClick={e => navigate("/candidate/createcandidateprofile",{state:{"jobdata":jobdata}})}>Add New Candidate</Button>
                </div>
                <br></br>
                <br></br>
                <DataTable value={candidatesdata} showGridlines={true} responsiveLayout="scroll" style={{}}>
                    <Column field="CandidateCode" header="Code" body={linktemplate}></Column>
                    <Column field="Name" header="Name" body={nametemplate} ></Column>
                    <Column field="OverallExpYear" header="Overall Experience (in years)" body={exptemplate}  ></Column>
                    <Column field="ExpectedDOJ" header="Expected DOJ" ></Column>
                    <Column field="ExpectedCTC" header="Expected CTC" ></Column>
                    <Column field="Email" header="Email" ></Column>
                    <Column field="stage_name" header="Status" ></Column>
                    {/* <Column field="Action" header="Action" ></Column> */}
                    <Column field="Action" header="Edit" body={actionBodyTemplate} exportable={false}></Column>


                </DataTable>
            </Card>
        </div>
    )

}

export default JobPostProfileUpload