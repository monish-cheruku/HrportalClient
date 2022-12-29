import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { Button } from 'primereact/button'
import { RadioButton } from 'primereact/radiobutton'
import { InputTextarea } from 'primereact/inputtextarea'
// import { candidateworkflowsubmitaction } from '../../../features/CandidateActions/candidateactiondetailsslice'
import { useDispatch, useSelector } from 'react-redux'
import { Card } from 'primereact/card'
import { Panel } from 'primereact/panel'
import { generalmanagerapprovalsubmitaction } from '../../features/CandidateActions/candidateactiondetailsslice'
import { Accordion, AccordionTab } from 'primereact/accordion'
import CandidateDetails from './CandidateDetails'
import JobPostDetails from './JobPostDetails'
import { RootState } from '../../app/store'
import { prevfeedbacksaction } from '../../features/CandidateActions/prevfeedbacks'


function GeneralManagerApproval() {
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
    var payloaddata: any = {}
    if (res) {

      payloaddata.JobPostApprovalId = jobdata?.JobPostApprovalID
      payloaddata.JobPostId = jobdata.JobPostID
      payloaddata.ApprovalStatus = res
      payloaddata.ApprovalComments = comments
    }
    if (res) {
      if (!(res == "Rejected" && comments == "")) {

        console.log(payloaddata)
        dispatch(generalmanagerapprovalsubmitaction({


          "candidateapprovalid": candidatedata.CandidateApprovalID,
    
          "candidateid": candidatedata.CandidateId,
    
          "status": status,
    
          "comments": comments,
    
          "feedback": null
    
    
        }))      
    }
  }
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
    dispatch(generalmanagerapprovalsubmitaction({


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

            <RadioButton className='ml-2' name="selectforinterview" value="GM Approval" onChange={(e) => setstatus(e.value)} checked={status === 'GM Approval'} id='selectforinterview' />
            <span><label className="radio-inline me-3" htmlFor='selectforinterview'>Approve
            </label>
            </span>
            <br></br>
            <br></br>


            <RadioButton className='ml-2' name="city" value="GM Approval Rejected" onChange={(e) => setstatus(e.value)} checked={status === 'GM Approval Rejected'} />
            <span><label className="radio-inline me-3">Reject
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
                <Button className='btn ' disabled={(res!="Rejected"&&res!="Approved")||(res == "Rejected" && comments == "") } onClick={e => { handlesubmit(); navigate(-1) }}> Submit</Button>
              </div>

            </div>



          </div>





        </div>

      </Card>
    </div>

  )
  }

export default GeneralManagerApproval


