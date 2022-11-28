import { Card } from 'primereact/card'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { getJobPostActionfromapi, IJobPost } from '../../features/JobPostActions/jobpostactionsslice'

function JobPostDetails(props) {
   
    const jobdata=props.JobData
   
  return (
    <div>
<Card title="Job Post Details" style={{ width: '100%', marginBottom: '2em' }}>
        <div className="grid">
          <div className="md:col-4">
            <p >
              <span className="" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>Job Code : </span>
              <span style={{ fontWeight: "400" }}>{jobdata?.JobCode}</span>
            </p>

            <p ><span className="custom-label-2" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>Service line : </span><span className="font-w400">{jobdata?.ServiceLine}</span></p>
            <p ><span className="custom-label-2" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>Employement Type : </span><span className="font-w400">{jobdata?.EmploymentType}</span></p>
            <p ><span className="custom-label-2" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>Experience Level : </span><span className="font-w400">{jobdata?.ExperianceLevel}</span></p>
            <p ><span className="custom-label-2" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>PO Reference :</span> <span className="font-w400">{jobdata?.POReference}</span></p>
          </div>


          <div className="md:col-4">
            <p >
              <span className="" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>Company Name :  </span>
              <span style={{ fontWeight: "400" }}>BE - 001</span>
            </p>

            <p ><span className="custom-label-2" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>Customer : </span><span className="font-w400">{jobdata?.Customer}</span></p>
            <p ><span className="custom-label-2" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>Job Title : </span><span className="font-w400">{jobdata?.JobTitle}</span></p>
            <p ><span className="custom-label-2" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>On Boarding Date : </span><span className="font-w400">{jobdata?.OnBoardingDate}</span></p>
          </div>


          <div className="md:col-4">
            <p >
              <span className="" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>Business Unit: </span>
              <span style={{ fontWeight: "400" }}>{jobdata?.BusinessUnit}</span>
            </p>

            <p ><span className="custom-label-2" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>Location : </span><span className="font-w400">{jobdata?.Location}</span></p>
            <p ><span className="custom-label-2" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>No. Of Positions : </span><span className="font-w400">{jobdata?.NoOfPositions}</span></p>
            <p ><span className="custom-label-2" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>Highest Qualification : </span><span className="font-w400">{jobdata?.Qualification}</span></p>
          </div>






        </div>


        <div className="grid">
          <div className="md:col-12">
            <p style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>
              Job Title : 
            </p>
            <p>
              {jobdata?.JobTitle}
            </p>
            <p >
              <span className="" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>Job Description : </span>
              <span style={{ fontWeight: "400" }}>
                <div className="ps-4 vstack gap-2" style={{ margin: "10px 0px 5px 20px" }}>
                  {/* <ul className="ps-4 vstack gap-2"> */}
                  {/* <p>Arrange mechanical and electrical tests on prototype components.</p>
                  <p>Carry out research for green initiatives and other product innovations.</p>
                  <p>Carry out tests on numerical models against design failures of prototypes</p> */}
                  {/* <li>Decide possible business applications of IP to support goals</li> */}
                  {

                    // <p>{jobdata?.JobDesc}</p>
                   jobdata?.JobDesc.split("\n").map((i)=><p>{i}</p>)
                  }

                  {/* </ul> */}

                </div>


              </span>
            </p>

          </div>
        </div>

      </Card>

    </div>
  )
}

export default JobPostDetails