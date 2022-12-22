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
import { InputTextarea } from 'primereact/inputtextarea'
import { candidateworkflowsubmitaction } from '../../../features/CandidateActions/candidateactiondetailsslice'
import { useDispatch } from 'react-redux'
import { Card } from 'primereact/card'
import { Panel } from 'primereact/panel'
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Toast } from 'primereact/toast';


function CandidateReview() {
  const location = useLocation()
  const navigate = useNavigate()
  const [submitted, setSubmitted] = useState(false);

  const candidatedata = location.state
  const jobdata = location.state
  const [comments, setcomments] = useState('')
  const [status, setstatus] = useState('')

  const dispatch = useDispatch()
 
  useEffect(() => {
    console.log(candidatedata)

  }, [])
  const hideDialog = () => {
    setSubmitted(false);
    // setProductDialog(false);
  };
  const handlesubmit = () => {
    console.log(comments)
    console.log(status)
    dispatch(candidateworkflowsubmitaction({


      "candidateapprovalid": candidatedata.CandidateApprovalID,

      "candidateid": candidatedata.CandidateId,

      "status": status,

      "comments": comments,

      "feedback" : null


    }))
navigate(-1)
  }
  
  return (
    <div>

      <Card>
        <Panel header='Candidate Review'>
          <CandidateDetails data={candidatedata}></CandidateDetails>
          <hr></hr>
          <br></br>
          <br></br>
          <Accordion >
            <AccordionTab header="Job Post Details">
              <JobPostDetails JobData={jobdata}></JobPostDetails>

            </AccordionTab>
          </Accordion>
          <br></br>
          <br></br>






          <div className="grid">
            <div className="md:col-3">

              <RadioButton className='ml-2' name="selectforinterview" value="Select For Interview" onChange={(e) => setstatus(e.value)} checked={status === 'Select For Interview'} id='selectforinterview' />
              <span><label className="radio-inline me-3" htmlFor='selectforinterview'>Selected for Interview
              </label>
              </span>
              <br></br>
              <br></br>


              <RadioButton className='ml-2' name="city" value="Rejected" onChange={(e) => setstatus(e.value)} checked={status === 'Rejected'} />
              <span><label className="radio-inline me-3">Rejected
              </label>
              </span>
            </div>





            <div className="md:col-8">
              <h5>Comments:</h5>
              <InputTextarea cols={60} value={comments} onChange={e => setcomments(e.target.value)}></InputTextarea>

            </div>
            <div className="md:col-1">
              <div className="field col-12 md:col-4">
                <div style={{ float: "right", position: "relative", display: "flex" }}>

                  <Button className="mr-4" onClick={e => { navigate(-1) }}> Cancel</Button>
                  <Button onClick={e => handlesubmit()} >Submit</Button>
                </div>

              </div>



            </div>





          </div>
        </Panel>

      </Card>
    </div>

  )
}

export default CandidateReview


