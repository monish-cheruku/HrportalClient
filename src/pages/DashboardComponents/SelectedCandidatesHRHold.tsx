import { Accordion, AccordionTab } from 'primereact/accordion'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { InputTextarea } from 'primereact/inputtextarea'
import { Panel } from 'primereact/panel'
import { RadioButton } from 'primereact/radiobutton'
import { Rating } from 'primereact/rating'
import { classNames } from 'primereact/utils'
import React, { useEffect, useState } from 'react'
import { Field, Form } from 'react-final-form'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { arrayBuffer } from 'stream/consumers'
import { RootState } from '../../app/store'
import { candidateworkflowsubmitaction, selectedcandidateshrholdsubmitaction } from '../../features/CandidateActions/candidateactiondetailsslice'
import { feedbackfieldaction } from '../../features/CandidateActions/feedbackfieldsslice'
import { prevfeedbacksaction } from '../../features/CandidateActions/prevfeedbacks'
// import { feedbackfieldaction, sendfeedbackaction } from '../../features/Feedback/feedbackfieldsslice'
// import { prevfeedbacksaction } from '../../features/Feedback/prevfeedbacks'
import CandidatePrevFeedbacks from '../DashboardComponents/CandidateActionHiringManager/CandidatePrevFeedbacks'
import CandidateDetails from '../DashboardComponents/CandidateDetails'
import JobPostDetails from '../DashboardComponents/JobPostDetails'

function SelectedCandidatesHRHold() {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const feedbackfields = useSelector((state: RootState) => state.feedbackfields)
  const prevfeedbacks = useSelector((state: RootState) => state.prevfeedback)
  const [errors, seterrors] = useState<any>([])
  const candidatedata = location.state
  const jobdata = location.state

  useEffect(() => {
    console.log(candidatedata)
    console.log(prevfeedbacks)
    dispatch(feedbackfieldaction({
      "stagename": candidatedata.stage_name
      //   "Interview_Round": "TechnicalRound_1"
      // "Interview_Round": "TechnicalRound_2"
      // "Interview_Round": "HRRound"
    }))

    console.log(feedbackfields)
    // dispatch(sendfeedbackaction({data}))
    dispatch(prevfeedbacksaction({
      "Candidate_ID": candidatedata.CandidateId

    }))


    setemptyerrors()


  }, [])
  function setemptyerrors() {
    var temp: any = []
    feedbackfields.forEach((i) => {
      temp.push({
        [valuebuilder(i.FeedbackCategoryID.toString(), "Comments")]: ""
      })
      temp.push({
        [valuebuilder(i.FeedbackCategoryID.toString(), "Rating")]: ""
      })
    })
    temp.push({
      status: ""
    })
    seterrors(temp)
  }
  const valuebuilder = (i, j) => {
    return i.toString() + "~" + j.toString()
  }
  const handlevalidate = (values) => {
    // seterrors(null)
    setemptyerrors()
    var flag = 0
    // if (values.status == undefined) {

    //   seterrors([...errors,{ status: "please select a status" }])
    //   flag = 1
    // }
    // if (values.status == "Rejected" && values.comments == undefined) {
    //   seterrors([...errors,{ status: "please give rejection comments" }])

    //   flag = 1
    // }
    // console.log(values)
    // console.log(errors)
    for (var i in errors) {
      // if(Object.values(values[i])[0]==undefined || Object.values(values[i])[0]==""){
      // if(Object.values(values[i])[0]){
      // if (errors[i] == "") {
      if (!values.hasOwnProperty(Object.keys(errors[i])[0])) {
        // Object.values(errors[i])[0]="this field is required"
        // seterrors(errors[i]="this field is required")
        // console.log(Object.keys(values[i]))
        // console.log(Object.keys(errors[i])[0])
        errors[i][Object.keys(errors[i])[0]] = "this field is required"
        console.log(errors[i])
        flag += 1
      }
    }



    console.log("flag", flag)
    if (flag > 0) {
      console.log(errors)
      return true
    }
    else {

      return false
    }
  }
  const isFormFieldValid = (meta) => !!(meta.touched && meta.error);

  const getFormErrorMessage = (meta) => {
    console.log(meta)
    return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
  };
  const validate = (values) => {

    let errors = {}
    console.log(values)
    var arr = []
    var tempc
    var tempr
    feedbackfields.map((i) => {
      tempc = valuebuilder(i.FeedbackCategoryID.toString(), "Comments")
      tempr = valuebuilder(i.FeedbackCategoryID.toString(), "Rating")
      // arr.push(valuebuilder(i.FeedbackCategoryID.toString(), "Comments"))
      if (!values[tempc]) {
        errors[tempc] = "* Comment is Required";
      }
      if (!values[tempr]) {
        errors[tempr] = "* Rating is required";
      }


    }
    )

    if (values.status == "")
      errors["status"] = "Check one of the radio button"

    if (values.status == "Rejected" && (values.comments == "" || values.comments == undefined)) {
      console.log(values)
      errors["comments"] = "Comments cant be empty"
    }





    return errors
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
          <CandidatePrevFeedbacks feedbacks={prevfeedbacks} comments={candidatedata.Comments}></CandidatePrevFeedbacks>
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

                  dispatch(selectedcandidateshrholdsubmitaction({


                    "candidateapprovalid": candidatedata.CandidateApprovalID,
              
                    "candidateid": candidatedata.CandidateId,
              
                    "status": values.status,
              
                    "comments": values.comments,
              
          "feedback": null
              
              
                  }))
                  navigate(-1)
                  // dispatch(candidateworkflowsubmitaction(req))


                }}
                initialValues={{ status: "" }}

                validate={validate}

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
                              <>
                                <InputTextarea rows={8} className={classNames({ "p-invalid": isFormFieldValid(meta) })}
                                  {...input}
                                >
                                </InputTextarea>
                                {/* {
                               console.log(   valuebuilder(i.FeedbackCategoryID.toString(), "Comments"))}
                               {console.log(errors)} */}
                                {/* <small className="p-error">{ 
                               errors.filter((k)=>k['1~Comments'])[0]?
                              <>{Object.values(errors.filter((k)=>k['1~Comments'])[0])[0]?.toString()}</> :
                               <></>
                                }</small> */}
                                {/* <small className="p-error">{errors.filter((k)=>k[valuebuilder(i.FeedbackCategoryID.toString(), "Comments")].length>0)}</small> */}
                                {/* <small className="p-error">{  errors.filter((k)=>k[valuebuilder(i.FeedbackCategoryID.toString(), "Comments")])[0]}</small> */}
                                {/* e.filter((k)=>k['1~Comments'])[0]['1~Comments'] */}
                                {getFormErrorMessage(meta)}
                              </>
                            )
                            }
                          />

                        </div>
                        <div className="field col-12 md:col-3">
                          <Field
                            name={valuebuilder(i.FeedbackCategoryID.toString(), "Rating")}
                            render={({ input, meta }) => (
                              <>
                                <Rating
                                  className={classNames({ "p-error": isFormFieldValid(meta) })}
                                  // value={values[valuebuilder(i.FeedbackCategorID,"Rating")]}
                                  {...input}
                                  // onClick={(e) =>{console.log(values);
                                  //   console.log(e.value);
                                  //   values[valuebuilder(i.FeedbackCategorID,"Rating")]=e.value}} 
                                  style={{ marginTop: "5rem", marginLeft: "10%", fontSize: "50px" }}
                                  size={80} cancel={false} />
                                {getFormErrorMessage(meta)}
                              </>
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
                              <RadioButton  {...input} className='ml-2' inputId="city4" name="city" value="HR Shortlisted" checked={values.status == "HR Shortlisted"} />
                            )} />
                          <label className="radio-inline me-3">HR Shortlisted
                          </label>
                        </span>
                        <br></br>
                        <br></br>
                        
                        
                        <span>
                          <Field
                            name="status"
                            id="r"
                            render={({ input, meta }) => (
                              <>
                                <RadioButton {...input} id="r" className='ml-2' name="city" value="Rejected" checked={values.status == "Rejected"} />
                              </>
                            )} />
                          <label className="radio-inline me-3" htmlFor={'r'}>Reject
                          </label>
                          <br></br>
                        </span>
                        <span>
                          <Field
                            name="status"
                            id="r"
                            render={({ input, meta }) => (
                              <>{getFormErrorMessage(meta)}</>
                            )} />
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
                              {getFormErrorMessage(meta)}
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

        



      </Card>
    </div>
  )
}

export default SelectedCandidatesHRHold