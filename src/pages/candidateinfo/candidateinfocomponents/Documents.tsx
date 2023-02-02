import { Button } from 'primereact/button'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setnextcandidateinfotab, setprevcandidateinfotab } from '../../../features/Misc/globalslice'
import { Field, Form } from 'react-final-form'
import { otherdocumentsgetaction } from '../../../features/Candidate info/otherdocumentsslice'
import { RootState } from '../../../app/store'
function Documents() {
    const dispatch = useDispatch()
    const candidateinfodata = useSelector((state: RootState) => state.candidateinfo)

    const isFormFieldValid = (meta) => !!(meta.touched && meta.error);


    const getFormErrorMessage = (meta) => {
        return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
    };
    useEffect(()=>{
dispatch(otherdocumentsgetaction({
    "selectedcandidateid":  candidateinfodata.Selected_Candidate_ID
}))
    },[])
    return (
        <div>Documents
<br>
</br>
<br></br>
<div className="p-fluid  grid">
    Photograph
                <div className="field col-12 md:col-4">
</div>
              
</div>
<div className="p-fluid  grid">
                <div className="field col-12 md:col-4">
    PAN
</div>
                <div className="field col-12 md:col-4">
                    Aadhar
</div>
                <div className="field col-12 md:col-4">
                    Passport
</div>
</div>






            <div className="p-fluid  grid">
                <div className="field col-12 md:col-4">

                </div>
                <div className="field col-12 md:col-4">

                </div>
                <div className="field col-12 md:col-4 flex">
                    <Button onClick={e => dispatch(setprevcandidateinfotab())}>Previous</Button>
                    <Button onClick={e => dispatch(setnextcandidateinfotab())}>Next</Button>
                    {/* <Button onClick={e=>console.log("")}>Save</Button> */}
                </div>
            </div>
        </div>
    )
}

export default Documents