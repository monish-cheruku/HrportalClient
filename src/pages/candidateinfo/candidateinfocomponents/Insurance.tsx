import { Button } from 'primereact/button'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Field, Form } from 'react-final-form'
import { setnextcandidateinfotab, setprevcandidateinfotab } from '../../../features/Misc/globalslice'
import { Card } from 'primereact/card'
import { InputText } from 'primereact/inputtext'
import { Checkbox } from 'primereact/checkbox'
import { Dialog } from 'primereact/dialog'
import { InputTextarea } from 'primereact/inputtextarea'
import classNames from 'classnames'
import { Calendar } from 'primereact/calendar'
import { InputMask } from 'primereact/inputmask'
import { RootState } from '../../../app/store'
import { createinsuranceaction, deleteinsuranceaction, insuranceaction, updateinsuranceaction } from '../../../features/Candidate info/insuranceslice'
import { Dropdown } from 'primereact/dropdown'

function Insurance() {

    const insurancedata = useSelector((state: RootState) => state.CandidateInsurance);
   
    const [tempdata, settempdata] = useState<any>({})

    const [editmode, setEditmode] = useState(false);
    var candidateinfodata = useSelector((state: RootState) => state.candidateinfo);
    const [modalDialog, setModaldialog] = useState(false);
    const isFormFieldValid = (meta) => !!(meta.touched && meta.error);

    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(insuranceaction(
            {
                "selectedcandidateid": candidateinfodata.Selected_Candidate_ID

            }
        ))
        console.log(insurancedata)
    }, [])
    const options = [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' }
    ]
    const validate = (values) => {
        values["CurrentCTC"] = values["CurrentCTC"]
        let errors = {};
        
        var arr = ["Name", "DateOfBirth", "Relationship", "Gender", "PercentageofInsurance"]
        arr.forEach((i) => {
            if (!values[i]) {
                errors[i.toString()] = "* This field is required";
            }
        })
        if (values["Name"] == undefined || values["Name"] == null) {

            errors["Name"] = "*This field is required"
        }

        if (values["DateOfBirth"] == undefined || values["DateOfBirth"] == null) {

            errors["DateOfBirth"] = "*This field is required"
        }

        
        
        if (values["Relationship"] == undefined || values["Relationship"] == null) {

            errors["Relationship"] = "*This field is required"
        }
        
        
        if (values["Gender"] == undefined || values["Gender"] == null) {

            errors["Gender"] = "*This field is required"
        }
        if (values["PercentageofInsurance"] == undefined || values["PercentageofInsurance"] == null) {

            errors["PercentageofInsurance"] = "*This field is required"
        }
       
        
        
        console.log(errors)
        return errors;
    };


    const getFormErrorMessage = (meta) => {
        return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
    };
    return (
        <div>
            <Button onClick={e => { setEditmode(false); setModaldialog(true) }}>Add Insurance</Button>
            <Dialog visible={modalDialog} style={{ width: "450px" }} header={editmode ? "Edit  Information " : "Add  Information "} modal className="p-fluid" onHide={() => setModaldialog(false)}>

                <Form
                    onSubmit={(values: any) => {
                        var datetempstart = new Date(values.DateOfBirth)
                        values.DateOfBirth = datetempstart.getFullYear() + "-" + (datetempstart.getMonth() + 1).toString().padStart(2, '0') + "-" + datetempstart.getDate().toString().padStart(2, '0')


                        values.selectedcandidateid = candidateinfodata.Selected_Candidate_ID
                        console.log(values)
                        if (!editmode) {
                            console.log(values)
                            dispatch(createinsuranceaction(values))
                            setModaldialog(false)
                        }
                        else {
                            dispatch(updateinsuranceaction(values))
                            setEditmode(false)
                            settempdata(undefined)
                            setModaldialog(false)

                        }
                    }}
                    initialValues={!editmode ? {
                    } : {
                        
                        id:tempdata.id,
                        Name: tempdata.Name,
                        DateOfBirth: new Date(tempdata.DateOfBirth),
                        Relationship: tempdata.Relationship,
                        Gender: tempdata.Gender,
                        PercentageofInsurance: tempdata.PercentageofInsurance,
                    }}

                    validate={validate}

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
                                        name="Name"
                                        render={({ input, meta }) => (
                                            <div className="field fluid">
                                                <label htmlFor="Name">Name*</label>
                                                <span className="field fluid">
                                                    <InputText maxLength={50} id="Name" {...input} className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                    <label htmlFor="Name" className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                                                </span>
                                                {getFormErrorMessage(meta)}
                                            </div>
                                        )}
                                    />
                                </div>
                                <div className="field col-12 md:col-6">
                                    <Field
                                        name="DateOfBirth"
                                        render={({ input, meta }) => (
                                            <div className="field " >
                                                <label htmlFor="DateOfBirth ">Date Of Birth*</label>
                                                <Calendar id="DateOfBirth" {...input} dateFormat="mm/dd/yy" showIcon placeholder="Select a Date" className={classNames({ "p-invalid": isFormFieldValid(meta) })} />

                                                <span className="label">
                                                    <label htmlFor="." className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                                                </span>
                                                {getFormErrorMessage(meta)}
                                            </div>
                                        )}
                                    />
                                </div>

                                <div className="field col-12 md:col-6">

                                    <Field
                                        name="Relationship"
                                        render={({ input, meta }) => (
                                            <div className="field fluid">
                                                <label htmlFor="Relationship">Relationship* </label>
                                                <span className="field fluid">
                                                    <InputText maxLength={50} id="Relationship" {...input} className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                    <label htmlFor="Relationship" className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                                                </span>
                                                {getFormErrorMessage(meta)}
                                            </div>
                                        )}
                                    />
                                </div>
                                <div className="field col-12 md:col-6">

                                <Field
                                    name="Gender"
                                    render={({ input, meta }) => (
                                        <div className="field">
                                            <label htmlFor="Gender ">Gender*</label>
                                            <span className="p-float-label">
                                                <Dropdown id="Gender " {...input} options={options} placeholder="Select Gender" className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )}
                                />
                                </div>
                                <div className="field col-12 md:col-6">

                                    <Field
                                        name="PercentageofInsurance"
                                        render={({ input, meta }) => (
                                            <div className="field fluid">
                                                <label htmlFor="PercentageofInsurance">Percentage of insurance*</label>
                                                <span className="field fluid">
                                                    <InputText maxLength={50} id="PercentageofInsurance" {...input} className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                    <label htmlFor="PercentageofInsurance" className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                                                </span>
                                                {getFormErrorMessage(meta)}
                                            </div>
                                        )}
                                    />
                                </div>

                                
                            </div>
                            <div className="p-fluid  grid">
                                <div className="field col-12 md:col-6">

                                    <Button type='button' onClick={e => setModaldialog(false)}>Cancel</Button>
                                </div>
                                <div className="field col-12 md:col-6">
                                    <Button type='submit'> Save</Button>
                                </div>
                            </div>
                        </form>


                    )}
                />
            </Dialog>
            <br></br>

            <div >
                {insurancedata.length > 0 ? insurancedata.map((e) => <div >
                    <Card>
                        <div className="p-fluid  grid" style={{ backgroundColor: "lightblue" }}>
                            <div className="field col-12 md:col-12 flex" >
                                <br></br>
                                <h2> <i className="pi pi-pencil mr-2" style={{ cursor: "pointer", backgroundColor: "blue", padding: "4px", borderRadius: "9px", color: "white" }}

                                    onClick={() => { console.log(e);setEditmode(true); settempdata(e); setModaldialog(true); }}
                                > Edit Info</i>
                                    <i className="pi pi-trash mr-2" style={{ cursor: "pointer", backgroundColor: "red", padding: "4px", borderRadius: "9px", color: "white" }}
                                        onClick={() => {
                                            console.log("")
                                                dispatch(deleteinsuranceaction({
                                              "id": e.id

                                            }))
                                        }}
                                    > Delete</i>

                                </h2>

                                
                                <br>
                                </br>
                                Full Name : {e.Name}
                                <br>
                                </br>

                                Date of Birth : {e.DateOfBirth}
                                <br>
                                </br>
                                Relationship with Employee : {e.Relationship}
                                <br>
                                </br>
                                Gender : {e.Gender}
                                <br>
                                </br>
                                Percentage of insurance : {e.PercentageofInsurance}
                                <br>
                                </br>

                            </div>
                        </div>
                    </Card>
                    <br></br>




                </div>)

                    : <></>}
            </div>




            <div className="p-fluid  grid">

                <div className="field col-12 md:col-4 flex">
                    <Button onClick={e => dispatch(setprevcandidateinfotab())}>Previous</Button>
                    <Button onClick={e => dispatch(setnextcandidateinfotab())}>Next</Button>
                </div>
            </div>
        </div>
    )
}

export default Insurance