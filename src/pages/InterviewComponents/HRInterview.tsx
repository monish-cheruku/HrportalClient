import { Accordion, AccordionTab } from 'primereact/accordion'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { InputTextarea } from 'primereact/inputtextarea'
import { Panel } from 'primereact/panel'
import { RadioButton } from 'primereact/radiobutton'
import { Rating } from 'primereact/rating'
import React, { useEffect } from 'react'
import { Field, Form } from 'react-final-form'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router'
import { RootState } from '../../app/store'
import { candidateworkflowsubmitaction } from '../../features/CandidateActions/candidateactiondetailsslice'
import { feedbackfieldaction } from '../../features/CandidateActions/feedbackfieldsslice'
import { prevfeedbacksaction } from '../../features/CandidateActions/prevfeedbacks'
// import { feedbackfieldaction, sendfeedbackaction } from '../../features/Feedback/feedbackfieldsslice'
// import { prevfeedbacksaction } from '../../features/Feedback/prevfeedbacks'
import CandidatePrevFeedbacks from '../DashboardComponents/CandidateActionHiringManager/CandidatePrevFeedbacks'
import CandidateDetails from '../DashboardComponents/CandidateDetails'
import JobPostDetails from '../DashboardComponents/JobPostDetails'

function HRInterview() {
     const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const feedbackfields = useSelector((state: RootState) => state.feedbackfields)
  const prevfeedbacks = useSelector((state: RootState) => state.prevfeedback)

  const candidatedata = location.state
  const jobdata = location.state

  useEffect(() => {
    console.log(candidatedata)
    console.log(prevfeedbacks)
    dispatch(feedbackfieldaction({
        
        "stagename":candidatedata.stage_name
    //   "Interview_Round": "TechnicalRound_1"
      // "Interview_Round": "TechnicalRound_2"
    //   "Interview_Round": "HRRound"
    }))

    console.log(feedbackfields)
    // dispatch(sendfeedbackaction({data}))
    dispatch(prevfeedbacksaction({
      "Candidate_ID": candidatedata.CandidateId

    }))
  }, [])
  const valuebuilder = (i, j) => {
    return i.toString() + "~" + j.toString()
  }
  return (
    <div>
    <Card>
      <Panel header="Candidate Interview">

        <CandidateDetails data={candidatedata}></CandidateDetails>
        <hr></hr>
        <br></br>
        <br></br>
        <Accordion >
          <AccordionTab header="Job Post Details">
            <JobPostDetails JobData={jobdata}></JobPostDetails>
          </AccordionTab>

        </Accordion>
        <CandidatePrevFeedbacks feedbacks={prevfeedbacks}></CandidatePrevFeedbacks>
        <br></br>
        <br></br>

      </Panel>

      <br></br>
      <div className="container ">

        <Card >

          <div className="">
            <Form style={{ width: "100%" }}
              onSubmit={(values: any) => {

                console.log(values)


                var req: any = { candidateid: candidatedata.CandidateId, candidateapprovalid: candidatedata.CandidateApprovalID, feedback: [] }
                feedbackfields.forEach((i) => {
                  req.feedback.push({
                    "Candidate": candidatedata.CandidateId,
                    "FeedbackCategory": i.FeedbackCategoryID,
                    "Comments": "",
                    "Rating": 0

                  })
                })

                var temp = ""


                for (var i in values) {
                  if (i.toString().includes("~")) {
                    temp = i.toString().split("~")[0]

                    req.feedback.forEach(e => {
                      if (e.FeedbackCategory == temp) {
                        if (i.toString().includes("Comments"))
                          e.Comments = values[i]
                        else if (i.toString().includes("Rating"))
                          e.Rating = values[i]
                      }
                    });
                  }
                }


                req.comments = values.comments
                req.status = values.status
                console.log(req)
                dispatch(candidateworkflowsubmitaction(req))


              }}
              // initialValues={ }
              // validate={validate}

              render={({ handleSubmit, values, submitting,
                submitError,
                invalid,
                pristine,
                initialValues = {},
                dirtySinceLastSubmit, }) => (
                <form onSubmit={handleSubmit} >


                  {feedbackfields.map((i) =>
                    <div className="p-fluid  grid">
                      <div className="field col-12 md:col-2">
                        <h4 style={{ marginTop: "5rem", marginLeft: "10%" }}>

                          {i.FeedbackCategory}
                        </h4>
                      </div>
                      <div className="field col-12 md:col-7">
                        <Field
                          name={valuebuilder(i.FeedbackCategoryID.toString(), "Comments")}
                          render={({ input, meta }) => (
                            <InputTextarea rows={8}
                              {...input}
                            >
                            </InputTextarea>
                          )
                          }
                        />

                      </div>
                      <div className="field col-12 md:col-3">
                        <Field
                          name={valuebuilder(i.FeedbackCategoryID.toString(), "Rating")}
                          render={({ input, meta }) => (
                            <Rating
                              // value={values[valuebuilder(i.FeedbackCategorID,"Rating")]}
                              {...input}
                              // onClick={(e) =>{console.log(values);
                              //   console.log(e.value);
                              //   values[valuebuilder(i.FeedbackCategorID,"Rating")]=e.value}} 
                              style={{ marginTop: "5rem", marginLeft: "10%", fontSize: "50px" }}
                              size={80} cancel={false} />
                          )
                          }
                        />
                      </div>
                    </div>
                  )
                  }



                  <div className="p-fluid  grid">
                    <div className="field col-12 md:col-3">


                      <span>
                        <Field
                          name="status"
                          render={({ input, meta }) => (
                            <RadioButton {...input} className='ml-2' inputId="city4" name="city" value="HR Shortlisted" checked={values.status == "HR Shortlisted"} />
                          )} /><label className="radio-inline me-3">Shortlist
                        </label>

                      </span>
                      <br></br>
                                    
                      <span>
                        <Field
                          name="status"
                          render={({ input, meta }) => (
                            <RadioButton {...input} className='ml-2' inputId="city4" name="city" value="H" checked={values.status == "H"} />
                          )} />
                        <label className="radio-inline me-3">Hold
                        </label>
                      </span>
                      <br></br>
                      <span>
                        <Field
                          name="status"
                          id="r"
                          render={({ input, meta }) => (
                            <RadioButton {...input} id="r" className='ml-2' name="city" value="Rejected" checked={values.status == "Rejected"} />
                          )} />
                        <label className="radio-inline me-3" htmlFor={'r'}>Rejected
                        </label>
                      </span>




                    </div>
                    <div className="field col-12 md:col-7">
                      <Field
                        name="comments"
                        render={({ input, meta }) => (
                          <>
                            <label>Comments : </label>
                            <InputTextarea {...input}>
                            </InputTextarea>
                          </>
                        )}
                      />
                    </div>
                    <div className="field col-12 md:col-2">
                      <div style={{ float: "right", position: "relative", display: "flex" }}>

                        <Button type="button" className="mr-4" onClick={e => { navigate(-1) }}> Cancel</Button>
                        <Button >Submit</Button>
                      </div>

                    </div>
                  </div>


                </form>
              )
              }
            />



          </div>


        </Card>
      </div>
      <br></br>

      <div className="p-fluid  grid">
        <div className="field col-12 md:col-4">

        </div>
        <div className="field col-12 md:col-6">

        </div>
        <div className="field col-12 md:col-2">

        </div>
      </div>



    </Card>
  </div>
  )
}

export default HRInterview