import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { generatepdf } from '../../api/agent'
import { genpdf } from '../../features/Downloadpdfs/pdfslice'
import { getJobPostActionfromapi, IJobPost } from '../../features/JobPostActions/jobpostactionsslice'
import { Panel, PanelHeaderTemplateOptions } from 'primereact/panel';
import { Ripple } from 'primereact/ripple';
function JobPostDetails(props) {

  const jobdata = props.JobData
  
  const dispatch = useDispatch()
console.log(jobdata)
const formatCurrency = (value: any) => {
useEffect(()=>{
console.log(jobdata)
},[])
  return value?value.toLocaleString('en-US', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }):'';


}
  return (
    <div>
      {/* <Card title="Job Post Details" style={{ width: '100%', marginBottom: '2em' }}> */}
      <div className="grid">
        <div className="md:col-4">

          <p >
            <span className="" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>Job Code  </span>
            <span style={{ fontWeight: "400" }}>: {jobdata?.JobCode}</span>
          </p>

          <p ><span className="custom-label-2" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>Service line  </span><span className="font-w400">: {jobdata?.serviceline_name}</span></p>
          <p ><span className="custom-label-2" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>Industry   </span><span className="font-w400">: {jobdata?.industry_name
} </span></p>
          <p ><span className="custom-label-2" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>Employement Type  </span><span className="font-w400">: {jobdata?.EmploymentType} {jobdata?.Duration > 0 ? <>({jobdata?.Duration} months)</> : <></>}</span></p>
          <p ><span className="custom-label-2" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>Experience Level </span><span className="font-w400">: {jobdata?.experience_Level}</span></p>
        </div>


        <div className="md:col-4">
          <p >
            <span className="" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>Company Name   </span>
            <span style={{ fontWeight: "400" }}>: {jobdata.company_name}</span>
          </p>

          <p ><span className="custom-label-2" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>Customer </span><span className="font-w400">: {jobdata?.customer_name}</span></p>
          {/* <p ><span className="custom-label-2" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>Job Title  </span><span className="font-w400">: {jobdata?.JobTitle}</span></p> */}

          <p ><span className="custom-label-2" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>MaximumCTC </span><span className="font-w400">: {formatCurrency(jobdata?.MaximumCTC)}</span></p>
          <p ><span className="custom-label-2" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>No. Of Positions  </span><span className="font-w400">: {jobdata?.NoOfPositions}</span></p>
          <p ><span className="custom-label-2" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>On Boarding Date  </span><span className="font-w400">: {new Date(jobdata?.OnBoardingDate).toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })}</span></p>
        </div>


        <div className="md:col-4">
          <p >
            <span className="" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>Business Unit </span>
            <span style={{ fontWeight: "400" }}>: {jobdata?.businessunit_name}</span>
          </p>

          <p ><span className="custom-label-2" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>Location  </span><span className="font-w400">: {jobdata?.location_name}</span></p>
          <p ><span className="custom-label-2" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}> Experiance Range </span><span className="font-w400">: {jobdata?.MinimumExperiance } - {jobdata?.MaximumExperiance} years</span></p>
          <p ><span className="custom-label-2" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>Highest Qualification  </span><span className="font-w400">: {jobdata?.Qualification}</span></p>
          <p ><span className="custom-label-2" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>PO Reference</span> <span className="font-w400">: {jobdata?.POReference}</span></p>

        </div>






      </div>

      <hr></hr>
      <div className="grid">
        <div className="md:col-12">
          <p style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>
            Job Title
          </p>
          <span>
            : {jobdata?.JobTitle}
          </span>
          <p >





            <div className="grid">
              <div className="">
                <span className="" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600",marginLeft:"8px" }}>Job Description  </span>
              </div>:
              <div className="" style={{marginLeft:"3px"}}>
                <span style={{ fontWeight: "400" }}>
                  <span className="" style={{}}>

                     {

                      jobdata?.JobDesc.split("\n").map((i) => <p>{i}</p>)
                    }


                  </span>


                </span>
              </div>
            </div>

          </p>

          {/* {console.log(jobdata)} */}
          {jobdata.approversDetails ?
            <>  <Panel header="Busines Head Approver">
              <div className="grid">
                <div className="md:col-4">
                  Name : {jobdata.approversDetails[0].FirstName + ", " + jobdata.approversDetails[0].LastName}
                </div>
                <div className="md:col-2">
                  Status : {jobdata.approversDetails[0].approvalStatus == "N" ? "Pending" : jobdata.approversDetails[0].approvalStatus == "R" ? "Rejected" : "Approved"}
                </div>
                <div className="md:col-2">
                  Approval Date : {jobdata.approversDetails[0].approvalDate ? <>{new Date(jobdata.approversDetails[0].approvalDate).toLocaleDateString('en-US', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })}</> : <></>
                  }
                </div>
                <div className="md:col-4">
                  Comments : {jobdata.approversDetails[0].approvalComments
                  }
                </div>
              </div>
            </Panel>
              <br></br>
              <Panel header="HR Details">
                <div className="grid">
                  <div className="md:col-4">
                    Name : {jobdata.approversDetails[1].FirstName + ", " + jobdata.approversDetails[1].LastName}
                  </div>
                  <div className="md:col-2">
                    Status : {jobdata.approversDetails[1].approvalStatus == "N" ? "Profiles Pending" : jobdata.approversDetails[0].approvalStatus == "R" ? "Rejected" : "Approved"}
                  </div>
                  {/* <div className="md:col-5">
                  Comments : {jobdata.approversDetails[1].approvalComments
                  }
                </div> */}

                </div>
              </Panel></>
            : <></>}
          {/* <DataTable value={null} showGridlines={false} responsiveLayout="scroll" paginator={true} >
<Column field=''></Column>

</DataTable> */}



        </div>
      </div>


    </div>
  )
}

export default JobPostDetails