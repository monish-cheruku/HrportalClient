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
import { getCandidatefromapi } from '../../../features/Candidates/candidatesslice'
import { getJobPostActionfromapi, IJobPost, jobpostactionssubmit } from '../../../features/JobPostActions/jobpostactionsslice'
import JobPostDetails from '../JobPostDetails'



function JobPostProfileUpload() {
    const jobsdata = useSelector((store: RootState) => store.JobPostAction)
    const Logindata = useSelector((store: RootState) => store.Login)
    const candidatesdata=useSelector((store:RootState)=>store.Candidate)
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
            console.log(jobdata)
            console.log(Logindata.username)
            dispatch(getJobPostActionfromapi(Logindata.username))
            // dispatch(getJobPostActionfromapi("sbatchu"))
        }
        console.log(Logindata)
        setjobdata(jobsdata.filter((i) => i.JobCode == JobCode)[0])
        dispatch(getCandidatefromapi({
            "jobpostID":jobdata.JobPostID
        }))
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
                        setEditmode(true);
                        // console.log(rowdata)
                        // setCompanyid(data.CompanyId);
                        // setCompanydesc(data.CompanyDesc);
                        // setCompanyname(data.CompanyName);
                        // setActive(data.Active);
                        setProductDialog(true);
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
                    setissave (true);
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

    return (
        <div>
            <JobPostDetails JobData={jobdata}></JobPostDetails>
            <Button>Add Candidate</Button>
            <DataTable value={candidatesdata}  showGridlines={true} responsiveLayout="scroll" >
                <Column field="CandidateCode" header="Code" ></Column>
                <Column field="Name" header="Name" ></Column>
                <Column field="OverallExpYear" header="Experience" ></Column>
                <Column field="ExpectedDOJ" header="Expected DOJ" ></Column>
                <Column field="ExpectedCTC" header="Expected CTC" ></Column>
                <Column field="Email" header="Email" ></Column>
                <Column field="stage_name" header="Status" ></Column>
                {/* <Column field="Action" header="Action" ></Column> */}
                <Column field="Action" header="Edit" body={actionBodyTemplate} exportable={false}></Column>


            </DataTable>
        </div>
    )

}

export default JobPostProfileUpload