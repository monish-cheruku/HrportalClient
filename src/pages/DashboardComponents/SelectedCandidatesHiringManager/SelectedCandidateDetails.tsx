import { Button } from 'primereact/button'
import { Calendar } from 'primereact/calendar'
import { Card } from 'primereact/card'
import { Checkbox } from 'primereact/checkbox'
import { Dropdown } from 'primereact/dropdown'
import { InputNumber } from 'primereact/inputnumber'
import { InputText } from 'primereact/inputtext'
import { Panel } from 'primereact/panel'
import { classNames } from 'primereact/utils'
import React, { useEffect } from 'react'
import { Field, Form } from 'react-final-form'
import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { useLocation, useNavigate } from 'react-router'
import { getactivebandoptions } from '../../../features/Band/BandSelector'
import { getBandaction } from '../../../features/Band/Bandslice'
import { getactivedesignationoptions } from '../../../features/Designation/designationselector'
import { getdesignationsaction } from '../../../features/Designation/designationslice'
import { getasubbandactiveoptions } from '../../../features/SubBand/subbandselector'
import { getsubbandsaction } from '../../../features/SubBand/subbandslice'
import CandidateDetails from '../CandidateDetails'
import JobPostDetails from '../JobPostDetails'
import { RadioButton } from 'primereact/radiobutton';
import { updateselectedcandidatesaction } from '../../../features/CandidateActions/selectedcandidatesslice'
import { useSelector } from 'react-redux'
import { RootState } from '../../../app/store'
import { Accordion, AccordionTab } from 'primereact/accordion'

function SelectedCandidateDetails(props) {
    const location = useLocation()
    const data = location.state
    const logindata = useSelector((state: RootState) => state.Login)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getdesignationsaction())
        dispatch(getBandaction())
        dispatch(getsubbandsaction())
        console.log(location.state)
        console.log(data)
    }, [])
    const validate = (values) => {
        let errors = {};
        // console.log(data)

        // if (!data.JobDesc) {
        //     errors.JobDesc = "*JobDescription is required.";
        // }
        // if (!data.JobTitle) {
        //     errors.JobTitle = "*JobDescription is required.";
        // }
        var arr = [

            "DesignationId", "BandId", "SubBandId", "FixedCTC"
            , "DateOfJoining", "isvariable"

        ]
        arr.forEach((i) => {
            if (!values[i]) {
                errors[i.toString()] = "* This field is required";
            }
        })
        if (!values["VariablePay"] && values.isvariable == "Yes") {
            // console.log(values["Duration"])

            errors["VariablePay"] = "*This field is required"
        }
        if (values.isvariable == "Yes" && !values["MQVariable"]) {
            // console.log(values["Duration"])

            errors["MQVariable"] = "*This field is required"
        }
        //   console.log(values["Duration"])

        console.log(errors)
        return errors;
    };
    const isFormFieldValid = (meta) => !!(meta.touched && meta.error);

    const getFormErrorMessage = (meta) => {
        return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
    };
    return (
        <>
            <Card>
                <Panel header={"Candidate Details"}>
                    <CandidateDetails data={data.candidate}></CandidateDetails>

                </Panel>
                <br>
                </br>
                <Accordion>
                    <AccordionTab header={"JobPost Details"}>
                        <JobPostDetails JobData={data.jobpost}></JobPostDetails>
                    </AccordionTab>
                </Accordion>
                {/* <Panel header={"JobPost Details"}>
                    <JobPostDetails JobData={data.jobpost}></JobPostDetails>
                    
                </Panel> */}
                <br></br>
                <Form

                    onSubmit={(values: any) => {
                        var datetemp = new Date(values.DateOfJoining)

                        values.DateOfJoining = datetemp.getFullYear() + "-" + (datetemp.getMonth() + 1) + "-" + datetemp.getDate()
                        console.log(values)
                        dispatch(updateselectedcandidatesaction(values))
                        navigate(-1)
                        // console.log(values.OnBoardingDate)
                        // var datetemp = new Date(values.OnBoardingDate)
                        // console.log(datetemp.getMonth())
                        // console.log(datetemp.getFullYear() + "-" + (datetemp.getMonth() + 1) + "-" + datetemp.getDate())
                        // values.OnBoardingDate = datetemp.getFullYear() + "-" + (datetemp.getMonth() + 1) + "-" + datetemp.getDate()
                        // // alert("sub mit form")
                        // if (editmode) {


                        //     dispatch(updatejobpost(values))
                        //     navigate(-1)
                        // }
                        // else {
                        //     dispatch(createnewjobpost(values))
                        //     navigate(-1)
                        // }
                    }
                    }
                    initialValues={{

                        "selectedcandidateid": data.Selected_Candidate_ID,
                        "VariablePercentage": 0,
                        "IS_Eligible_annu_Mgnt_Bonus": false,
                        "IS_Eligible_Joining_Bonus": false,
                        "IS_Eligible_Monthly_Incentive": false,
                        "Modified_By": logindata.username,
                        "MQVariable": ""


                    }}

                    validate={validate}

                    render={({ handleSubmit, values, submitting,
                        submitError,
                        invalid,
                        pristine,
                        initialValues = {},
                        dirtySinceLastSubmit, }) => (
                        <form onSubmit={handleSubmit} >

                            <div className="p-fluid  grid">
                                <div className="field col-12 md:col-3"><Field
                                    name="DesignationId"
                                    render={({ input, meta }) => (
                                        <div className="field">
                                            <label htmlFor="DesignationId">Designation</label>
                                            <span className="p-float-label">
                                                <Dropdown id="DesignationId" {...input} options={props.getactivedesignationoptionsprop} optionLabel="label" placeholder="Select Designation" className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )}
                                />

                                </div>
                                <div className="field col-12 md:col-3"><Field
                                    name="BandId"
                                    render={({ input, meta }) => (
                                        <div className="field">
                                            <label htmlFor="BandId">Band</label>
                                            <span className="p-float-label">
                                                <Dropdown id="BandId" {...input} options={props.getactivebandoptionsprop} optionLabel="label" placeholder="Select Band" className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )}
                                />

                                </div>
                                <div className="field col-12 md:col-3"><Field
                                    name="SubBandId"
                                    render={({ input, meta }) => (
                                        <div className="field">
                                            <label htmlFor="BandId">Sub Band</label>
                                            <span className="p-float-label">
                                                <Dropdown id="SubBandId" {...input} options={props.getasubbandactiveoptionsprop} optionLabel="label" placeholder="Select sub band" className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )}
                                />

                                </div>

                                <div className="field col-12 md:col-3"><Field
                                    name="DateOfJoining"
                                    render={({ input, meta }) => (
                                        <div className="field">
                                            <label htmlFor="DateOfJoining">Date of joining</label>
                                            <span className="p-float-label">
                                                <Calendar showIcon={true} id="DateOfJoining" {...input} placeholder="Select Date of joining" className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )}
                                />

                                </div>

                            </div>

                            <Panel header={"Final CTC"}>
                                <div className="p-fluid  grid">
                                    <div className="field col-12 md:col-3">
                                        <Field
                                            name="FixedCTC"
                                            render={({ input, meta }) => (
                                                <div className="field">
                                                    <label htmlFor="FixedCTC">Fixed CTC</label>
                                                    <span className="p-float-label">
                                                        {/* <InputNumber id="FixedCTC" {...input} placeholder="FixedCTC" onChange={e => values["FixedCTC"] = e.value} className={classNames({ "p-invalid": isFormFieldValid(meta) })} /> */}
                                                        <InputNumber id="FixedCTC" min={0} value={values.FixedCTC} onBlur={input.onBlur} onValueChange={(e) => input.onChange(e)} mode="currency" currency="INR" locale="en-IN" maxFractionDigits={0} className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                    </span>
                                                    {getFormErrorMessage(meta)}
                                                </div>
                                            )}
                                        />
                                    </div>

                                </div>
                                <div className="p-fluid  grid">
                                    <div className="field col-12 md:col-4">
                                        <label>Is candidate has variable pay? If 'Yes' enter variable pay and period of payment</label>
                                    </div>
                                    <div className="field col-12 md:col-2">
                                        <div className="field-radiobutton">
                                            <Field
                                                name="isvariable"
                                                render={({ input, meta }) => (
                                                    <>
                                                        <RadioButton  {...input} className='ml-2' inputId="isvariable" name="isvariable" value="Yes" checked={values.isvariable == "Yes"} />

                                                    </>
                                                )} />
                                            <label className="radio-inline me-3">Yes
                                            </label>

                                            <Field
                                                name="isvariable"
                                                render={({ input, meta }) => (
                                                    <>
                                                        <RadioButton  {...input} className='ml-2' inputId="isvariable" name="isvariable" value="No" checked={values.isvariable == "No"} />

                                                    </>
                                                )} />
                                            <label className="radio-inline me-3">No
                                            </label>
                                        </div>
                                        <br />
                                        <div className='col-12' style={{ marginTop: "-30px" }}>
                                            <Field
                                                name="isvariable"
                                                render={({ input, meta }) => (
                                                    <>

                                                        {getFormErrorMessage(meta)}
                                                    </>
                                                )} />
                                        </div>

                                    </div>

                                    <div hidden={values["isvariable"] == "Yes" ? false : true} className="field col-12 md:col-3">
                                        <div className="p-fluid  grid">
                                            <div className="field col-12 md:col-6">
                                                <label >Variable Pay :
                                                </label>
                                            </div>
                                            <div className="field col-12 md:col-6">
                                                <Field
                                                    name="VariablePay"
                                                    render={({ input, meta }) => (
                                                        <div className="field">
                                                            {/* <label htmlFor="VariablePay">Vaiable Pay</label> */}
                                                            <span className="p-float-label">
                                                                {/* <InputNumber id="VariablePay" {...input} placeholder="Enter Variable Pay" onChange={e => values["VariablePay"] = e.value} className={classNames({ "p-invalid": isFormFieldValid(meta) })} /> */}
                                                                <InputNumber id="VariablePay" min={0} value={values.VariablePay} onBlur={input.onBlur} onValueChange={(e) => input.onChange(e)} mode="currency" currency="INR" locale="en-IN" maxFractionDigits={0} className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                            </span>
                                                            {getFormErrorMessage(meta)}

                                                        </div>
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div hidden={values["isvariable"] == "Yes" ? false : true} className="field col-12 md:col-3">
                                        <div className="field-radiobutton">
                                            <Field
                                                name="MQVariable"
                                                render={({ input, meta }) => (
                                                    <RadioButton  {...input} className='ml-2' inputId="MQVariable" name="MQVariable" value="M" checked={values.MQVariable == "M"} />
                                                )} />
                                            <label className="radio-inline me-3">Monthly
                                            </label>

                                            <Field
                                                name="MQVariable"
                                                render={({ input, meta }) => (
                                                    <RadioButton  {...input} className='ml-2' inputId="MQVariable" name="MQVariable" value="Q" checked={values.MQVariable == "Q"} />
                                                )} />
                                            <label className="radio-inline me-3">Quaterly
                                            </label>

                                        </div>
                                        <br />
                                        <div className='col-12' style={{ marginTop: "-30px" }}>
                                            <Field
                                                name="MQVariable"
                                                render={({ input, meta }) => (
                                                    <>

                                                        {getFormErrorMessage(meta)}
                                                    </>
                                                )} />
                                        </div>
                                    </div>

                                </div>
                            </Panel>


                            <br />



                            <div className="p-fluid  grid">
                                <div className="field col-12 md:col-4">
                                    <Field
                                        name="IS_Eligible_annu_Mgnt_Bonus"
                                        type="checkbox"
                                        render={({ input, meta }) => (
                                            <div className="field-checkbox">
                                                <Checkbox inputId={input.name} {...input} />
                                                <label htmlFor={input.name} style={{ cursor: "pointer" }}>
                                                    {"Eligible for Annual Mgnt Bonus"}
                                                </label>
                                            </div>)} />
                                </div>
                                <div className="field col-12 md:col-4">
                                    <Field
                                        name="IS_Eligible_Joining_Bonus"
                                        type="checkbox"
                                        render={({ input, meta }) => (
                                            <div className="field-checkbox">
                                                <Checkbox inputId={input.name} {...input} />
                                                <label htmlFor={input.name} style={{ cursor: "pointer" }}>
                                                    {"Eligible for Joining Bonus"}
                                                </label>
                                            </div>)} />
                                </div>
                                <div className="field col-12 md:col-4">
                                    <Field
                                        name="IS_Eligible_Monthly_Incentive"
                                        type="checkbox"
                                        render={({ input, meta }) => (
                                            <div className="field-checkbox">
                                                <Checkbox inputId={input.name} {...input} />
                                                <label htmlFor={input.name} style={{ cursor: "pointer" }}>
                                                    {"Eligible for Monthly Incentive"}
                                                </label>
                                            </div>)} />
                                </div>
                            </div>
                            <div className=" grid">
                                <div className="field col-12 md:col-6">Annexure
                                </div>
                                <div className="field col-12 md:col-6 flex">
                                    <Button className='mr-3' type="submit" onClick={e => handleSubmit}>Send Offer Letter

                                    </Button>
                                    <Button className='mr-3' type="button">Download/Preview Offer Letter
                                    </Button>
                                    <Button type="button" onClick={e => navigate(-1)}>Cancel
                                    </Button>
                                </div>
                            </div>

                        </form>
                    )}


                />
            </Card>
        </>
    )
}


const mapStateToProps = (state) => {


    return {
        getactivedesignationoptionsprop: getactivedesignationoptions(state),
        getasubbandactiveoptionsprop: getasubbandactiveoptions(state),
        getactivebandoptionsprop: getactivebandoptions(state)
    }
}
export default connect(mapStateToProps)(SelectedCandidateDetails)