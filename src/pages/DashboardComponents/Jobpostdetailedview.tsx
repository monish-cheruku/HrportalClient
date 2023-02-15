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
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { JobCode } = useParams()
  const [jobdata, setjobdata] = useState<IJobPost | Imyjobpost | any>(jobsdata.filter((i) => i.JobCode == JobCode)[0])
  useEffect(() => {
    console.log(JobCode)
    if (jobdata == null) {
      console.log(jobdata)
      console.log(Logindata.username)
      dispatch(getJobPostActionfromapi({ "ApproverName": Logindata.username }))
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
          <br></br>
          <div>

            <Button style={{ float: "right", position: "relative" }} onClick={e => { navigate(-1) }}> Cancel</Button>

          </div>
          <br></br>
          <br></br>
        </Panel>
      </Card>
    </div>
  )
}

export default Jobpostdetailedview