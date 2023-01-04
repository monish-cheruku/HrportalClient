import React, { useEffect } from "react";
import { useState } from "react";
import ManageCompany from "./ManageCompany";
import MyJobPosts from "./DashboardComponents/MyJobPosts";
import JobPostActions from "./DashboardComponents/JobPostActionsHiringManager/JobPostActions";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useDispatch } from "react-redux";
import { myjobpostsaction } from "../features/JobPostActions/myjobpostsslice";
import CandidateAction from "./DashboardComponents/CandidateActionHiringManager/CandidateAction";
import { candidateactionsdetailsaction } from "../features/CandidateActions/candidateactiondetailsslice";
import { setdashboardactivetab } from "../features/Misc/globalslice";
import SelectedCandidates from "./DashboardComponents/SelectedCandidatesHiringManager/SelectedCandidates";


const Dashboard = () => {
    const [openedtab,setOpenedtab]=useState("jobpostactions")
    const[nooftabs,setnooftabs]=useState(4)
    const myjobpostactions =useSelector((state:RootState)=>state.JobPostAction);
    const mycandidateactions =useSelector((state:RootState)=>state.Candidateactions);
    const myselectedcandidates =useSelector((state:RootState)=>state.Selectedcandidates);
    const globaldata =useSelector((state:RootState)=>state.global);
    const myJobPosts =useSelector((state:RootState)=>state.myjobposts);
    const logindata=useSelector((state:RootState)=>state.Login)
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(myjobpostsaction({"UserName":logindata.username}))
        dispatch(candidateactionsdetailsaction({

            "ApproverName":logindata.username
        
        }))
        // dispatch(myjobpostsaction({"UserName":logindata.username}))
    },[])
    return (
        <div>
            <div className="grid">
                {/* <div className={"col-"+(12/nooftabs).toString()+" lg:col-"+(12/nooftabs).toString()+" xl:col-"+(12/nooftabs).toString()+" sm:col-6"} onClick={e=>setOpenedtab("candidateaction")}>

                    <div className={openedtab=="candidateaction"?"cardaction mb-0":"cardaction1 mb-0"}>     
                        <div className="flex justify-content-between mb-3">
                            <div>
                                <span className="block  font-medium mb-3">Candidate Actions</span>
                                <div className="text-900 font-medium text-xl">3</div>
                            </div>
                            <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: "2.5rem", height: "2.5rem" }}>
                                <i className="pi pi-user-edit text-blue-500 text-xl" />
                            </div>
                        </div>

                    </div>
                </div> */}
                <div className={"col-" + (12 / nooftabs).toString() + " lg:col-" + (12 / nooftabs).toString() + " xl:col-" + (12 / nooftabs).toString() + " sm:col-6"} onClick={e => dispatch(setdashboardactivetab("jobpostactions"))}>

                    <div className={globaldata.dashboardactivetab  == "jobpostactions" ? "cardselect mb-0" : "cardunselect mb-0"}>
                        <div className="flex justify-content-between mb-3">

                            <div>
                                <span className="block  font-medium mb-3">Job Post Actions</span>
                                <div className="text-900 font-medium text-xl">{myjobpostactions?myjobpostactions.length:0}</div>
                            </div>
                            <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: "2.5rem", height: "2.5rem" }}>
                                <i className="pi pi-user-edit text-blue-500 text-xl" />
                            </div>
                        </div>

                    </div>
                </div>

                <div className={"col-" + (12 / nooftabs).toString() + " lg:col-" + (12 / nooftabs).toString() + " xl:col-" + (12 / nooftabs).toString() + " sm:col-6"} onClick={e =>  dispatch(setdashboardactivetab("myjobposts"))} >
                    <div className={globaldata.dashboardactivetab  == "myjobposts" ? "cardselect mb-0" : "cardunselect mb-0"}>
                        <div className="flex justify-content-between mb-3">
                            <div>
                                <span className="block  font-medium mb-3">My Job Posts</span>
                                <div className="text-900 font-medium text-xl">{myJobPosts?myJobPosts.length:0}</div>
                            </div>
                            <div className="flex align-items-center justify-content-center bg-orange-100 border-round" style={{ width: "2.5rem", height: "2.5rem" }}>
                                <i className="pi pi-file text-orange-500 text-xl" />
                            </div>
                        </div>

                    </div>
                </div>
                <div className={"col-" + (12 / nooftabs).toString() + " lg:col-" + (12 / nooftabs).toString() + " xl:col-" + (12 / nooftabs).toString() + " sm:col-6"} onClick={e =>  dispatch(setdashboardactivetab("selectedcandidates"))}>

                    <div className={globaldata.dashboardactivetab  == "selectedcandidates" ? "cardselect mb-0" : "cardunselect mb-0"}>
                        <div className="flex justify-content-between mb-3">
                            <div>
                                <span className="block  font-medium mb-3">Selected Candidates</span>
                                <div className="text-900 font-medium text-xl">{myselectedcandidates?myselectedcandidates.length:0}</div>
                            </div>
                            <div className="flex align-items-center justify-content-center bg-cyan-100 border-round" style={{ width: "2.5rem", height: "2.5rem" }}>
                                <i className="pi pi-inbox text-cyan-500 text-xl" />
                            </div>
                        </div>

                    </div>
                </div>
                <div className={"col-" + (12 / nooftabs).toString() + " lg:col-" + (12 / nooftabs).toString() + " xl:col-" + (12 / nooftabs).toString() + " sm:col-6"} onClick={e =>  dispatch(setdashboardactivetab("candidateactions"))}>

                    <div className={globaldata.dashboardactivetab  == "candidateactions" ? "cardselect mb-0" : "cardunselect mb-0"}>
                        <div className="flex justify-content-between mb-3">

                            <div>
                                <span className="block  font-medium mb-3">Candidate Actions</span>
                                <div className="text-900 font-medium text-xl">{mycandidateactions?mycandidateactions.length:0}</div>
                            </div>
                            <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: "2.5rem", height: "2.5rem" }}>
                                <i className="pi pi-user-edit text-blue-500 text-xl" />
                            </div>
                        </div>

                    </div>
                </div>
                {/* <div className="col-12 lg:col-6 xl:col-3">
                    <div className="card mb-0">
                        <div className="flex justify-content-between mb-3">
                            <div>
                                <span className="block text-500 font-medium mb-3">Comments</span>
                                <div className="text-900 font-medium text-xl">152 Unread</div>
                            </div>
                            <div className="flex align-items-center justify-content-center bg-purple-100 border-round" style={{ width: "2.5rem", height: "2.5rem" }}>
                                <i className="pi pi-comment text-purple-500 text-xl" />
                            </div>
                        </div>
                        <span className="text-green-500 font-medium">85 </span>
                        <span className="text-500">responded</span>
                    </div>
                </div> */}
            </div>
            <div >
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        {globaldata.dashboardactivetab == "jobpostactions" && <div style={{ width: "100%" }}> <JobPostActions />    </div>}
                        {globaldata.dashboardactivetab == "myjobposts" && <div style={{ width: "100%" }}><MyJobPosts /></div>}
                        {globaldata.dashboardactivetab == "selectedcandidates" && <div style={{ width: "100%" }}><SelectedCandidates/></div>}
                        {globaldata.dashboardactivetab == "candidateactions" && <div style={{ width: "100%" }}> <CandidateAction />    </div>}

                        {/* <div hidden={true}>d</div> */}


                    </div>
                </div>
            </div>
        </div>
    );
};

// // export default Dashboard
// const comparisonFn = function (prevProps, nextProps) {
//     return prevProps.location.pathname === nextProps.location.pathname;
// };

// export default React.memo(Dashboard, comparisonFn);
export default Dashboard