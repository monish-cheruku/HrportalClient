import React, { useEffect } from 'react'

function CandidatePrevFeedbacks(props) {
    const feedbackdata=props.feedbacks
    useEffect(()=>{
console.log(feedbackdata)
    },[])
  return (
    <div>

feedbacks


    </div>
  )
}

export default CandidatePrevFeedbacks