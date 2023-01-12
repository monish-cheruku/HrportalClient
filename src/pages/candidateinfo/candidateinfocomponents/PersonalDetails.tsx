import { Button } from 'primereact/button'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Field, Form } from 'react-final-form'
import { setnextcandidateinfotab, setprevcandidateinfotab } from '../../../features/Misc/globalslice'
import classNames from 'classnames'
import { InputText } from 'primereact/inputtext'

function PersonalDetails() {
    const dispatch=useDispatch()
    
    const isFormFieldValid = (meta) => !!(meta.touched && meta.error);


    const getFormErrorMessage = (meta) => {
        return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
    };
  return (
    <div>PersonalDetails
  <Form
                        onSubmit={(values: any) => {
                         }}
                        initialValues={{}}
                        

                        render={({ handleSubmit, values, submitting,
                            submitError,
                            invalid,
                            pristine,
                            initialValues = {},
                            dirtySinceLastSubmit, }) => (
                            <form onSubmit={handleSubmit} >






<div className="p-fluid  grid">
                                    <div className="field col-12 md:col-6">
                                    <Field
                                            name="Employee Name (As per Aadhar Card)"
                                            render={({ input, meta }) => (
                                                <div className="field " style={{display: 'inline-block',}}>
                                                    <label htmlFor="Employee Name">Employee Name (As per Aadhar Card)</label>
                                                    <span className="label">
                                                        <InputText id="Employee Name " {...input} autoFocus className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                        <label htmlFor="." className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                                                    </span>
                                                    {getFormErrorMessage(meta)}
                                                </div>
                                            )}
                                        />
                                    </div>
                                    <div className="field col-12 md:col-6"></div>
</div>

<div className="p-fluid  grid">
                                    <div className="field col-12 md:col-4"></div>
                                    <div className="field col-12 md:col-4"></div>
                                    <div className="field col-12 md:col-4"></div>
</div>
<div className="p-fluid  grid">
                                    <div className="field col-12 md:col-4"></div>
                                    <div className="field col-12 md:col-4"></div>
                                    <div className="field col-12 md:col-4"></div>
</div>

{/* contact no */}

<div className="p-fluid  grid">
                                    <div className="field col-12 md:col-4"></div>
                                    <div className="field col-12 md:col-4"></div>
                                    <div className="field col-12 md:col-4"></div>
</div>
<div className="p-fluid  grid">
                                    <div className="field col-12 md:col-4"></div>
                                    <div className="field col-12 md:col-4"></div>
                                    <div className="field col-12 md:col-4"></div>
</div>












                            </form>


                            )}
                            />



<div className="p-fluid  grid">
                                    <div className="field col-12 md:col-4">
                                        
                                        </div>
                                    <div className="field col-12 md:col-4">

                                        </div>
                                    <div className="field col-12 md:col-4 flex">
<Button onClick={e=>console.log()}>cancel</Button>
<Button onClick={e=>dispatch(setnextcandidateinfotab(";aufhds"))}>Next</Button>
                                        </div>
                                        </div>
    </div>
  )
}

export default PersonalDetails