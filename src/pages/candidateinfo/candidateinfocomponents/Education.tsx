import { Button } from 'primereact/button'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Field, Form } from 'react-final-form'
import { setnextcandidateinfotab, setprevcandidateinfotab } from '../../../features/Misc/globalslice'

function Education() {
    const dispatch=useDispatch()
     
    const isFormFieldValid = (meta) => !!(meta.touched && meta.error);


    const getFormErrorMessage = (meta) => {
        return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
    };
  return (
    <div>Education
  <Form
                        onSubmit={(values: any) => {
                         }}
                        // initialValues={{}}
                        

                        render={({ handleSubmit, values, submitting,
                            submitError,
                            invalid,
                            pristine,
                            initialValues = {},
                            dirtySinceLastSubmit, }) => (
                            <form onSubmit={handleSubmit} ></form>


                            )}
                            />


        



<div className="p-fluid  grid">
                                    <div className="field col-12 md:col-4">
                                        
                                        </div>
                                    <div className="field col-12 md:col-4">

                                        </div>
                                    <div className="field col-12 md:col-4 flex">
<Button onClick={e=>dispatch(setprevcandidateinfotab("lkdjf"))}>Previous</Button>
<Button onClick={e=>dispatch(setnextcandidateinfotab(";aufhds"))}>Next</Button>
                                        </div>
                                        </div>
    </div>
  )
}

export default Education