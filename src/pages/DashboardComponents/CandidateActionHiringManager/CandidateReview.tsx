import React, { useEffect, useState } from 'react'
import CandidateDetails from '../CandidateDetails'
import JobPostDetails from '../JobPostDetails'
import { Imyjobpost } from '../../../features/JobPostActions/myjobpostsslice'
import { getJobPostActionfromapi, IJobPost } from '../../../features/JobPostActions/jobpostactionsslice'
import { useSelector } from 'react-redux'
import { RootState } from '../../../app/store'
import { useParams } from 'react-router-dom'
import { useLocation, useNavigate } from 'react-router'
import JobpostsactionApproval from '../JobPostActionsHiringManager/JobpostsactionApproval'
import { Button } from 'primereact/button'
import { RadioButton } from 'primereact/radiobutton'
function CandidateReview() {
    const location = useLocation()
    const navigate=useNavigate()

    const candidatedata = location.state
    const jobdata = location.state

    useEffect(() => {
        console.log(candidatedata)

    }, [])

    return (
        <div>
            <CandidateDetails data={candidatedata}></CandidateDetails>
            <hr></hr>
            <br></br>
            <br></br>
            <JobPostDetails JobData={jobdata}></JobPostDetails>
            <br></br>
            <br></br>
            <span><label className="radio-inline me-3">Selected for Interview
              <RadioButton className='ml-2' inputId="city4" name="city" value="R"  />
            </label>
            </span>
            <br></br>
            <span><label className="radio-inline me-3">Shortlist (No Interview Required)
              <RadioButton className='ml-2' inputId="city4" name="city" value="R"  />
            </label>
            </span>
            <br></br>
            <span><label className="radio-inline me-3">Rejected
              <RadioButton className='ml-2' inputId="city4" name="city" value="R"  />
            </label>
            </span>
            <div  style={{float:"right",position:"relative"}}>

<Button className="mr-4"  onClick={e=>{navigate(-1)}}> Cancel</Button>
<Button >Submit</Button>
            </div>

        </div>
    )
}

export default CandidateReview


