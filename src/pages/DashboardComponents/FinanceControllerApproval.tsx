import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { Button } from 'primereact/button'
import { RadioButton } from 'primereact/radiobutton'
import { InputTextarea } from 'primereact/inputtextarea'
// import { candidateworkflowsubmitaction } from '../../../features/CandidateActions/candidateactiondetailsslice'
import { useDispatch, useSelector } from 'react-redux'
import { Card } from 'primereact/card'
import { Panel } from 'primereact/panel'
import { prevfeedbacksaction } from '../../features/CandidateActions/prevfeedbacks'
import { RootState } from '../../app/store'
import { Accordion, AccordionTab } from 'primereact/accordion'
import CandidateDetails from './CandidateDetails'
import JobPostDetails from './JobPostDetails'
import CandidatePrevFeedbacks from './CandidateActionHiringManager/CandidatePrevFeedbacks'
import { financecontrollerapprovalsubmitaction } from '../../features/CandidateActions/candidateactiondetailsslice'


function FinanceControllerApproval() {
  const location = useLocation()
  const navigate = useNavigate()
  const [submitted, setSubmitted] = useState(false);

  const candidatedata = location.state
  const jobdata = location.state
  const [comments, setcomments] = useState('')
  const [status, setstatus] = useState('')
const [res, setres] = useState("")
  const dispatch = useDispatch()
  const prevfeedbacks = useSelector((state: RootState) => state.prevfeedback)

  useEffect(() => {
    console.log(candidatedata)
    dispatch(prevfeedbacksaction({

      "Candidate_ID": candidatedata.CandidateId



    }))
  }, [])
  const hideDialog = () => {
    setSubmitted(false);
    // setProductDialog(false);
  };
  const handlesubmit = () => {
    console.log(comments)
    console.log(status)
    console.log(
      {
  
  
            "candidateapprovalid": candidatedata.CandidateApprovalID,
      
            "candidateid": candidatedata.CandidateId,
      
            "status": status,
      
            "comments": comments,
      
      
      
          }
     )
    dispatch(financecontrollerapprovalsubmitaction({


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
          <CandidatePrevFeedbacks  feedbacks={prevfeedbacks} comments={candidatedata.Comments}></CandidatePrevFeedbacks>






          <div className="grid">
            <div className="md:col-3">

              <RadioButton className='ml-2' name="selectforinterview" value="FC Approval" onChange={(e) => setstatus(e.value)} checked={status === 'FC Approval'} id='selectforinterview' />
              <span><label className="radio-inline me-3" htmlFor='selectforinterview'>Approve
              </label>
              </span>
              <br></br>
              <br></br>


              <RadioButton className='ml-2' name="city" value="FC Approval Rejected" onChange={(e) => setstatus(e.value)} checked={status === 'FC Approval Rejected'} />
              <span><label className="radio-inline me-3">Reject
              </label>
              </span>
            </div>





            <div className="md:col-8">
              <h5>Comments:</h5>
              <InputTextarea cols={60} value={comments} onChange={e => setcomments(e.target.value)}></InputTextarea>
              <small hidden={res == "Rejected" && comments == "" ? false : true} id="username2-help" className={status == "Rejected" && comments == "" ? "p-error block" : ""}>Comments are Required when Rejected*.</small>

            </div>
            <div className="md:col-1">
              <div className="field col-12 md:col-4">
                <div style={{ float: "right", position: "relative", display: "flex" }}>

                  <Button className="mr-4" onClick={e => { navigate(-1) }}> Cancel</Button>
                  <Button className='btn ' disabled={(status!="BH Candidate Approval"&&status!="Rejected")||(status=="Rejected"&& comments=="")} onClick={e => { handlesubmit(); navigate(-1) }}> Submit</Button>
                </div>

              </div>



            </div>





          </div>

      </Card>
    </div>

  )
}

export default FinanceControllerApproval


