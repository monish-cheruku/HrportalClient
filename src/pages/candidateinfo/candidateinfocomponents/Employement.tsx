import { Button } from 'primereact/button'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Field, Form } from 'react-final-form'
import { setnextcandidateinfotab, setprevcandidateinfotab } from '../../../features/Misc/globalslice'
import { Calendar } from 'primereact/calendar'
import { InputText } from 'primereact/inputtext'
import { Dialog } from 'primereact/dialog'
import { Dropdown } from 'primereact/dropdown'
import classNames from 'classnames'

function Employement() {
    const dispatch=useDispatch()
    const [modalDialog, setModaldialog] = useState(false);
    const [editmode, setEditmode] = useState(false);
    useEffect(()=>{
console.log("employement component")
    },[])
     
    const isFormFieldValid = (meta) => !!(meta.touched && meta.error);


    const getFormErrorMessage = (meta) => {
        return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
    };
  return (
    <div>Employement
       <Button onClick={e => setModaldialog(true)}>Add A Education</Button>
      <Dialog visible={modalDialog} style={{ width: "450px" }} header={editmode ? "Edit  Information " : "Add  Information "} modal className="p-fluid" onHide={() => setModaldialog(false)}>

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
            <form onSubmit={handleSubmit} >

              <br></br>
              <div className="p-fluid  grid">
                <div className="field col-12 md:col-6">
                  <Field
                    name="Qualification"
                    render={({ input, meta }) => (
                      <div className="field">
                        <label htmlFor="Qualification">Degree</label>
                        <span className="column">
                          <Dropdown id="Qualification"{...input} options={[{ label: "PHD", value: "PHD" }, { label: "Masters", value: "Masters" }, { label: "Graduation", value: "Graduation" }, { label: "Diploma", value: "Diploma" }]} placeholder="Select Qualification" className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                        </span>
                        {getFormErrorMessage(meta)}
                      </div>
                    )}
                  />
                </div>

                <div className="field col-12 md:col-6">
                  <Field
                    name="Specialization"
                    render={({ input, meta }) => (
                      <div className="field fluid">
                        <label htmlFor="Specialization">Specialization</label>
                        <span className="field fluid">
                          <InputText maxLength={50} id="Specialization" {...input} className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                          <label htmlFor="Specialization" className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                        </span>
                        {getFormErrorMessage(meta)}
                      </div>
                    )}
                  />
                </div>
                <div className="field col-12 md:col-6">
                  <Field
                    name="Start_Date"
                    render={({ input, meta }) => (
                      <div className="field fluid">
                        <label htmlFor="Start_Date">Date of Joining</label>
                        <span className="field fluid">
                          <Calendar id="Start_Date" {...input} dateFormat="mm/dd/yy" mask="99/99/9999" showIcon placeholder="Select Date of Joining" className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                        </span>
                        {getFormErrorMessage(meta)}
                      </div>
                    )}
                  />
                </div>

                <div className="field col-12 md:col-6">

                  <Field
                    name="End_Date"
                    render={({ input, meta }) => (
                      <div className="field fluid">
                        <label htmlFor="End_Date">Date Of Completion</label>
                        <span className="field fluid">
                          <Calendar id="End_Date" {...input} dateFormat="mm/dd/yy" mask="99/99/9999" showIcon placeholder="Select Date Of Completion" className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                        </span>
                        {getFormErrorMessage(meta)}
                      </div>
                    )}
                  />
                  </div>

                  <div className="field col-12 md:col-11">
                  <Field
                    name="Institute"
                    render={({ input, meta }) => (
                      <div className="field fluid">
                        <label htmlFor="Specialization">Institute/University</label>
                        <span className="field fluid">
                          <InputText maxLength={50} id="Institute" {...input} className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                          <label htmlFor="Institute" className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                        </span>
                        {getFormErrorMessage(meta)}
                      </div>
                    )}
                  />
                  <br>
                  </br>
                  <Field
                    name="Percentage"
                    render={({ input, meta }) => (
                      <div className="field fluid">
                        <label htmlFor="Percentage">Percentage /CGPA </label>
                        <span className="field fluid">
                          <InputText maxLength={50} id="Percentage" {...input} className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                          <label htmlFor="Percentage" className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                        </span>
                        {getFormErrorMessage(meta)}
                      </div>
                    )}
                  />


                </div>
              </div>


            </form>


          )}
        />
      </Dialog>



<div className="p-fluid  grid">
                                    <div className="field col-12 md:col-4">
                                        
                                        </div>
                                    <div className="field col-12 md:col-4">

                                        </div>
                                    <div className="field col-12 md:col-4 flex">
<Button onClick={e=>dispatch(setprevcandidateinfotab("lkdjf"))}>Previous</Button>
<Button onClick={e=>dispatch(setnextcandidateinfotab())}>Next</Button>
                                        </div>
                                        </div>
    </div>
  )
}

export default Employement