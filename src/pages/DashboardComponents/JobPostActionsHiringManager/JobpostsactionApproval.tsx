import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { Checkbox } from 'primereact/checkbox'
import { InputTextarea } from 'primereact/inputtextarea'
import { RadioButton } from 'primereact/radiobutton'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import { RootState } from '../../../app/store'
import { getJobPostActionfromapi, IJobPost, jobpostactionssubmit } from '../../../features/JobPostActions/jobpostactionsslice'
import JobPostDetails from '../JobPostDetails'

function JobpostsactionApproval() {
  const jobsdata = useSelector((store:RootState) => store.JobPostAction)
  const Logindata = useSelector((store:RootState) => store.Login)
  const { JobCode } = useParams()
  // console.log(JobCode)
  //     const [jobpostobject,setJobpostobject]=useState()
  // const jobpostdata=useSelector(store=>store.JobPostAction)
  //     console.log(jobcode)
  const [res, setres] = useState("")
  const [comments, setcomments] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [jobdata, setjobdata] = useState<IJobPost>(jobsdata.filter((i) => i.JobCode == JobCode)[0])
  useEffect(() => {
    if(jobdata==null){
      console.log(jobdata)
      console.log(Logindata.username)
      dispatch(getJobPostActionfromapi(Logindata.username))
      // dispatch(getJobPostActionfromapi("sbatchu"))
    }
    console.log(Logindata)
    setjobdata(jobsdata.filter((i) => i.JobCode == JobCode)[0])
  }, [])
  // console.log(jobdata)
  const onsubmithandle = () => {
    // console.log(res)
    // console.log(comments)



    var payloaddata: any = {}
    if (res) {

      payloaddata.JobPostApprovalId = jobdata?.JobPostApprovalID
      payloaddata.JobPostId = jobdata.id
      payloaddata.ApprovalStatus = res
      payloaddata.ApprovalComments = comments
    }
    if (res) {
      if (!(res == "R" && comments == "")) {

        console.log(payloaddata)
        dispatch(jobpostactionssubmit(payloaddata))
      }
    }
  }
  return (
    <div>
<JobPostDetails JobData={jobdata}></JobPostDetails>





      <Card style={{ width: '100%', marginBottom: '2em' }}>
        <div className="grid">
          <div className="md:col-3">
            {/* <input type="Check" aria-label='Approve'></input>
            <input type="chekbox" aria-label='Reject'></input> */}
            {/* <Checkbox ></Checkbox>Approve<br/> 
            <Checkbox ></Checkbox>Reject */}
            <div className="field-radiobutton">
              <RadioButton inputId="city3" name="city" value="A" onChange={(e) => setres(e.value)} checked={res === 'A'} />
              <label htmlFor="city3">Approve</label>
            </div>
            <div className="field-radiobutton">
              <RadioButton inputId="city4" name="city" value="R" onChange={(e) => setres(e.value)} checked={res === 'R'} />
              <label htmlFor="city4">Reject</label>
            </div>
          </div>
          <div className="md:col-9">
            <InputTextarea className={res == "R" && comments == "" ? "p-invalid" : ""} aria-label='Approve' cols={80} value={comments} onChange={e => setcomments(e.target.value)}></InputTextarea>
            <small hidden={res == "R" && comments == "" ? false : true} id="username2-help" className={res == "R" && comments == "" ? "p-error block" : ""}>Comments are Required when Rejected*.</small>
          </div>
        </div>

        <Button onClick={e => navigate(-1)}> Go Back</Button><span>   </span>
        <Button disabled={res ? false : true} onClick={e => {onsubmithandle();navigate(-1)}}> Submit</Button>
      </Card>


    </div>
  )
}

export default JobpostsactionApproval