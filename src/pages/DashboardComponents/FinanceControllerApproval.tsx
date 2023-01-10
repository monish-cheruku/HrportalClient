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

      "feedback": null


    }))
    navigate(-1)
  }

  return (
    <div>

      <Card>
        <Panel header="Finance Controller Approval">
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
          <CandidatePrevFeedbacks feedbacks={prevfeedbacks} comments={candidatedata.Comments}></CandidatePrevFeedbacks>


          <br></br>



          <div className="grid">
            <div className="md:col-3">

              <RadioButton className='ml-2 mr-2' name="selectforinterview" value="FC Approved" onChange={(e) => setstatus(e.value)} checked={status === 'FC Approved'} id='selectforinterview' />
              <span><label className="radio-inline me-3" htmlFor='selectforinterview'><b>Approve</b>
              </label>
              </span>
              <br></br>
              <br></br>


              <RadioButton className='ml-2 mr-2' name="city" value="Rejected" onChange={(e) => setstatus(e.value)} checked={status === 'Rejected'} />
              <span><label className="radio-inline me-3"><b>Reject</b>
              </label>
              </span>
            </div>





            <div className="md:col-6">
              <div className='grid'>
                <span><label>Comments:</label></span>

              </div>
              <br></br>
              <div className='grid'>
              <InputTextarea cols={60} value={comments} onChange={e => setcomments(e.target.value)}></InputTextarea>
              <small hidden={res == "Rejected" && comments == "" ? false : true} id="username2-help" className={status == "Rejected" && comments == "" ? "p-error block" : ""}>Comments are Required when Rejected*.</small>
            </div>
          </div>
          <div className="md:col-3">

            <div style={{paddingTop:"2rem", float: "right", position: "relative", display: "flex" }}>

             
              <Button className='btn mr-4' disabled={(status != "FC Approved" && status != "Rejected") || (status == "Rejected" && comments == "")} onClick={e => { handlesubmit() }}> Submit</Button>
              <Button className="mr-4" onClick={e => { navigate(-1) }}> Cancel</Button>
            </div>





          </div>





        </div>
      </Panel>
    </Card>
    </div >

  )
}

export default FinanceControllerApproval


