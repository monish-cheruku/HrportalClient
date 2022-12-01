import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import { RootState } from '../../app/store'
import { getJobPostActionfromapi, IJobPost } from '../../features/JobPostActions/jobpostactionsslice'
import JobPostDetails from './JobPostDetails'

function Jobpostdetailedview() {
    const jobsdata = useSelector((store: RootState) => store.myjobposts)
    const Logindata = useSelector((store: RootState) => store.Login)
    const navigate=useNavigate()
    const dispatch = useDispatch()
    const { JobCode } = useParams()
    const [jobdata, setjobdata] = useState<IJobPost>(jobsdata.filter((i) => i.JobCode == JobCode)[0])
  useEffect(() => {
    console.log(JobCode)
    if (jobdata == null) {
      console.log(jobdata)
      console.log(Logindata.username)
      dispatch(getJobPostActionfromapi({"ApproverName":Logindata.username}))
      // dispatch(getJobPostActionfromapi("sbatchu"))
    }
    console.log(Logindata)
    setjobdata(jobsdata.filter((i) => i.JobCode == JobCode)[0])
    console.log(jobsdata)
  }, [])
  return (
    <div>

<Card>

<JobPostDetails JobData={jobdata}></JobPostDetails>
<br></br>
        <Button onClick={e=>{navigate(-1)}}> Back</Button>
</Card>
    </div>
  )
}

export default Jobpostdetailedview