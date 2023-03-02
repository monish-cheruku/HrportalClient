import { Button } from 'primereact/button'
import React, { useEffect, useMemo, useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { Field, Form } from 'react-final-form'
import { setnextcandidateinfotab, setprevcandidateinfotab } from '../../../features/Misc/globalslice'
import classNames from 'classnames'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { Calendar } from 'primereact/calendar'
import { RootState } from '../../../app/store'
import { createpfdetailsaction, pfdetailsaction, updatepfdetailsaction, } from '../../../features/Candidate info/pfdetailsslice'
import { getallqualification } from '../../../features/Dropdownoptions/qualificationselector'
import { qualificationaction } from '../../../features/Dropdownoptions/qualificationtypeslice'
import { Panel } from 'primereact/panel'
import { InputTextarea } from 'primereact/inputtextarea'
import { InputNumber } from "primereact/inputnumber";
import { InputMask } from 'primereact/inputmask'
import { candidateinfogetaction } from '../../../features/Candidate info/candidateinfoslice'
import { RadioButton } from 'primereact/radiobutton'
import { Checkbox } from 'primereact/checkbox'
import { bankdetailsgetaction, Ibankdetail } from '../../../features/Candidate info/bankdetailsslice'


function PFDetails(props) {
  var pfdetailsdata = useSelector((state: RootState) => state.CandidatePfdetails);
  var candidateinfodata = useSelector((state: RootState) => state.candidateinfo);
  const logindata = useSelector((state: RootState) => state.Login)
  const [status, setstatus] = useState('')
  var personalsdetailsdata = useSelector((state: RootState) => state.CandidatePersonaldetails);
  const bankdetailsdata: Ibankdetail = useSelector((state: RootState) => state.bankdetails)
  const [edit, setEdit] = useState(pfdetailsdata.MemberNameAsPerAadhar == "" ? false : true)
  const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
  console.log(edit)
  console.log(candidateinfodata)
  console.log(pfdetailsdata)
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(bankdetailsgetaction(
      {
          "selectedcandidateid": candidateinfodata.Selected_Candidate_ID

      }
  ))
    dispatch(qualificationaction())

    console.log("working")


    console.log(pfdetailsdata)
    
    console.log(props.getallqualificationprop)

    console.log(candidateinfodata)
    dispatch(pfdetailsaction({

      "selectedcandidateid": candidateinfodata.Selected_Candidate_ID
    }))
    pfdetailsdata.MemberNameAsPerAadhar == "" ? setEdit(false) : setEdit(true)



  }, [])
  useEffect(() => {
    console.log(edit)
  }, [edit])





  const getFormErrorMessage = (meta) => {
    return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
  };





  const validate = (values) => {
    values["CurrentCTC"] = values["CurrentCTC"]
    let errors = {};

    var arr = ["MemberNameAsPerAadhar", "AADHAR", "DateOfBirth", "Date_Of_Joining", "Gender", "FatherOrHusbandName", "Relation", "Marital_status",  "ContactNumber", "Email", "Nationality", "Qualification", "CountryOfOrigin",  "AccountNumber", "IFSCcode", "NameAsPerBank", "PAN", "NameAsPerPan"]
    arr.forEach((i) => {
      // console.log(values["Resume"])
      if (!values[i]) {

        // console.log(i.toString())
        errors[i.toString()] = "* This field is required";
      }
    })
    // console.log(values["OverallExpYear"])

    if (values["MemberNameAsPerAadhar"] == undefined || values["MemberNameAsPerAadhar"] == null) {

      errors["MemberNameAsPerAadhar"] = "*This field is required"
    }
    if (values["AADHAR"] == undefined || values["AADHAR"] == null) {

      errors["AADHAR"] = "*This field is required"
    }
    if (values["DateOfBirth"] == undefined || values["DateOfBirth"] == null) {

      errors["DateOfBirth"] = "*This field is required"
    }
    if (values["Date_Of_Joining"] == undefined || values["Date_Of_Joining"] == null) {

      errors["Date_Of_Joining"] = "*This field is required"
    }
    if (values["Gender"] == undefined || values["Gender"] == null) {

      errors["Gender"] = "*This field is required"
    }
    if (values["FatherOrHusbandName"] == undefined || values["FatherOrHusbandName"] == null) {

      errors["FatherOrHusbandName"] = "*This field is required"
    }
    if (values["Relation"] == undefined || values["Relation"] == null) {

      errors["Relation"] = "*This field is required"
    }
    if (values["Marital_status"] == undefined || values["Marital_status"] == null) {

      errors["Marital_status"] = "*This field is required"
    }
    if (values["InternationalWorker"] == undefined || values["InternationalWorker"] == null) {

      errors["InternationalWorker"] = "*This field is required"
    }
    if (values["ContactNumber"] == undefined || values["ContactNumber"] == null) {

      errors["ContactNumber"] = "*This field is required"
    }
    if (values["Email"] == undefined || values["Email"] == null) {

      errors["Email"] = "*This field is required"
    }
    if (values["Nationality"] == undefined || values["Nationality"] == null) {

      errors["Nationality"] = "*This field is required"
    }
    if (values["Qualification"] == undefined || values["Qualification"] == null) {

      errors["Qualification"] = "*This field is required"
    }
    if (values["CountryOfOrigin"] == undefined || values["CountryOfOrigin"] == null) {

      errors["CountryOfOrigin"] = "*This field is required"
    }
    if (values["PhysicalHandicap"] == undefined || values["PhysicalHandicap"] == null) {

      errors["PhysicalHandicap"] = "*This field is required"
    }
    if (values["AccountNumber"] == undefined || values["AccountNumber"] == null) {

      errors["AccountNumber"] = "*This field is required"
    }
    if (values["IFSCcode"] == undefined || values["IFSCcode"] == null) {

      errors["IFSCcode"] = "*This field is required"
    }
    if (values["NameAsPerBank"] == undefined || values["NameAsPerBank"] == null) {

      errors["NameAsPerBank"] = "*This field is required"
    }
    if (values["PAN"] == undefined || values["PAN"] == null) {

      errors["PAN"] = "*This field is required"
    }
    if (values["NameAsPerPan"] == undefined || values["NameAsPerPan"] == null) {

      errors["NameAsPerPan"] = "*This field is required"
    }

    console.log(errors)
    return errors;
  };
  const toInputUppercase = e => {
    console.log(e)
    e.target.value = ("" + e.target.value)?.toUpperCase();
  };
  const options = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' }
  ]
  const marital = [
    { value: 'single', label: 'Single' },
    { value: 'married', label: 'Married' }
  ]
  const Relation = [
    { value: 'husband', label: 'Husband' },
    { value: 'father', label: 'Father' }

  ]
  return (
    <div>
      <Form
        // {console.log(candidateinfodata)}
        onSubmit={(values: any) => {
          console.log(values)


          var datetemp = new Date(values.DateOfBirth)
          // console.log(datetemp.getFullYear() + "-" + datetemp.getMonth() + "-" + datetemp.getDate())
          values.DateOfBirth = datetemp.getFullYear() + "-" + (datetemp.getMonth() + 1).toString().padStart(2, '0') + "-" + datetemp.getDate().toString().padStart(2, '0')
          var datetemp = new Date(values.PassportValidFrom)
          // console.log(datetemp.getFullYear() + "-" + datetemp.getMonth() + "-" + datetemp.getDate())
          values.PassportValidFrom = datetemp.getFullYear() + "-" + (datetemp.getMonth() + 1).toString().padStart(2, '0') + "-" + datetemp.getDate().toString().padStart(2, '0')
          // var datetemp = new Date(values.PassportValidTo)
          // // console.log(datetemp.getFullYear() + "-" + datetemp.getMonth() + "-" + datetemp.getDate())
          // values.PassportValidTo = datetemp.getFullYear() + "-" + (datetemp.getMonth() + 1).toString().padStart(2, '0') + "-" + datetemp.getDate().toString().padStart(2, '0')
          var datetemp = new Date(values.PassportValidTill)
          // console.log(datetemp.getFullYear() + "-" + datetemp.getMonth() + "-" + datetemp.getDate())
          values.PassportValidTill = datetemp.getFullYear() + "-" + (datetemp.getMonth() + 1).toString().padStart(2, '0') + "-" + datetemp.getDate().toString().padStart(2, '0')
          var datetemp = new Date(values.Date_Of_Joining)
          // console.log(datetemp.getFullYear() + "-" + datetemp.getMonth() + "-" + datetemp.getDate())
          values.Date_Of_Joining = datetemp.getFullYear() + "-" + (datetemp.getMonth() + 1).toString().padStart(2, '0') + "-" + datetemp.getDate().toString().padStart(2, '0')
          console.log(values)
          values.selectedcandidateid = candidateinfodata.Selected_Candidate_ID
          if(edit)values["Id"]=pfdetailsdata.Id
          edit ? dispatch(updatepfdetailsaction(values)) : dispatch(createpfdetailsaction(values))


          dispatch(setnextcandidateinfotab())
        }}
        initialValues={edit ? {


          "PreviousCompanyUAN": pfdetailsdata.PreviousCompanyUAN,
          "PreviousMemberId": pfdetailsdata.PreviousMemberId,
          "MemberNameAsPerAadhar": pfdetailsdata.MemberNameAsPerAadhar,
          "AADHAR": pfdetailsdata.AADHAR,
          "DateOfBirth": new Date(pfdetailsdata.DateOfBirth),
          "Date_Of_Joining": new Date (pfdetailsdata.Date_Of_Joining),
          "Gender": pfdetailsdata.Gender,
          "FatherOrHusbandName": pfdetailsdata.FatherOrHusbandName,
          "Relation": pfdetailsdata.Relation,
          "Marital_status": pfdetailsdata.Marital_status,
          "InternationalWorker": pfdetailsdata.InternationalWorker,
          "ContactNumber": pfdetailsdata.ContactNumber,
          "Email": pfdetailsdata.Email,
          "Nationality": pfdetailsdata.Nationality,
          "wages": pfdetailsdata.wages,
          "Qualification": pfdetailsdata.Qualification,
          "CountryOfOrigin": pfdetailsdata.CountryOfOrigin,
          "PassportNumber": pfdetailsdata.PassportNumber,
          "PassportValidFrom": new Date(pfdetailsdata.PassportValidFrom),
          "PassportValidTill": new Date(pfdetailsdata.PassportValidTill),
          "PhysicalHandicap": pfdetailsdata.PhysicalHandicap,
          "AccountNumber": pfdetailsdata.AccountNumber,
          "IFSCcode": pfdetailsdata.IFSCcode,
          "NameAsPerBank": pfdetailsdata.NameAsPerBank,
          "PAN": pfdetailsdata.PAN,
          "NameAsPerPan": pfdetailsdata.NameAsPerPan



        } : candidateinfodata.candidate ? {

          "ContactNumber": personalsdetailsdata.ContactNumber,
          "Email": candidateinfodata.candidate.Email,
          "Qualification": candidateinfodata.candidate.Qualification,
          "MemberNameAsPerAadhar": personalsdetailsdata.Name,
          "AADHAR": personalsdetailsdata.AADHAR,
          "PAN": personalsdetailsdata.PAN,
          "Gender": personalsdetailsdata.Gender,
          "DateOfBirth": new Date(personalsdetailsdata.DateOfBirth),
          "Date_Of_Joining": new Date(candidateinfodata.DateOfJoining),
          "Marital_status": personalsdetailsdata.Marital_status,
          "PassportNumber": personalsdetailsdata.PassportNumber,
          "PassportValidFrom": new Date(personalsdetailsdata.PassportValidFrom),
          "PassportValidTill": new Date(personalsdetailsdata.PassportValidTo),
          "PhysicalHandicap": false,
          "IFSCcode": bankdetailsdata.IFSCcode,
          "AccountNumber": bankdetailsdata.AccountNumber,



        } : {}}

        validate={validate}
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
                  name="PreviousCompanyUAN"
                  render={({ input, meta }) => (
                    <div className="field " >
                      <label htmlFor="PreviousCompanyUAN">Previous Company UAN</label>
                      <span className="label">
                        <InputText id="PreviousCompanyUAN" {...input} autoFocus className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                        <label htmlFor="." className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                      </span>
                      {getFormErrorMessage(meta)}
                    </div>
                  )}
                />
              </div>
              <div className="field col-12 md:col-4">
                <Field
                  name="PreviousMemberId"
                  render={({ input, meta }) => (
                    <div className="field " >
                      <label htmlFor="PreviousMemberId">Previous Member Id</label>
                      <span className="label">
                        <InputText id="PreviousMemberId" {...input} autoFocus className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                        <label htmlFor="." className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                      </span>
                      {getFormErrorMessage(meta)}
                    </div>
                  )}
                />
              </div>

              <div className="field col-12 md:col-4">
                <Field
                  name="MemberNameAsPerAadhar"
                  render={({ input, meta }) => (
                    <div className="field " >
                      <label htmlFor="MemberNameAsPerAadhar">Employee Name (As per Aadhar Card)*</label>
                      <span className="label">
                        <InputText id="MemberNameAsPerAadhar" {...input} autoFocus className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
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
                    <label htmlFor="AADHAR"> Aadhaar* </label>
                    <span className="label">
                      <InputText id="AADHAR" {...input} autoFocus maxLength={12} onInput={toInputUppercase} className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                      <label htmlFor="." className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                    </span>
                    {getFormErrorMessage(meta)}
                  </div>
                )}
              /></div>
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
                  name="Date_Of_Joining"
                  render={({ input, meta }) => (
                    <div className="field " >
                      <label htmlFor="Date_Of_Joining ">Date Of Joining*</label>
                      <Calendar id="Date_Of_Joining" {...input} dateFormat="mm/dd/yy" showIcon placeholder="Select a Date" className={classNames({ "p-invalid": isFormFieldValid(meta) })} />

                      <span className="label">
                        <label htmlFor="." className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
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
                      <label htmlFor="Gender">Gender*</label>
                      <span className="p-float-label">
                        <Dropdown id="Gender" {...input} options={options} placeholder="Select Gender" className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                      </span>
                      {getFormErrorMessage(meta)}
                    </div>
                  )}
                />
              </div>

              <div className="field col-12 md:col-4">
                <Field
                  name="FatherOrHusbandName"
                  render={({ input, meta }) => (
                    <div className="field " >
                      <label htmlFor="FatherOrHusbandName">Father Or Husband Name*</label>
                      <span className="label">
                        <InputText id="FatherOrHusbandName" {...input} autoFocus className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                        <label htmlFor="." className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                      </span>
                      {getFormErrorMessage(meta)}
                    </div>
                  )}
                />
              </div>
              <div className="field col-12 md:col-4">
                <Field
                  name="Relation"
                  render={({ input, meta }) => (
                    <div className="field">
                      <label htmlFor="Relation ">Relation*</label>
                      <span className="p-float-label">
                        <Dropdown id="Relation " {...input} options={Relation} placeholder="Select Relation" className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
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
                  name="Marital_status"
                  render={({ input, meta }) => (
                    <div className="field">
                      <label htmlFor="Experience Level">Marital Status*</label>
                      <span className="p-float-label">
                        <Dropdown id="Marital_status" {...input} options={marital} placeholder="Select Marital Status " className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                      </span>
                      {getFormErrorMessage(meta)}
                    </div>
                  )}
                />
              </div>
              <div className="  md:col-3">
                <label>International Worker* </label>
                <br />
                <br />
                <Field name="InternationalWorker" render={({ input, meta }) => (<>
                  <RadioButton {...input} className='ml-2' inputId="InternationalWorker" name="InternationalWorker" value={true} checked={values.InternationalWorker == true} />
                </>)} />

                <label className="radio-inline me-3">Yes      </label>
                <br />
                <br />
                <Field name="InternationalWorker" render={({ input, meta }) => (<>

                  <RadioButton {...input} className='ml-2' inputId="InternationalWorker" name="InternationalWorker" value={false} checked={values.InternationalWorker == false} />
                </>)} />
                <label className="radio-inline me-3">No
                </label>
              </div>
              <div className="field col-12 md:col-4">
                <Field
                  name="ContactNumber"
                  render={({ input, meta }) => (
                    <div className="field " >
                      <label htmlFor="ContactNumber">Contact Number*</label>
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
                  name="Email"
                  render={({ input, meta }) => (
                    <div className="field " >
                      <label htmlFor="Email">Email*</label>
                      <span className="label">
                        <InputText id="Email " {...input} autoFocus className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                        <label htmlFor="." className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                      </span>
                      {getFormErrorMessage(meta)}
                    </div>
                  )}
                />

              </div>
              <div className="field col-12 md:col-4">
                <Field
                  name="Nationality"
                  render={({ input, meta }) => (
                    <div className="field " >
                      <label htmlFor="Nationality">Nationality*</label>
                      <span className="label">
                        <InputText id="Nationality " {...input} autoFocus className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                        <label htmlFor="." className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                      </span>
                      {getFormErrorMessage(meta)}
                    </div>
                  )}
                />
              </div>
              <div className="field col-12 md:col-4">
                <Field
                  name="wages"
                  render={({ input, meta }) => (
                    <div className="field " >
                      <label htmlFor="wages">Wages</label>
                      <span className="label">
                        <InputText id="wages" {...input} autoFocus className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
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
                  name="Qualification"
                  render={({ input, meta }) => (
                    <div className="field">
                      <label htmlFor="Qualification">Qualification*</label>
                      <span className="column">
                        <Dropdown id="Qualification"{...input} options={props.getallqualificationprop} optionLabel="label" placeholder="Select Qualification" className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                      </span>
                      {getFormErrorMessage(meta)}
                    </div>
                  )}
                />
              </div>
              <div className="field col-12 md:col-4">

                <Field
                  name="CountryOfOrigin"
                  render={({ input, meta }) => (
                    <div className="field ">
                      <label htmlFor="CountryOfOrigin">Country Of Origin*</label>
                      <span className="label">
                        <InputText id="CountryOfOrigin " {...input} autoFocus className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                        <label htmlFor="." className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                      </span>
                      {getFormErrorMessage(meta)}
                    </div>
                  )}
                /></div>
            </div>


            <br></br>
            <Panel header="Passport Details:">

              <div className="p-fluid  grid">
                <div className="field col-12 md:col-4">
                  <Field
                    name="PassportNumber"
                    render={({ input, meta }) => (
                      <div className="field " >
                        <label htmlFor="PassportNumber">Passport Number</label>
                        <span className="label">
                          <InputText id="PassportNumber " {...input} autoFocus maxLength={8} className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
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
                        <label htmlFor="Employee Name">Valid from</label>
                        <span className="label">
                          <Calendar maxDate={new Date(values["PassportValidTill"])} id="ExpectedDOJ" {...input} dateFormat="mm/dd/yy" showIcon placeholder="Select a Date" className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                          <label htmlFor="." className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                        </span>
                        {getFormErrorMessage(meta)}
                      </div>
                    )}
                  />
                </div>
                <div className="field col-12 md:col-4"><Field
                  name="PassportValidTill"
                  render={({ input, meta }) => (
                    <div className="field " >
                      <label htmlFor="Employee Name">Valid to</label>
                      <span className="label">
                        <Calendar minDate={new Date(values["PassportValidFrom"])} id="ExpectedDOJ" {...input} dateFormat="mm/dd/yy" showIcon placeholder="Select a Date" className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
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

              {/* <div className="md:col-2">
    <label htmlFor="PhysicalHadicap">Physical Hadicap*</label>
    <br></br>
    <br></br>

    <Field
      name="PhysicalHadicap"
      type="checkbox"
      render={({ input, meta }) => (
        <div className="field-checkbox">
    <RadioButton
      {...input} className='ml-2' inputId="PhysicalHandicap" onChange={e => console.log(e.value, values["PhysicalHandicap"])} name="PhysicalHandicap" value={true} checked={values.PhysicalHandicap == true} />
    <span><label className="radio-inline me-3" htmlFor='PhysicalHadicap'><b>Yes</b>
    </label>
    </span>
        </div>)} />
    <br></br>
    <br></br>

    <Field
      name="PhysicalHadicap"
      type="checkbox"
      render={({ input, meta }) => (
        <div className="field-checkbox">
    <RadioButton {...input} className='ml-2' inputId="PhysicalHandicap" name="PhysicalHandicap" value={false} checked={values.PhysicalHandicap == false} />
    <span><label className="radio-inline me-3"><b>No</b>
      <br></br>
      <br></br>
    </label>
    </span>
        </div>)} />
  </div> */}


              <div className="field col-12 md:col-3">
                <Field
                  name="AccountNumber"
                  render={({ input, meta }) => (
                    <div className="field " >
                      <label htmlFor="AccountNumber">Account Number* </label>
                      <span className="label">
                        <InputText onInput={toInputUppercase} id="AccountNumber" {...input} autoFocus maxLength={10} className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                        <label htmlFor="." className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                      </span>
                      {getFormErrorMessage(meta)}
                    </div>
                  )}
                />
              </div>
              <div className="field col-12 md:col-3">
                <Field
                  name="IFSCcode"
                  render={({ input, meta }) => (
                    <div className="field " >
                      <label htmlFor="IFSCcode">IFSC code* </label>
                      <span className="label">
                        <InputText onInput={toInputUppercase} id="IFSCcode" {...input} autoFocus maxLength={10} className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                        <label htmlFor="." className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                      </span>
                      {getFormErrorMessage(meta)}
                    </div>
                  )}
                />
              </div>

              <div className="  md:col-3">
                <label>Physically Handicap</label>
                <br />
                <br />
                <Field name="PhysicalHandicap" render={({ input, meta }) => (<>
                  <RadioButton {...input} className='ml-2' inputId="PhysicalHandicap" name="PhysicalHandicap" value={true} checked={values.PhysicalHandicap == true} />
                </>)} />

                <label className="radio-inline me-3">Yes      </label>
                <br />
                <br />
                <Field name="PhysicalHandicap" render={({ input, meta }) => (<>

                  <RadioButton {...input} className='ml-2' inputId="PhysicalHandicap" name="PhysicalHandicap" value={false} checked={values.PhysicalHandicap == false} />
                </>)} />
                <label className="radio-inline me-3">No
                </label>
              </div>
              {values["PhysicalHandicap"] &&
                <div className="md:col-2">
                  <br></br>
                  <br></br>
                  <Field
                    name="locomotive"
                    type="checkbox"
                    render={({ input, meta }) => (
                      <div className="field-checkbox">
                        <Checkbox inputId={input.name} {...input} />
                        <label htmlFor={input.name} style={{ cursor: "pointer" }}>
                          {"locomotive"}
                        </label>
                      </div>)} />
                  <Field
                    name="Hearing"
                    type="checkbox"
                    render={({ input, meta }) => (
                      <div className="field-checkbox">
                        <Checkbox inputId={input.name} {...input} />
                        <label htmlFor={input.name} style={{ cursor: "pointer" }}>
                          {"Hearing"}
                        </label>
                      </div>)} />
                  <Field
                    name="Visual"
                    type="checkbox"
                    render={({ input, meta }) => (
                      <div className="field-checkbox">
                        <Checkbox inputId={input.name} {...input} />
                        <label htmlFor={input.name} style={{ cursor: "pointer" }}>
                          {"Visual"}
                        </label>
                      </div>)} />
                </div>}
            </div>
            <div className="p-fluid  grid">

              <div className="field col-12 md:col-4">
                <Field
                  name="NameAsPerBank"
                  render={({ input, meta }) => (
                    <div className="field " >
                      <label htmlFor="NameAsPerBank">Name (As per Bank)*</label>
                      <span className="label">
                        <InputText id="NameAsPerBank " {...input} autoFocus className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                        <label htmlFor="." className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
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
                      <label htmlFor="PAN">PAN* </label>
                      <span className="label">
                        <InputText onInput={toInputUppercase} id="PAN" {...input} autoFocus maxLength={10} className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                        <label htmlFor="." className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                      </span>
                      {getFormErrorMessage(meta)}
                    </div>
                  )}
                />
              </div>
              <div className="field col-12 md:col-4">
                <Field
                  name="NameAsPerPan"
                  render={({ input, meta }) => (
                    <div className="field " >
                      <label htmlFor="NameAsPerPan">Name (As per Pan)*</label>
                      <span className="label">
                        <InputText id="NameAsPerPan " {...input} autoFocus className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                        <label htmlFor="." className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                      </span>
                      {getFormErrorMessage(meta)}
                    </div>
                  )}
                /></div>
            </div>
            <div className="p-fluid  grid">


              <div className="field col-12 md:col-5 flex"></div>
              <div className="field col-12 md:col-5 flex"></div>
              <div className="field col-12 md:col-2 ">
                <Button type='submit'
                // onClick={e => dispatch(setnextcandidateinfotab(";aufhds"))}
                >Save & Next</Button>
              </div>
            </div>

          </form>


        )}
      />


    </div>
  )
}
function mapStateToProps(state) {
  return {

    getallqualificationprop: getallqualification(state)
  };
}

export default connect(mapStateToProps)(PFDetails)