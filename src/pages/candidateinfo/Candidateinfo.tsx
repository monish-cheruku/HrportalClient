import React, { useEffect, useState } from 'react'
import { Steps } from 'primereact/steps';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import PersonalDetails from './candidateinfocomponents/PersonalDetails';
import FamilyDetails from './candidateinfocomponents/FamilyDetails';
import Education from './candidateinfocomponents/Education';
import Employement from './candidateinfocomponents/Employement';
import PFDetails from './candidateinfocomponents/PFDetails';
import Documents from './candidateinfocomponents/Documents';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { useDispatch } from 'react-redux';
import { setcandidateinfotab } from '../../features/Misc/globalslice';
import Declaration from './candidateinfocomponents/Declaration';
function Candidateinfo() {
  // const [activeIndex, setActiveIndex] = useState(0);
  const activeIndex= useSelector((store:RootState)=>store.global.candidateinfoactivetab)
  const dispatch=useDispatch()
  useEffect(()=>{
console.log(activeIndex)
if(activeIndex==null)setcandidateinfotab(0)
  },[activeIndex])
    const navigate=useNavigate()
  const wizardItems = [
    { label: 'Personal Details', command: (e) => {dispatch(setcandidateinfotab(e.index))},Template:<>abcd</>},
    { label: 'Family Details', command: (e) => { dispatch(setcandidateinfotab(e.index))} },
    { label: 'Education', command: (e) =>{dispatch(setcandidateinfotab(e.index))} },
    { label: 'Employement', command: (e) =>dispatch(setcandidateinfotab(e.index))},
    // { label: 'PF Details', command: (e) => dispatch(setcandidateinfotab(e.index)) },
    { label: 'Documents Upload', command: (e) => dispatch(setcandidateinfotab(e.index)) },
    { label: 'Declaration', command: (e) =>dispatch(setcandidateinfotab(e.index)) }
];
  return (
    <div>
   <div className="col-12 md:col-12">
                <div className="card card-w-title">

                      <Steps model={wizardItems} activeIndex={activeIndex} onSelect={(e) => dispatch(setcandidateinfotab(e.index))} readOnly={false} />


                    <div>
                      <br></br>
{
  activeIndex==0&&<PersonalDetails></PersonalDetails>
}
{
  activeIndex==1&&<FamilyDetails></FamilyDetails>
}
{
  activeIndex==2&&<Education></Education>
}
{
  activeIndex==3&&<Employement></Employement>
}
{/* {
  activeIndex==4&&<PFDetails></PFDetails>
} */}
{
  activeIndex==4&&<Documents></Documents>
}
{
  activeIndex==5&&<Declaration></Declaration>
}

                    </div>

                </div>
            </div>






    </div>
  )
}

export default Candidateinfo