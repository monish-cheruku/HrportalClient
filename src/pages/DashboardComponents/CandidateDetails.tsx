import { Card } from 'primereact/card'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { getCandidatefromapi, IJobPost } from '../../features/Candidates/candidatesslice'
function CandidateDetails(props) {
const location=useLocation()
    const jobdata = location.state
    useEffect(()=>{
console.log(location.state)
    },[])

    return (
        <div>
            <Card title="Candidate Details" style={{ width: '100%', marginBottom: '2em' }}>
                <div className="grid">
                    <div className="md:col-4">


                        <p ><span className="custom-label-2" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>First Name : </span><span className="font-w400">{jobdata?.CanFirstName}</span></p>
                        <p ><span className="custom-label-2" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>Overall Experience :</span> <span className="font-w400">{jobdata?.OverallExpYear}.{jobdata?.OverallExpMonth} years</span></p>
                        <p ><span className="custom-label-2" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>Last Name : </span><span className="font-w400">{jobdata?.CanLastName}</span></p>
                        <p ><span className="custom-label-2" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>Highest Qualification : </span><span className="font-w400">{jobdata?.Qualification}</span></p>
                    </div>


                    <div className="md:col-4">
                        <p >
                            <span className="" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>Relevant Experience :  </span> <span className="font-w400">{jobdata?.ReleventExpYear}.{jobdata?.ReleventExpMonth} years</span>
                            {/* <span style={{ fontWeight: "400" }}>BE - 001</span> */}
                        </p>

                        <p ><span className="custom-label-2" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>Skills : </span><span className="font-w400">{jobdata?.Skills}</span></p>
                        <p ><span className="custom-label-2" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>Current Organization : </span><span className="font-w400">{jobdata?.CurrentOrganization}</span></p>
                        <p ><span className="custom-label-2" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>Location : </span><span className="font-w400">{jobdata?.CurrentJobLocation}</span></p>
                    </div>


                    <div className="md:col-4">
                        <p >
                            <span className="" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>Expected DOJ: </span>
                            <span style={{ fontWeight: "400" }}>{jobdata?.ExpectedDOJ}</span>
                        </p>

                        <p ><span className="custom-label-2" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>Email : </span><span className="font-w400">{jobdata?.Email}</span></p>
                        <p ><span className="custom-label-2" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>Contact No : </span><span className="font-w400">{jobdata?.ContactNo}</span></p>
                        <p ><span className="custom-label-2" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>Current CTC : </span><span className="font-w400">{jobdata?.CurrentCTC}</span></p>
                    </div>
                </div>

                {/* <br></br> */}
                <div className="grid">
                    <div className="md:col-4">


                        <p ><span className="custom-label-2" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>Expected CTC : </span><span className="font-w400">{jobdata?.ExpectedCTC}</span></p>
                        <p ><span className="custom-label-2" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>Negotiated CTC : </span><span className="font-w400">{jobdata?.NegotiatedCTC}</span></p>
                        <p ><span className="custom-label-2" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>Resume : </span><span className="font-w400"><Link to={jobdata?.Resume}>Resume</Link></span></p>
                    </div>
                    {/* jobdata?.Resume.split('/')[2] */}
                    <div className="md:col-4">
                        <p ><span className="custom-label-2" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>Avg approved CTC : </span><span className="font-w400">{jobdata?.AvgApprovedCTC}</span></p>
                        <p ><span className="custom-label-2" style={{ minWidth: "180px", display: "inline-block", fontWeight: "600" }}>Avg Bill rate($): </span><span className="font-w400">{jobdata?.AvgBillRate}</span></p>
                    </div>

                </div>

            </Card>

        </div>
    )
}

export default CandidateDetails