import React, { useEffect } from 'react'

import { Rating } from 'primereact/rating'

import { Accordion, AccordionTab } from 'primereact/accordion'



function CandidatePrevFeedbacks(props) {

  const feedbackdata = props.feedbacks

  const comments = props.comments




  function groupBy(objectArray, property) {

    return objectArray.reduce((acc, obj) => {

      const key = obj[property];

      if (!acc[key]) {

        acc[key] = [];

      }

      // Add object to list for given key's value

      acc[key].push(obj);

      return acc;

    }, {});

  }

  const groupedfeedbackdata = groupBy(feedbackdata, 'interviewtype');

  // console.log(groupedfeedbackdata)

  console.log(comments)




  // CandidateFeedbackID: 92,

  //   interviewtype: 'TechnicalRound_1',

  //   feedbackcategory: 'Communication',

  //   Comments: 'communication round 1',

  //   Rating: 4,

  //   Candidate: 1,

  //   FeedbackCategory: 1



  useEffect(() => {

    // console.log(feedbackdata)

  }, [])

  return (

    <div>

      <br></br>

      <Accordion >

        <AccordionTab header={<label>Previous Interview Feedbacks</label>}>

          {

            groupedfeedbackdata ? Object.keys(groupedfeedbackdata).map((i) =>

              <>

                <h4>{i}</h4>

                <br></br>

                <div>

                  <h4>

                    <div className="p-fluid  grid">

                      <div className="field col-12 md:col-4">Category

                      </div>

                      <div className="field col-12 md:col-4">Comments

                      </div>

                      <div className="field col-12 md:col-4">Rating

                      </div>

                    </div>



                  </h4>

                  {groupedfeedbackdata[i].map((j) =>

                    <>



                      {/* <label>{j.interviewtype}</label> */}

                      <div className="p-fluid  grid">

                        <div className="field col-12 md:col-4">

                          <label>{j.feedbackcategory}</label>

                        </div>

                        <div className="field col-12 md:col-4">



                          <label>{j.Comments}</label>

                        </div>

                        <div className="field col-12 md:col-4">




                          <Rating cancel={false} value={j.Rating}></Rating>




                        </div>

                      </div>



                      <br></br>

                    </>

                  )}








                </div>

              </>

            ) : <></>




          }

        </AccordionTab>

      </Accordion>

      <br>

      </br>

   

Comments

            {

              comments ?

                Object.keys(comments).map((i) =>

                  <>

          <Accordion >



                        <AccordionTab header={<label>{comments[i].stage_name} Comments</label>}>

                     



                        {comments[i].approvalComments}

                      </AccordionTab>

                   

                      </Accordion>

                </>

          )




          : <></>

            }





    </div >

  )

}



export default CandidatePrevFeedbacks