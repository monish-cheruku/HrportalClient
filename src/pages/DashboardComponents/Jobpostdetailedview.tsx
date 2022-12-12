import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { Panel } from 'primereact/panel'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import { RootState } from '../../app/store'
import { getJobPostActionfromapi, IJobPost } from '../../features/JobPostActions/jobpostactionsslice'
import { Imyjobpost } from '../../features/JobPostActions/myjobpostsslice'
import JobPostDetails from './JobPostDetails'

function Jobpostdetailedview() {
    const jobsdata = useSelector((store: RootState) => store.myjobposts)
    const Logindata = useSelector((store: RootState) => store.Login)
    const navigate=useNavigate()
    const dispatch = useDispatch()
    const { JobCode } = useParams()
    const [jobdata, setjobdata] = useState<IJobPost| Imyjobpost>(jobsdata.filter((i) => i.JobCode == JobCode)[0])
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
<Panel header={<h4>Job Post Details </h4>}> 

<JobPostDetails JobData={jobdata}></JobPostDetails>
<br></br>
<div>

        <Button style={{float:"right",position:"relative"}} onClick={e=>{navigate(-1)}}> Cancel</Button>

</div>
<br></br>
<br></br>
</Panel>
</Card>
    </div>
  )
}

export default Jobpostdetailedview