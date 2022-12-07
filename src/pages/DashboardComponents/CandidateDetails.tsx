import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { RootState } from '../../app/store'
import { getCandidatefromapi } from '../../features/CandidateActions/candidateactionsslice'
import { downloadresume } from '../../features/Downloadpdfs/pdfslice'
import JobPostDetails from './JobPostDetails'
function CandidateDetails(props) {
    const formatCurrency = (value: any) => {

        return value.toLocaleString('en-US', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });


    }
    const formatDollar = (value: any) => {

        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

    }
    const location = useLocation()
    // const approversdata = useSelector((store: RootState) => store.approversdetails)

    const candidatedata = location.state
    useEffect(() => {
        console.clear()
        console.log(location.state)
    }, [])
    const nametemplate = (rowdata) => {
        return (
            <>{rowdata.FirstName + ", " + rowdata.LastName}</>
        )
    }
   const dispatch = useDispatch()

   const statustemplate = (rowdata) =>{
    return(
<>
   { rowdata.approvalStatus=="N"&&<span>Pending</span>}
   { rowdata.approvalStatus=="A"&&<span>Approved</span>}
   { rowdata.approvalStatus=="R"&&<span>Rejected</span>}

</>
    )
   }
   const datetemplate=(rowdata)=>{
    var temp=rowdata.CreatedOn
    var tempstr;
    tempstr=new Date(temp).getFullYear().toString()+"/"+new Date(temp).getMonth().toString()+"/"+new Date(temp).getDate().toString()
return (
    <>{tempstr}
    </>
)
   }
    return (
        <div>
            <Card title="Candidate Details" style={{ width: '100%', marginBottom: '2em' }}>
                <div className="grid">
                    <div className="md:col-4">


                        <p ><span className="custom-label-2" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>First Name : </span><span className="font-w400">{candidatedata?.CanFirstName}</span></p>
                        <p ><span className="custom-label-2" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>Overall Experience :</span> <span className="font-w400">{candidatedata?.OverallExpYear}.{candidatedata?.OverallExpMonth} years</span></p>
                        <p ><span className="custom-label-2" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>Current Organization : </span><span className="font-w400">{candidatedata?.CurrentOrganization}</span></p>
                        <p ><span className="custom-label-2" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}> Email: </span><span className="font-w400">{candidatedata?.Email}</span></p>
                    </div>


                    <div className="md:col-4">
                        <p >
                            <span className="" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>Last Name :  </span> <span className="font-w400">{candidatedata?.CanLastName}</span>

                        </p>

                        <p ><span className="custom-label-2" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>Relevant Experience : </span><span className="font-w400">{candidatedata?.ReleventExpYear}.{candidatedata?.ReleventExpMonth} years</span></p>
                        <p ><span className="custom-label-2" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>Location : </span><span className="font-w400">{candidatedata?.CurrentJobLocation}</span></p>
                        <p ><span className="custom-label-2" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>Contact No : </span><span className="font-w400">{candidatedata?.ContactNo}</span></p>
                    </div>


                    <div className="md:col-4">
                        <p ><span className="" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>Highest Qualification : </span><span style={{ fontWeight: "400" }}>{candidatedata?.Qualification}</span></p>
                        <p ><span className="custom-label-2" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>Skills : </span><span className="font-w400">{candidatedata?.Skills}</span></p>
                        <p ><span className="custom-label-2" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>Expected DOJ : </span><span className="font-w400">{candidatedata?.ExpectedDOJ}</span></p>
                    </div>
                </div>

                {/* <br></br> */}
                <div className="grid">
                    <div className="md:col-4">

                        <p ><span className="custom-label-2" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>Current CTC : </span><span className="font-w400">{formatCurrency(candidatedata?.CurrentCTC)}</span></p>

                        {/* <p ><span className="custom-label-2" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>Expected CTC : </span><span className="font-w400">{candidatedata?.ExpectedCTC}</span></p> */}
                        <p ><span className="custom-label-2" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>Resume : </span><span className="font-w400"><Button onClick={event =>{dispatch(downloadresume({'Resume': candidatedata?.Resume.split('/')[2]}))}} >Resume</Button></span></p>
                    </div>
                    {/* candidatedata?.Resume.split('/')[2] */}
                    <div className="md:col-4">
                        <p ><span className="custom-label-2" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>Expected CTC : </span><span className="font-w400">{formatCurrency(candidatedata?.ExpectedCTC)}</span></p>
                        <p ><span className="custom-label-2" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>Average approved CTC : </span><span className="font-w400">{formatCurrency(candidatedata?.AvgApprovedCTC)}</span></p>
                    </div>
                    <div className="md:col-4">

                        <p ><span className="custom-label-2" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>Negotiated CTC : </span><span className="font-w400">{candidatedata?.NegotiatedCTC}</span></p>
                        <p ><span className="custom-label-2" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>Avg Bill rate($): </span><span className="font-w400">{formatDollar(candidatedata?.AvgBillRate)}</span></p>
                    </div>
                </div>
                <div>
            <br></br>
            <br></br>
            <h5>Candidate Work Flow Details</h5>
            <DataTable  value={candidatedata.approversDetails}showGridlines={true} responsiveLayout="scroll" >
                <Column field="approverName" header="Approver Name"  ></Column>
                <Column field="Name" header="Name" body={nametemplate} ></Column>
                <Column field="approvalStatus" header="Approval Status" body={statustemplate}  ></Column>
                <Column field="CreatedOn" header="Date" body={datetemplate} ></Column>
                <Column field="role_name" header="Role Name" ></Column>      
                <Column field="stage_name" header="Stage" ></Column>      
                     
            </DataTable>
        </div>

            </Card>
          
        </div>
        
    )
   
}

export default CandidateDetails