import React, { useEffect } from 'react'

function CandidatePrevFeedbacks(props) {
    const feedbackdata=props.feedbacks



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
console.log(groupedfeedbackdata)


    useEffect(()=>{
console.log(feedbackdata)
    },[])
  return (
    <div>

feedbacks
{/* {groupedfeedbackdata.map((f)=><>
<h4>{f}</h4>





</>)

} */}


    </div>
  )
}

export default CandidatePrevFeedbacks