import { Calendar } from 'primereact/calendar'
import { Card } from 'primereact/card'
import { Dropdown } from 'primereact/dropdown'
import { InputNumber } from 'primereact/inputnumber'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { classNames } from 'primereact/utils'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Field, Form } from 'react-final-form'
import { InputMask } from 'primereact/inputmask';
import { FileUpload } from 'primereact/fileupload';
import { Button } from "primereact/button";
import { connect, useDispatch } from 'react-redux'
import { createnewcandidate, ICandidate, updatecandidate } from '../../features/CandidateActions/candidateactionsslice'
import { useNavigate } from 'react-router'
import { useLocation } from 'react-router'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { getManageBillaction } from '../../features/ManageBillRate/ManageBillRateslice'
import { Panel } from 'primereact/panel'
import { downloadresume } from '../../features/Downloadpdfs/pdfslice'
import { Link } from 'react-router-dom'
import { getemplyementtypes } from '../../features/Dropdownoptions/Employementtypeselector'
import { getLocationaction } from '../../features/Location/Locationslice'
import { getactiveLocationoptions } from '../../features/Location/LocationSelector'
import { employementaction } from '../../features/Dropdownoptions/employementtypeslice'

function CreateCandidateProfile(props) {
    const dispatch = useDispatch()
    const location = useLocation()
    // console.log(location.state)
    const [editmode, setEditmode] = useState(!!location.state.data)
    const [datafromprops, setdatafromprops] = useState<any>()
    const ctcdatafromstore = useSelector((store: RootState) => store.ManageBill)
    const logindata = useSelector((store: RootState) => store.Login)
    const fileref = useRef()
    const navigate = useNavigate()
    const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
    const [filechange, setFilechange] = useState(false)
    // useLayoutEffect(() => {
    //     if (!location.state && editmode) {
    //         navigate("/dashboard")
    //     }
    //     if (editmode) {
    //         setdatafromprops(location.state.data)
    //     }
    //     console.log(datafromprops)
    // }, [])
    useEffect(() => {
        if (location.pathname == "/candidate/updatecandidateprofile" && !editmode) {
            // console.log(location)
            navigate("/dashboard")
        }
        if (editmode) {
            setdatafromprops(location.state.data)
        }

        dispatch(getManageBillaction());
        console.log(datafromprops)
    }, [])
    useEffect(() => {
        dispatch(getLocationaction());
        
        dispatch(employementaction())

        console.log(datafromprops)
        console.log(location.state)
    }, [])
    const getFormErrorMessage = (meta) => {
        return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
    };
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
        // var arr = ["CandidateFirstName", "BusinessUnit_id", "Serviceline_id", "Industry_id", "Industry_id", "Customer_id", "Location", "EmploymentType", "JobTitle", "JobDesc", "ExperianceLevel_id", "Qualification", "NoOfPositions", "OnBoardingDate", "HR_User_Name", "BH_User_Name"]
        var arr = ["CanFirstName", "CanLastName", "Qualification", "Skills", "ExpectedDOJ", "Email",
            "ContactNo", "CurrentCTC", "ExpectedCTC", "AvgBillRate","Job Location","EmploymentType"]
        arr.forEach((i) => {
            // console.log(values["Resume"])
            if (!values[i]) {
                // console.log(i.toString())
                errors[i.toString()] = "* This field is required";
            }
        })
        // console.log(values["OverallExpYear"])
        if (values["OverallExpYear"] == undefined || values["OverallExpYear"] == null) {

            errors["OverallExpYear"] = "*This field is required"
        }

        if (values["OverallExpMonth"] == undefined || values["OverallExpMonth"] == null) {

            errors["OverallExpMonth"] = "*This field is required"
        }

        if (values["ReleventExpYear"] == undefined || values["ReleventExpYear"] == null) {

            errors["ReleventExpYear"] = "*This field is required"
        }
        if (values["ReleventExpMonth"] == undefined || values["ReleventExpMonth"] == null) {

            errors["ReleventExpMonth"] = "*This field is required"
        }
        if (!values["Duration"] && values.EmploymentType != "Full-Time") {
            console.log(values["Duration"])
            console.log(values["Full-Time"])

            errors["Duration"] = "*This field is required"
        }
        if (!editmode && (values["Resume"] == null)) {

            errors["Resume"] = "*This field is required"
        }
        console.log(errors)
        return errors;
    };

    return (
        <>

            <div>
                <Card title={editmode ? "Update Candidate Profile" : "Create Candidate Profile"}>
                    <Form
                        onSubmit={(values: any) => {
                            console.log(values)

                            if (values.Resume == null) {

                                validate(values)
                                return
                            }
                            // console.log(values.ExpectedDOJ)
                            var datetemp = new Date(values.ExpectedDOJ)
                            // console.log(datetemp.getFullYear() + "-" + datetemp.getMonth() + "-" + datetemp.getDate())
                            values.ExpectedDOJ = datetemp.getFullYear() + "-" + (datetemp.getMonth() + 1).toString().padStart(2, '0') + "-" + datetemp.getDate().toString().padStart(2, '0')
                            const data = new FormData()
                            data.append("HRUserName", values.HRUserName)
                            data.append("CanFirstName", values.CanFirstName)
                            data.append("CanLastName", values.CanLastName)
                            data.append("Qualification", values.Qualification)
                            data.append("Job_Post_ID", values.Job_Post_ID.toString())
                            data.append("ExpectedDOJ", values.ExpectedDOJ)
                            data.append("OverallExpYear", values.OverallExpYear)
                            data.append("OverallExpMonth", values.OverallExpMonth)
                            data.append("ReleventExpYear", values.ReleventExpYear)
                            data.append("ReleventExpMonth", values.ReleventExpMonth)
                            data.append("EmploymentType", values.EmploymentType)
                            data.append("Duration", values.EmploymentType=="Full-Time"?"":values["Duration"])
                            data.append("Location", values["Job Location"])

                            data.append("CurrentCTC", values.CurrentCTC)
                            data.append("ExpectedCTC", values.ExpectedCTC)
                            values.NegotiatedCTC ? data.append("NegotiatedCTC", values.NegotiatedCTC) : data.append("NegotiatedCTC", '')
                            data.append("CurrentOrganization", values.CurrentOrganization ? values.CurrentOrganization : '')
                            data.append("CurrentJobLocation", values.CurrentJobLocation ? values.CurrentJobLocation : '')
                            data.append("Skills", values.Skills)
                            data.append("Email", values.Email)
                            data.append("ContactNo", values.ContactNo.toString())
                            data.append("AvgApprovedCTC", values.AvgApprovedCTC)
                            data.append("AvgBillRate", values.AvgBillRate)
                            data.append("CreatedBy", values.CreatedBy)
                            data.append("ModifiedBy", values.ModifiedBy ? values.ModifiedBy : '')
                            data.append("Resume", values.Resume)
                            data.append("Comments", values.Comments)
                            // data.append(

                            //     "files",

                            //     idea.uploadFile[i],

                            //     idea.uploadFile[i].name.toString()




                            // "HRUserName",
                            // "CanFirstName",
                            // "CanLastName",
                            // "Qualification",
                            // "OverallExpYear",
                            // "OverallExpMonth",
                            // "ReleventExpYear",
                            // "ReleventExpMonth",
                            // "CurrentCTC",
                            // "ExpectedCTC",
                            // "NegotiatedCTC",
                            // "ExpectedDOJ",
                            // "CurrentOrganization",
                            // "CurrentJobLocation",
                            // "Skills",
                            // "Email",
                            // "ContactNo",
                            // "Resume",
                            // "AvgApprovedCTC",
                            // "AvgBillRate",            
                            // "Job_Post_ID",   
                            // "CreatedBy",
                            // "ModifiedBy"

                            if (editmode) {
                                data.append("CandidateId", datafromprops.CandidateId.toString())
                                data.append("ModifiedBy", logindata.username)
                                // console.log("upda")
                                dispatch(updatecandidate(data))
                                navigate(-1)
                            }
                            else {

                                dispatch(createnewcandidate(data))
                                navigate(-1)
                            }
                        }}

                        initialValues={editmode ? {
                            "CanFirstName": datafromprops?.CanFirstName,
                            // "CanLastName":  datafromprops?.CanLastName,
                            "AvgApprovedCTC": datafromprops?.AvgApprovedCTC,
                            "AvgBillRate": datafromprops?.AvgBillRate,
                            "CanLastName": datafromprops?.CanLastName,
                            "CandidateCode": datafromprops?.CandidateCode,
                            "CandidateId": datafromprops?.CandidateId,
                            "ContactNo": datafromprops?.ContactNo,
                            "CreatedBy": datafromprops?.CreatedBy,
                            "CreatedOn": datafromprops?.CreatedOn,
                            "CurrentCTC": datafromprops?.CurrentCTC,
                            "CurrentJobLocation": datafromprops?.CurrentJobLocation,
                            "CurrentOrganization": datafromprops?.CurrentOrganization,
                            "Email": datafromprops?.Email,
                            "EmploymentType":datafromprops?.EmploymentType,
                            "Duration":datafromprops?.Duration,
                            "Job Location": datafromprops?.Location,
                            "ExpectedCTC": datafromprops?.ExpectedCTC,
                            "ExpectedDOJ": new Date(datafromprops?.ExpectedDOJ),
                            "HRUserName": datafromprops?.HRUserName,
                            "Job_Code": datafromprops?.Job_Code,
                            "Job_Post_ID": datafromprops?.Jobpost,
                            "ModifiedBy": logindata.username,
                            "ModifiedOn": datafromprops?.ModifiedOn,
                            "NegotiatedCTC": datafromprops?.NegotiatedCTC,
                            "OverallExpMonth": datafromprops?.OverallExpMonth,
                            "OverallExpYear": datafromprops?.OverallExpYear,
                            "Qualification": datafromprops?.Qualification,
                            "ReleventExpMonth": datafromprops?.ReleventExpMonth,
                            "ReleventExpYear": datafromprops?.ReleventExpYear,
                            "Resume": datafromprops?.Resume,
                            "Skills": datafromprops?.Skills,
                            "Stage": datafromprops?.Stage,
                            "Comments": datafromprops?.Comments,

                        } : {
                            "OverallExpYear": 0,
                            "OverallExpMonth": 0,
                            "ReleventExpYear": 0,
                            "ReleventExpMonth": 0,
                            "HRUserName": logindata.username,
                            "Job_Post_ID": location.state.jobdata.JobPostID,
                            "CreatedBy": logindata.username,
                            "ModifiedBy": '',
                            "AvgApprovedCTC": location.state.jobdata.AvgApprovedCTC,
                            "AvgBillRate": location.state.jobdata.AvgBillRate,
                            "Resume": null,
                            // "Job Location": location.state.jobdata.,
                            "NegotiatedCTC": null,
                            "CurrentOrganization": '',
                            "EmploymentType":location.state.jobdata.EmploymentType,
                            "Duration":location.state.jobdata.Duration,
                            "Job Location": location.state.jobdata.Location_ID
                            // "Job Location":1,


                            //default default values
                            // "CanFirstName": "akjf648",
                            // "CanLastName": "B",
                            // "Qualification": "Masters",
                            // "ExpectedDOJ": new Date("2023-02-30"),

                            // "CurrentCTC": "100000",
                            // "ExpectedCTC": "100000",                           

                            // "Skills": "Java",
                            // "Email": "sbatchu@belcan.com",
                            // "ConatctNo": "10-932234566",

                        }}
                        // initialValues={{  }}
                        validate={validate}
                        render={({ handleSubmit, values, submitting,
                            submitError,
                            invalid,
                            pristine,
                            initialValues = {},
                            dirtySinceLastSubmit, }) => (

                            <form onSubmit={handleSubmit} >
                                <div className="p-fluid  grid">
                                    <div className="field col-12 md:col-4">
                                        <Field
                                            name="CanFirstName"
                                            render={({ input, meta }) => (
                                                <div className="field fluid">
                                                    <label htmlFor="CandidateFirstName">Candidate First Name</label>
                                                    <span className="field fluid">
                                                        <InputText maxLength={50} id="CandidateFirstName" {...input} className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                        <label htmlFor="CandidateFirstName" className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                                                    </span>
                                                    {getFormErrorMessage(meta)}
                                                </div>
                                            )}
                                        />
                                    </div>

                                    <div className="field col-12 md:col-4">
                                        <Field
                                            name="CanLastName"
                                            render={({ input, meta }) => (
                                                <div className="field fluid">
                                                    <label htmlFor="CandidateLastName">Candidate Last Name</label>
                                                    <span className="field fluid">
                                                        <InputText maxLength={50} id="CandidateLastName" {...input} className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                        <label htmlFor="CandidateLastName" className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                                                    </span>
                                                    {getFormErrorMessage(meta)}
                                                </div>
                                            )}
                                        />
                                    </div>

                                    <div className="field col-12 md:col-4">

                                        <Field
                                            name="Qualification"
                                            render={({ input, meta }) => (
                                                <div className="field fluid">
                                                    <label htmlFor="Qualificationn">Highest Qualification</label>
                                                    <span className="field fluid">
                                                        <Dropdown id="Qualification" {...input} options={[{ label: "PHD", value: "PHD" }, { label: "Masters", value: "Masters" }, { label: "Graduation", value: "Graduation" }, { label: "Diploma", value: "Diploma" }]} optionLabel="label" placeholder="Select a Highest Qualification" className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                        <label htmlFor="Qualificationn" className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                                                    </span>
                                                    {getFormErrorMessage(meta)}
                                                </div>
                                            )}
                                        />

                                    </div>
                                </div>

                                <div className="p-fluid  grid">
                                    <div style={{ textAlign: "left" }} className="field col-12 md:col-4">
                                        <label style={{ textAlign: "center" }}>Overall Experience</label>
                                        <div className="formgrid grid">
                                            <div className="field col-12 md:col-6">
                                                <Field
                                                    name="OverallExpYear"
                                                    render={({ input, meta }) => (
                                                        <div className="field fluid">
                                                            <label htmlFor="OverallExpYear">Years</label>
                                                            <span className="field fluid">
                                                                <InputNumber id="OverallExpYear" value={values.OverallExpYear} onBlur={input.onBlur} onValueChange={(e) => input.onChange(e)} showButtons className={classNames({ "p-invalid": isFormFieldValid(meta) })} mode="decimal" min={0} max={60} />
                                                                <label htmlFor="OverallExpYear" className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                                                            </span>
                                                            {getFormErrorMessage(meta)}
                                                        </div>
                                                    )}
                                                />
                                            </div>

                                            <div className="field col-12 md:col-6">
                                                <Field
                                                    name="OverallExpMonth"
                                                    render={({ input, meta }) => (
                                                        <div className="field fluid">
                                                            <label htmlFor="OverallExpMonth">Months</label>
                                                            <span className="field fluid">
                                                                <InputNumber id="OverallExpMonth" value={values.OverallExpMonth} onBlur={input.onBlur} onValueChange={(e) => input.onChange(e)} showButtons className={classNames({ "p-invalid": isFormFieldValid(meta) })} mode="decimal" min={0} max={12} />

                                                                <label htmlFor="OverallExpMonth" className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                                                            </span>
                                                            {getFormErrorMessage(meta)}
                                                        </div>
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ textAlign: "left" }} className="field col-12 md:col-4">
                                        <label style={{ textAlign: "center" }}>Relevant Experience</label>
                                        <div className="formgrid grid">
                                            <div className="field col-12 md:col-6">
                                                <Field
                                                    name="ReleventExpYear"
                                                    render={({ input, meta }) => (
                                                        <div className="field fluid">
                                                            <label htmlFor="ReleventExpYear">Years</label>
                                                            <span className="field fluid">
                                                                <InputNumber id="ReleventExpYear" value={values.ReleventExpYear} onBlur={input.onBlur} onValueChange={(e) => input.onChange(e)} showButtons className={classNames({ "p-invalid": isFormFieldValid(meta) })} mode="decimal" min={0} max={60} />
                                                                <label htmlFor="ReleventExpYear" className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                                                            </span>
                                                            {getFormErrorMessage(meta)}
                                                        </div>
                                                    )}
                                                />
                                            </div>

                                            <div className="field col-12 md:col-6">
                                                <Field
                                                    name="ReleventExpMonth"
                                                    render={({ input, meta }) => (
                                                        <div className="field fluid">
                                                            <label htmlFor="ReleventExpMonth">Months</label>
                                                            <span className="field fluid">
                                                                <InputNumber id="ReleventExpMonth" value={values.ReleventExpMonth} onBlur={input.onBlur} onValueChange={(e) => input.onChange(e)} showButtons className={classNames({ "p-invalid": isFormFieldValid(meta) })} mode="decimal" min={0} max={12} />

                                                                <label htmlFor="ReleventExpMonth" className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                                                            </span>
                                                            {getFormErrorMessage(meta)}
                                                        </div>
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="field col-12 md:col-4">
                                        <Field
                                            name="Skills"
                                            render={({ input, meta }) => (
                                                <div className="field">
                                                    <label htmlFor="skills">Skills</label>
                                                    <span className="p-float-label">
                                                        <InputTextarea maxLength={200} id="skills" {...input} className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                        <label className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
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
                                            name="CurrentOrganization"
                                            render={({ input, meta }) => (
                                                <div className="field fluid">
                                                    <label htmlFor="CurrentOrg">Current Organization</label>
                                                    <span className="field fluid">
                                                        <InputText maxLength={50} id="CurrentOrg" {...input} className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                        <label htmlFor="CurrentOrg" className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                                                    </span>
                                                    {getFormErrorMessage(meta)}
                                                </div>
                                            )}
                                        />
                                    </div>

                                    <div className="field col-12 md:col-4">
                                        <Field

                                            name="CurrentJobLocation"
                                            render={({ input, meta }) => (
                                                <div className="field fluid">
                                                    <label htmlFor="CurrentJobLocation">Current Location</label>
                                                    <span className="field fluid">
                                                        <InputText maxLength={50} id="CurrentJobLocation" {...input} className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                        <label htmlFor="CurrentJobLocation" className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                                                    </span>
                                                    {getFormErrorMessage(meta)}
                                                </div>
                                            )}
                                        />
                                    </div>

                                    <div className="field col-12 md:col-4">
                                        <Field
                                            name="ExpectedDOJ"

                                            render={({ input, meta }) => (
                                                <div className="field fluid">
                                                    <label htmlFor="ExpectedDOJ">Expected DOJ</label>
                                                    <span className="field fluid">
                                                        <Calendar  id="ExpectedDOJ" {...input} dateFormat="mm/dd/yy" mask="99/99/9999" showIcon placeholder="Select a Date" className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                        <label htmlFor="ExpectedDOJ" className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
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
                                            name="EmploymentType"
                                            render={({ input, meta }) => (
                                                <div className="field fluid">
                                                    <label htmlFor="EmploymentType">EmploymentType</label>
                                                    <span className="field fluid">
                                                    <Dropdown id="EmploymentType" {...input} options={props.getemplyementtypesprop} optionLabel="label" placeholder="Select EmploymentType" className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                        <label htmlFor="EmploymentType" className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                                                    </span>
                                                    {getFormErrorMessage(meta)}
                                                </div>
                                            )}
                                        />
                                    </div>

                                  

                                    <div   hidden={values["EmploymentType"] == "Full-Time" ? true : false} className="field col-12 md:col-4">
                                        <Field
                                            name="Duration"

                                            render={({ input, meta }) => (
                                                <div className="field fluid">
                                                    <label htmlFor="Duration">Duration(No of Months)</label>
                                                    <span className="field fluid">
                                                    <InputText maxLength={50} id="Duration" {...input} className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                        <label htmlFor="Duration" className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                                                    </span>
                                                    {getFormErrorMessage(meta)}
                                                </div>
                                            )}
                                        />

                                    </div>
                                    <div className="field col-12 md:col-4">
                                        <Field

                                            name="Job Location"
                                            render={({ input, meta }) => (
                                                <div className="field fluid">
                                                    <label htmlFor="Job Location">Job Location</label>
                                                    <span className="field fluid">
                                                    {/* <Dropdown id="EmploymentType" {...input} options={props.getemplyementtypesprop} optionLabel="label" placeholder="Select EmploymentType" className={classNames({ "p-invalid": isFormFieldValid(meta) })} /> */}

                                                        <Dropdown id="Job Location" {...input} options={props.getactiveLocationoptionsprop} optionLabel="label" placeholder="Select Job Location" className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                        <label htmlFor="Job Location" className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
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
                                            name="CurrentCTC"
                                            render={({ input, meta }) => (
                                                <div className="field fluid">
                                                    <label htmlFor="CurrentCTC">Current CTC</label>
                                                    <span className="field fluid">
                                                        <InputNumber id="CurrentCTC" min={0} value={values.CurrentCTC} onBlur={input.onBlur} onValueChange={(e) => input.onChange(e)} mode="currency" currency="INR" locale="en-IN" maxFractionDigits={0} className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                        {/* <InputNumber id="CurrentCTC" min={0} value={values.CurrentCTC} onBlur={input.onBlur} onValueChange={(e) => input.onChange(e)} mode="decimal" locale="en-IN" className={classNames({ "p-invalid": isFormFieldValid(meta) })} /> */}
                                                        <label htmlFor="CurrentCTC" className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                                                    </span>
                                                    {getFormErrorMessage(meta)}
                                                </div>
                                            )}
                                        />
                                    </div>

                                    <div className="field col-12 md:col-4">
                                        <Field

                                            name="ExpectedCTC"
                                            render={({ input, meta }) => (
                                                <div className="field fluid" >

                                                    <label htmlFor="ExpectedCTC">Expected CTC</label>
                                                    <span className="field fluid">
                                                        <InputNumber id="ExpectedCTC" min={0} value={values.ExpectedCTC} onBlur={input.onBlur} onValueChange={(e) => input.onChange(e)} mode="currency" currency="INR" locale="en-IN" maxFractionDigits={0} className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                        <label htmlFor="." className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                                                    </span>
                                                    {getFormErrorMessage(meta)}
                                                </div>
                                            )}
                                        />
                                    </div>

                                    <div className="field col-12 md:col-4">
                                        <Field
                                            name="NegotiatedCTC"
                                            render={({ input, meta }) => (
                                                <div className="field fluid">
                                                    <label htmlFor="NegotiatedCTC">Negotiated CTC</label>
                                                    <span className="field fluid">
                                                        <InputNumber id="NegotiatedCTC" min={0} value={values.NegotiatedCTC} onBlur={input.onBlur} onValueChange={(e) => input.onChange(e)} mode="currency" currency="INR" locale="en-IN" maxFractionDigits={0} className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                        <label htmlFor="NegotiatedCTC" className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                                                    </span>
                                                    {getFormErrorMessage(meta)}
                                                </div>
                                            )}
                                        />

                                    </div>
                                </div>
                                <div className="p-fluid  grid">
                                    <div className="field col-12 md:col-8">
                                        <div className="p-fluid  grid">
                                            <div className="field col-12 md:col-6">
                                                <Field
                                                    name="Email"
                                                    render={({ input, meta }) => (
                                                        <div className="field fluid">
                                                            <label htmlFor="Email">Email</label>
                                                            <span className="field fluid ">
                                                                <InputText id="Email" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                                                <label htmlFor="Email" className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                                                            </span>
                                                            {getFormErrorMessage(meta)}
                                                        </div>
                                                    )}
                                                />
                                            </div>

                                            <div className="field col-12 md:col-6">
                                                <Field
                                                    name="ContactNo"
                                                    render={({ input, meta }) => (
                                                        <div className="field fluid">
                                                            <label htmlFor="ContactNo">Contact Number</label>
                                                            <span className="field fluid">
                                                                <InputMask id="ContactNo" mask="99-9999999999" {...input} placeholder="91-9999999999" ></InputMask>
                                                                {/* <InputNumber id="ContactNo" value={values.ContactNo} onBlur={input.onBlur} onValueChange={(e) => input.onChange(e)} className={classNames({ "p-invalid": isFormFieldValid(meta) })} useGrouping={false} max={99999999999999999999}/> */}
                                                                {/* <InputText id="ContactNo" maxLength={20}  {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} /> */}
                                                                <label htmlFor="ContactNo" className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                                                            </span>
                                                            {getFormErrorMessage(meta)}
                                                        </div>
                                                    )}
                                                />
                                            </div>
                                        </div>

                                        <div className="p-fluid  grid">
                                            <div className="field col-12 md:col-6">
                                                <Field
                                                    name="AvgApprovedCTC"
                                                    render={({ input, meta }) => (
                                                        <div className="field fluid">
                                                            <label htmlFor="AvgApprovedCTC">Average Approved CTC</label>
                                                            <span className="field fluid">
                                                                <InputNumber id="AvgApprovedCTC" disabled value={values.AvgApprovedCTC} onBlur={input.onBlur} onValueChange={(e) => input.onChange(e)} mode="currency" currency="INR" className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                                <label htmlFor="AvgApprovedCTC" className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                                                            </span>
                                                            {getFormErrorMessage(meta)}
                                                        </div>
                                                    )}
                                                />
                                            </div>

                                            <div className="field col-12 md:col-6">
                                                <Field
                                                    name="AvgBillRate"
                                                    render={({ input, meta }) => (
                                                        <div className="field fluid">
                                                            <label htmlFor="AvgBillRate">Average Bill rate($)</label>
                                                            <span className="field fluid">
                                                                <InputNumber id="AvgBillRate" value={values.AvgBillRate} onBlur={input.onBlur} onValueChange={(e) => input.onChange(e)} mode="currency" currency="USD" min={0} className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                                <label htmlFor="AvgBillRate" className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                                                            </span>
                                                            {getFormErrorMessage(meta)}
                                                        </div>
                                                    )}
                                                />
                                            </div>


                                        </div>
                                    </div>
                                    <div className="field col-12 md:col-4">
                                        <Field
                                            name="Resume"
                                            render={({ input, meta }) => (
                                                <div className="field fluid">
                                                    <label htmlFor="Resume">Resume</label>
                                                    {/* <span className="field fluid">
                                                        <FileUpload ref={fileref} value={values.Resume} uploadOptions={{ style: { display: 'none' } }} cancelOptions={{ style: { display: 'none' } }} accept="*"
                                                            onSelect={async (e) => { console.log(e); values.Resume = await e.files[0]; console.log(values.Resume) }}
                                                            onClick={async (e) => values.Resume ? await fileref.current.clear() : console.log("calling ")}
                          
                                                            maxFileSize={100000000}
                                                            emptyTemplate={<p className="m-0">No Files.</p>} className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                        <label htmlFor="Resume" className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                                                    </span> */}
                                                    {true &&
                                                        <Panel header={<><input type="file" onChange={async (e) => {
                                                            await console.log(e.target.files[0]);
                                                            values.Resume = e.target.files[0];
                                                            // validate(values);
                                                            !editmode && setFilechange(!filechange)
                                                            // document.getElementsByName("ExpectedDOJ")[0].focus()
                                                            // setTimeout(()=>{ 

                                                            // console.log(document.getElementById("ExpectedCTC")?.getElementsByTagName("input")[0])
                                                            // document.getElementById("ExpectedCTC")?.getElementsByTagName("input")[0]?.click()

                                                            // },1000)

                                                            // setTimeout(() => {
                                                                // document.getElementsByName("ExpectedDOJ")[0].blur()
                                                                // document.getElementById("ExpectedCTC")?.getElementsByTagName("input")[0]?.click()
                                                                // document.getElementById("Email")?.click()
                                                                // document.getElementById('submitbutton')?.focus()
                                                                // validate(values) 
                                                            // }, 1000);




                                                        }



                                                        }
                                                        // onBlur={e=>validate(values)}

                                                        >

                                                        </input>
                                                            {/* <label htmlFor="AvgBillRate" className={classNames({ "p-error": isFormFieldValid(meta) })}></label> */}
                                                        </>
                                                        }>

                                                            {/* Uploaded File: {values.Resume.split("/")[values.Resume.split("/").length-1]} */}
                                                            {(typeof values.Resume == typeof "abc") && <>Uploaded File: <a style={{cursor : "pointer"}}  onClick={e => dispatch(downloadresume(
                                                                {
                                                                    'Resume': values?.Resume?.toString().substring(1, values?.Resume.toString().length)
                                                                }
                                                            )
                                                            )}  >{values?.Resume?.split("/")[values.Resume.split("/").length - 1]}</a>
                                                                <br></br>

                                                            </>}

                                                        </Panel>
                                                    }
                                                    {getFormErrorMessage(meta)}
                                                    {/* {console.log(fileref.current)} */}
                                                </div>
                                            )}
                                        />

                                    </div>
                                </div>
                                <Field
                                    name="Comments"
                                    render={({ input, meta }) => (
                                        <div className="field fluid">
                                            <label htmlFor="Comments">Comments : </label>
                                            <br></br>
                                            <span className="field fluid">
                                              
                                            {/* <InputTextarea maxLength={200} id="skills" {...input} className={classNames({ "p-invalid": isFormFieldValid(meta) })} /> */}

                                                
                                                <InputTextarea style={{ width: "80%" }} maxLength={200} id="Comments" {...input} className={classNames({ "p-invalid": isFormFieldValid(meta) })} />

                                            </span>
                                                <label htmlFor="Comments" className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )}
                                />





                                <div style={{ float: "right" }}>


                                    <Button className="mr-2" label="Submit" id='submitbutton' type="submit" />
                                    <Button label=" Cancel " type="button" onClick={e => navigate(-1)} className="mt-2" />
                                </div>

                                <br></br>
                                <br>
                                </br>

                            </form>

                        )
                        }

                    />



                </Card>
            </div>

        </>
    )
}

function mapStateToProps(state) {
    return {
        getemplyementtypesprop:getemplyementtypes(state),
        getactiveLocationoptionsprop: getactiveLocationoptions(state),

    };
}
export default connect(mapStateToProps)(CreateCandidateProfile)


