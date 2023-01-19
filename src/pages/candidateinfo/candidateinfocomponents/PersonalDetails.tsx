import { Button } from 'primereact/button'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Field, Form } from 'react-final-form'
import { setnextcandidateinfotab, setprevcandidateinfotab } from '../../../features/Misc/globalslice'
import classNames from 'classnames'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { Calendar } from 'primereact/calendar'
import { RootState } from '../../../app/store'
import { createpersonaldetailsaction, personaldetailsaction, updatepersonaldetailsaction, } from '../../../features/Candidate info/personaldetailsslice'

import { Panel } from 'primereact/panel'
import { InputTextarea } from 'primereact/inputtextarea'
import { InputNumber } from "primereact/inputnumber";
import { InputMask } from 'primereact/inputmask'
import { candidateinfogetaction } from '../../../features/Candidate info/candidateinfoslice'


function PersonalDetails() {
    var personalsdetailsdata = useSelector((state: RootState) => state.CandidatePersonaldetails);
    var candidateinfodata = useSelector((state: RootState) => state.candidateinfo);
    const logindata = useSelector((state: RootState) => state.Login)
    const [edit, setEdit] = useState(personalsdetailsdata.Name == ""?false:true)
    console.log(edit)
    console.log(candidateinfodata)
    const dispatch = useDispatch()


    useEffect(() => {

        console.log("working")
        // dispatch(candidateinfogetaction({

        //     "email": logindata.email


        // }))
        
            console.log(personalsdetailsdata)
            console.log(candidateinfodata)
            dispatch(personaldetailsaction({

                "selectedcandidateid": candidateinfodata.Selected_Candidate_ID
            }))
            personalsdetailsdata.Name == "" ? setEdit(false) : setEdit(true)
    
       

    }, [])
useEffect(()=>{
console.log(edit)
},[edit])



    const isFormFieldValid = (meta) => !!(meta.touched && meta.error);


    const getFormErrorMessage = (meta) => {
        return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
    };
    const options = [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' }
    ]
    const marital = [
        { value: 'single', label: 'Single' },
        { value: 'married', label: 'Married' }
    ]
    const bloodgroup = [
        { value: 'A+', label: 'A+' },
        { value: 'A-', label: 'A-' },
        { value: 'B+', label: 'B+' },
        { value: 'B-', label: 'B-' },
        { value: 'O+', label: 'O+' },
        { value: 'O-', label: 'O-' },
        { value: 'AB+', label: 'AB+' },
        { value: 'AB-', label: 'AB-' },
    ]
    return (
        <div>
            <Form
                // {console.log(candidateinfodata)}
                onSubmit={(values: any) => {
                    var datetemp = new Date(values.DateOfBirth)
                    // console.log(datetemp.getFullYear() + "-" + datetemp.getMonth() + "-" + datetemp.getDate())
                    values.DateOfBirth = datetemp.getFullYear() + "-" + (datetemp.getMonth() + 1).toString().padStart(2, '0') + "-" + datetemp.getDate().toString().padStart(2, '0')
                    var datetemp = new Date(values.PassportValidFrom)
                    // console.log(datetemp.getFullYear() + "-" + datetemp.getMonth() + "-" + datetemp.getDate())
                    values.PassportValidFrom = datetemp.getFullYear() + "-" + (datetemp.getMonth() + 1).toString().padStart(2, '0') + "-" + datetemp.getDate().toString().padStart(2, '0')
                    var datetemp = new Date(values.PassportValidTo)
                    // console.log(datetemp.getFullYear() + "-" + datetemp.getMonth() + "-" + datetemp.getDate())
                    values.PassportValidTo = datetemp.getFullYear() + "-" + (datetemp.getMonth() + 1).toString().padStart(2, '0') + "-" + datetemp.getDate().toString().padStart(2, '0')
                    console.log(values)
                    values.selectedCandidateid = candidateinfodata.Selected_Candidate_ID
                    edit ? dispatch(updatepersonaldetailsaction(values)) : dispatch(createpersonaldetailsaction(values))


                    dispatch(setnextcandidateinfotab(";jnkjjh"))
                }}
                initialValues={edit ? {
                    "Name": personalsdetailsdata.Name,
                    "Email": personalsdetailsdata.Email,

                    "DateOfBirth": new Date(personalsdetailsdata.DateOfBirth),

                    "Marital_status": personalsdetailsdata.Marital_status,

                    "Gender": personalsdetailsdata.Gender,

                    "BloodGroup": personalsdetailsdata.BloodGroup,

                    "PAN": personalsdetailsdata.PAN,

                    "AADHAR": personalsdetailsdata.AADHAR,


                    "ContactNumber": personalsdetailsdata.ContactNumber,

                    "EmergencycontactName": personalsdetailsdata.EmergencycontactName,

                    "EmergencycontactRelation": personalsdetailsdata.EmergencycontactRelation,

                    "EmergencycontactNumber": personalsdetailsdata.EmergencycontactNumber,

                    "Passport": personalsdetailsdata.Passport,

                    "PassportValidFrom": new Date(personalsdetailsdata.PassportValidFrom),

                    "PassportValidTo": new Date(personalsdetailsdata.PassportValidTo),

                    "Address": personalsdetailsdata.Address


                }: candidateinfodata.candidate?{

                    "ContactNumber": candidateinfodata.candidate.ContactNo,
                    "Email": candidateinfodata.candidate.Email,

                }:{}}


                render={({ handleSubmit, values, submitting,
                    submitError,
                    invalid,
                    pristine,
                    initialValues = {},
                    dirtySinceLastSubmit, }) => (
                    <form onSubmit={handleSubmit} >






                        <br></br>
                        <br></br>
                        <div className="p-fluid  grid">
                            <div className="field col-12 md:col-4">
                                <Field
                                    name="Name"
                                    render={({ input, meta }) => (
                                        <div className="field " >
                                            <label htmlFor="Employee Name">Employee Name (As per Aadhar Card)*</label>
                                            <span className="label">
                                                <InputText id="Employee Name " {...input} autoFocus className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                <label htmlFor="." className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )}
                                />
                            </div>
                            <div className="field col-12 md:col-4">
                                <Field
                                    name="DateOfBirth"
                                    render={({ input, meta }) => (
                                        <div className="field " >
                                            <label htmlFor="Employee Name">Date Of Birth (As per Aadhar Card)*</label>
                                            <Calendar id="ExpectedDOJ" {...input} dateFormat="mm/dd/yy" showIcon placeholder="Select a Date" className={classNames({ "p-invalid": isFormFieldValid(meta) })} />

                                            <span className="label">
                                                <label htmlFor="." className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )}
                                />
                            </div>
                            <div className="field col-12 md:col-4">
                                <Field
                                    name="Marital_status"
                                    render={({ input, meta }) => (
                                        <div className="field">
                                            <label htmlFor="Experience Level">Marital Status*</label>
                                            <span className="p-float-label">
                                                <Dropdown id="Marital Status" {...input} options={marital} placeholder="Select Marital Status " className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )}
                                />
                            </div>
                        </div>

                        <div className="p-fluid  grid">

                            <div className="field col-12 md:col-4">
                                <Field
                                    name="Gender"
                                    render={({ input, meta }) => (
                                        <div className="field">
                                            <label htmlFor="Experience Level">Gender*</label>
                                            <span className="p-float-label">
                                                <Dropdown id="Experience Level" {...input} options={options} placeholder="Select Gender" className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )}
                                />
                            </div>
                            <div className="field col-12 md:col-4">
                                <Field
                                    name="BloodGroup"
                                    render={({ input, meta }) => (
                                        <div className="field">
                                            <label htmlFor="Experience Level">Blood Group*</label>
                                            <span className="p-float-label">
                                                <Dropdown id="Experience Level" {...input} options={bloodgroup} placeholder="Select Blood Group" className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )}
                                />
                            </div>
                            <div className="field col-12 md:col-4">
                                <Field
                                    name="PAN"
                                    render={({ input, meta }) => (
                                        <div className="field " >
                                            <label htmlFor="Employee Name">PAN* </label>
                                            <span className="label">
                                                <InputText id="Employee Name " {...input} autoFocus maxLength={10} className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                <label htmlFor="." className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )}
                                />
                            </div>
                        </div>
                        <div className="p-fluid  grid">

                            <div className="field col-12 md:col-4"><Field
                                name="AADHAR"
                                render={({ input, meta }) => (
                                    <div className="field " >
                                        <label htmlFor="Employee Name"> Aadhaar* </label>
                                        <span className="label">
                                            <InputText id="Employee Name " {...input} autoFocus maxLength={12} className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                            <label htmlFor="." className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                                        </span>
                                        {getFormErrorMessage(meta)}
                                    </div>
                                )}
                            /></div>
                            <div className="field col-12 md:col-4"><Field
                                name="Email"
                                render={({ input, meta }) => (
                                    <div className="field " >
                                        <label htmlFor="Employee Name">Email*</label>
                                        <span className="label">
                                            <InputText id="Employee Name " {...input} autoFocus className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                            <label htmlFor="." className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                                        </span>
                                        {getFormErrorMessage(meta)}
                                    </div>
                                )}
                            /></div>
                            <div className="field col-12 md:col-4"><Field
                                name="ContactNumber"
                                render={({ input, meta }) => (
                                    <div className="field " >
                                        <label htmlFor="ContactNumber">Contact No*</label>
                                        <span className="label">
                                            {/* <InputNumber id="Employee Name " value={values.NoOfPositions} onChange={e=>values["ContactNumber"]=e.value} max={9999999999} {...input} autoFocus className={classNames({ "p-invalid": isFormFieldValid(meta) })} /> */}
                                            <InputMask  {...input} value={values["ContactNumber"]} onChange={(e) => values["ContactNumber"] = e.value} mask="99-9999999999" />
                                            <label htmlFor="." className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                                        </span>
                                        {getFormErrorMessage(meta)}
                                    </div>
                                )}
                            /></div>
                        </div>
                        <div className="p-fluid  grid">
                            <div className="field col-12 md:col-4">
                                <Field
                                    name="Address"
                                    render={({ input, meta }) => (
                                        <div className="field " >
                                            <label htmlFor="Employee Name">Address (As per Aadhaar) *</label>
                                            <span className="label">
                                                <InputTextarea style={{ width: "100%" }} id="Employee Name " {...input} autoFocus className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                <label htmlFor="." className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )}
                                />
                            </div>
                        </div>

                        {/* contact no */}
                        <Panel header="Emergency Contact:">
                            <div className="p-fluid  grid">

                                <div className="field col-12 md:col-4">

                                    <Field
                                        name="EmergencycontactName"
                                        render={({ input, meta }) => (
                                            <div className="field ">
                                                <label htmlFor="Employee Name">Name*</label>
                                                <span className="label">
                                                    <InputText id="Employee Name " {...input} autoFocus className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                    <label htmlFor="." className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                                                </span>
                                                {getFormErrorMessage(meta)}
                                            </div>
                                        )}
                                    /></div>
                                <div className="field col-12 md:col-4">
                                    <Field
                                        name="EmergencycontactRelation"
                                        render={({ input, meta }) => (
                                            <div className="field " >
                                                <label htmlFor="Employee Name">Relation*</label>
                                                <span className="label">
                                                    <InputText id="Employee Name " {...input} autoFocus className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                    <label htmlFor="." className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                                                </span>
                                                {getFormErrorMessage(meta)}
                                            </div>
                                        )}
                                    />
                                </div>
                                <div className="field col-12 md:col-4"><Field
                                    name="EmergencycontactNumber"
                                    render={({ input, meta }) => (
                                        <div className="field " >
                                            <label htmlFor="Employee Name">Contact No*</label>
                                            <span className="label">
                                                <InputMask  {...input} value={values["EmergencycontactNumber"]} onChange={(e) => values["EmergencycontactNumber"] = e.value} mask="99-9999999999" />
                                                <label htmlFor="." className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )}
                                /></div>
                            </div>
                        </Panel>
                        <br></br>
                        <Panel header="Passport Details:">

                            <div className="p-fluid  grid">
                                <div className="field col-12 md:col-4">
                                    <Field
                                        name="Passport"
                                        render={({ input, meta }) => (
                                            <div className="field " >
                                                <label htmlFor="Employee Name">Passport No*</label>
                                                <span className="label">
                                                    <InputText id="Employee Name " {...input} autoFocus maxLength={8} className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                    <label htmlFor="." className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                                                </span>
                                                {getFormErrorMessage(meta)}
                                            </div>
                                        )}
                                    />
                                </div>
                                <div className="field col-12 md:col-4">
                                    <Field
                                        name="PassportValidFrom"
                                        render={({ input, meta }) => (
                                            <div className="field " >
                                                <label htmlFor="Employee Name">Valid from*</label>
                                                <span className="label">
                                                    <Calendar id="ExpectedDOJ" {...input} dateFormat="mm/dd/yy" showIcon placeholder="Select a Date" className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                    <label htmlFor="." className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                                                </span>
                                                {getFormErrorMessage(meta)}
                                            </div>
                                        )}
                                    />
                                </div>
                                <div className="field col-12 md:col-4"><Field
                                    name="PassportValidTo"
                                    render={({ input, meta }) => (
                                        <div className="field " >
                                            <label htmlFor="Employee Name">Valid to*</label>
                                            <span className="label">
                                                <Calendar id="ExpectedDOJ" {...input} dateFormat="mm/dd/yy" showIcon placeholder="Select a Date" className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                <label htmlFor="." className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )}
                                /></div>
                            </div>
                        </Panel>


                        <br></br>
                        <br></br>
                        <br></br>
                        <div className="p-fluid  grid">


                            <div className="field col-12 md:col-4 flex">
                                <Button className="mr-3" onClick={e => console.log()}>cancel</Button>
                                <Button type='submit'
                                // onClick={e => dispatch(setnextcandidateinfotab(";aufhds"))}
                                >Next</Button>
                            </div>
                        </div>

                    </form>


                )}
            />


        </div>
    )
}

export default PersonalDetails