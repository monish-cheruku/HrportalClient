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
import { createfamilydetailsaction, deletefamilydetailsaction, familydetailsaction, updatefamilydetailsaction } from '../../../features/Candidate info/familydetailsslice'
// import { createfamilydetailsaction, familydetailsaction, updatefamilydetailsaction } from '../../../features/Candidateinfo/familydetailsslice'

function FamilyDetails() {

    const familydetailsdata = useSelector((state: RootState) => state.CandidateFamilydetails);
    // const [fullname, setFullname] = useState("");
    // const [dateofbirth, setDateofbirth] = useState("");
    // const [relationshipwithemployee, setRelationshipwithemployee] = useState("");
    // const [contactnumber, setContactnumber] = useState("");
    // const [productDialog, setProductDialog] = useState(false);
    // const [submitted, setSubmitted] = useState(false);
    // const [issave, setissave] = useState(false);
    // const toastdata = useSelector((state: RootState) => state.toaster);
    const [tempdata, settempdata] = useState<any>({})

    const [editmode, setEditmode] = useState(false);
    var candidateinfodata = useSelector((state: RootState) => state.candidateinfo);
    const [modalDialog, setModaldialog] = useState(false);
    const isFormFieldValid = (meta) => !!(meta.touched && meta.error);

    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(familydetailsaction(
            {
                "selectedcandidateid": candidateinfodata.Selected_Candidate_ID

            }
        ))
        console.log(familydetailsdata)
    }, [])
    
    const validate = (values) => {
        values["CurrentCTC"] = values["CurrentCTC"]
        let errors = {};
        // console.log(data)

        // if (!data.JobDesc) {
        //     errors.JobDesc = "*JobDescription is required.";
        // }
        // if (!data.JobTitle) {
        //     errors.JobTitle = "*JobDescription is required.";
        // }
        // var arr = ["CandidateFirstName", "BusinessUnit_id", "Serviceline_id", "Industry_id", "Industry_id", "Customer_id", "Location_id", "EmploymentType", "JobTitle", "JobDesc", "ExperianceLevel_id", "Qualification", "NoOfPositions", "OnBoardingDate", "HR_User_Name", "BH_User_Name"]
        var arr = ["FullName", "Date_Of_Birth", "Contact_Number", "Relationship_with_employee"]
        arr.forEach((i) => {
            // console.log(values["Resume"])
            if (!values[i]) {
                // console.log(i.toString())
                errors[i.toString()] = "* This field is required";
            }
        })
        // console.log(values["OverallExpYear"])
        if (values["FullName"] == undefined || values["FullName"] == null) {

            errors["FullName"] = "*This field is required"
        }

        if (values["Date_Of_Birth"] == undefined || values["Date_Of_Birth"] == null) {

            errors["Date_Of_Birth"] = "*This field is required"
        }

        
        
        if (values["Relationship_with_employee"] == undefined || values["Relationship_with_employee"] == null) {

            errors["Relationship_with_employee"] = "*This field is required"
        }
        
        
        if (values["Contact_Number"] == undefined || values["Contact_Number"] == null) {

            errors["Contact_Number"] = "*Enter correct number "
        }
       
        
        // if (!editmode && (values["Resume"] == null)) {

        //     errors["Resume"] = "*This field is required"
        // }
        console.log(errors)
        return errors;
    };


    const getFormErrorMessage = (meta) => {
        return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
    };
    return (
        <div>
            <Button onClick={e => { setEditmode(false); setModaldialog(true) }}>Add family details</Button>
            <Dialog visible={modalDialog} style={{ width: "450px" }} header={editmode ? "Edit  Information " : "Add  Information "} modal className="p-fluid" onHide={() => setModaldialog(false)}>

                <Form
                    onSubmit={(values: any) => {
                        var datetempstart = new Date(values.Date_Of_Birth)
                        // console.log(datetemp.getFullYear() + "-" + datetemp.getMonth() + "-" + datetemp.getDate())
                        values.Date_Of_Birth = datetempstart.getFullYear() + "-" + (datetempstart.getMonth() + 1).toString().padStart(2, '0') + "-" + datetempstart.getDate().toString().padStart(2, '0')


                        values.selectedcandidateid = candidateinfodata.Selected_Candidate_ID
                        console.log(values)
                        if (!editmode) {
                            dispatch(createfamilydetailsaction(values))
                            setModaldialog(false)
                        }
                        else {
                            dispatch(updatefamilydetailsaction(values))
                            setEditmode(false)
                            settempdata(undefined)
                            setModaldialog(false)

                        }
                    }}
                    initialValues={!editmode ? {

                    } : {
                        id: tempdata.id,
                        FullName: tempdata.FullName,
                        Date_Of_Birth: new Date(tempdata.Date_Of_Birth),
                        Relationship_with_employee: tempdata.Relationship_with_employee,
                        Contact_Number: tempdata.Contact_Number,
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
                                        name="FullName"
                                        render={({ input, meta }) => (
                                            <div className="field fluid">
                                                <label htmlFor="FullName">Full Name</label>
                                                <span className="field fluid">
                                                    <InputText maxLength={50} id="FullName" {...input} className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                    <label htmlFor="FullName" className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                                                </span>
                                                {getFormErrorMessage(meta)}
                                            </div>
                                        )}
                                    />
                                </div>
                                <div className="field col-12 md:col-6">
                                    <Field
                                        name="Date_Of_Birth"
                                        render={({ input, meta }) => (
                                            <div className="field " >
                                                <label htmlFor="Date_Of_Birth ">Date Of Birth (As per Aadhar Card)*</label>
                                                <Calendar id="ExpectedDOJ" {...input} dateFormat="mm/dd/yy" showIcon placeholder="Select a Date" className={classNames({ "p-invalid": isFormFieldValid(meta) })} />

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
                                        name="Relationship_with_employee"
                                        render={({ input, meta }) => (
                                            <div className="field fluid">
                                                <label htmlFor="Relationship_with_employee">Relationship with Employee</label>
                                                <span className="field fluid">
                                                    <InputText maxLength={50} id="Relationship_with_employee" {...input} className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                    <label htmlFor="Relationship_with_employee" className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                                                </span>
                                                {getFormErrorMessage(meta)}
                                            </div>
                                        )}
                                    />
                                </div>

                                <div className="field col-12 md:col-11">
                                    <Field
                                        name="Contact_Number"
                                        render={({ input, meta }) => (
                                            <div className="field " >
                                                <label htmlFor="Contact_Number">Contact No*</label>
                                                <span className="label">
                                                    {/* <InputNumber id="Employee Name " value={values.NoOfPositions} onChange={e=>values["ContactNumber"]=e.value} max={9999999999} {...input} autoFocus className={classNames({ "p-invalid": isFormFieldValid(meta) })} /> */}
                                                    {/* <InputMask  value="12345"   mask="99-9999999999" /> */}
                                                    {/* <InputMask id="Contact_Number" mask="99-9999999999" {...input} value={values.Contact_Number} placeholder="91-9999999999" ></InputMask> */}
                                                    <InputMask {...input}   mask="99-9999999999" />

                                                    <label htmlFor="." className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                                                </span>
                                                {getFormErrorMessage(meta)}
                                            </div>
                                        )}
                                    />
                                    <br>
                                    </br>



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
                {familydetailsdata.length > 0 ? familydetailsdata.map((e) => <div >
                    <Card>
                        <div className="p-fluid  grid" style={{ backgroundColor: "lightblue" }}>
                            <div className="field col-12 md:col-12 flex" >
                                <br></br>
                                {/* <h3>{e.Qualification}</h3> */}
                                <h2> <i className="pi pi-pencil mr-2" style={{ cursor: "pointer", backgroundColor: "blue", padding: "4px", borderRadius: "9px", color: "white" }}

                                    onClick={() => { setEditmode(true); settempdata(e); setModaldialog(true); }}
                                > Edit Info</i>
                                    <i className="pi pi-trash mr-2" style={{ cursor: "pointer", backgroundColor: "red", padding: "4px", borderRadius: "9px", color: "white" }}
                                        onClick={() => {
                                            console.log("")
                                                dispatch(deletefamilydetailsaction({
                                              "id": e.id

                                            }))
                                        }}
                                    > Delete</i>

                                </h2>

                                {/* <Button style={{ width: "120px", height: "50px" }} className="btn btn-primary" onClick={() => { setEditmode(true); settempdata(e); setModaldialog(true); }}>edit</Button> */}
                                <br></br>
                                {/* Qualification:{e.Qualification} */}
                                <br>
                                </br>
                                Full Name : {e.FullName}
                                <br>
                                </br>

                                Date of Birth : {e.Date_Of_Birth}
                                <br>
                                </br>
                                Relationship with Employee : {e.Relationship_with_employee}
                                <br>
                                </br>
                                Contact Number : {e.Contact_Number}
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
                    <Button onClick={e => dispatch(setprevcandidateinfotab("lkdjf"))}>Previous</Button>
                    <Button onClick={e => dispatch(setnextcandidateinfotab())}>Next</Button>
                </div>
            </div>
        </div>
    )
}

export default FamilyDetails