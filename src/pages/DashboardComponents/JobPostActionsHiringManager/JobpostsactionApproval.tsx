import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'

function JobpostsactionApproval() {
    // const jobcode=useSelector(store=>store.JobPostAction)
    const {JobCode}=useParams()
    console.log(JobCode)
//     const [jobpostobject,setJobpostobject]=useState()
// const jobpostdata=useSelector(store=>store.JobPostAction)
//     console.log(jobcode)
// useEffect(()=>{
// console.log(jobpostdata)
// var temp=jobpostdata.filter(i=>i.JobCode==jobcode)
// setJobpostobject(temp[0])
// console.log(jobpostdata)
// console.log(jobpostdata[0].JobCode)
// },[])
  return (
    <div>
        <div className="grid">

        <div className="col-12 md:col-4 lg:col-8">JobCode : {JobCode}</div>
        <div className="col-12 md:col-4 lg:col-4">2</div>
        <div className="col-12 md:col-4">3</div>
        </div>
    </div>
  )
}

export default JobpostsactionApproval