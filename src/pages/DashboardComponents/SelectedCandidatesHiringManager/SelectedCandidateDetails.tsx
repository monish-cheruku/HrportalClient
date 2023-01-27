import { Button } from 'primereact/button'
import { Calendar } from 'primereact/calendar'
import { Card } from 'primereact/card'
import { Checkbox } from 'primereact/checkbox'
import { Dropdown } from 'primereact/dropdown'
import { InputNumber } from 'primereact/inputnumber'
import { InputText } from 'primereact/inputtext'
import { Panel } from 'primereact/panel'
import { classNames } from 'primereact/utils'
import React, { useEffect, useState } from 'react'
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
import { previewannexureaction, updateselectedcandidatesaction } from '../../../features/CandidateActions/selectedcandidatesslice'
import { useSelector } from 'react-redux'
import { RootState } from '../../../app/store'
import { Accordion, AccordionTab } from 'primereact/accordion'

function SelectedCandidateDetails(props) {
    const location = useLocation()
    const data = location.state
    const logindata = useSelector((state: RootState) => state.Login)
    const [editmode, seteditmode] = useState(data.designation ? true : false)
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

            "designation", "band", "subband", "FixedCTC"
            , "DateOfJoining", "IsVariable"

        ]
        arr.forEach((i) => {
            if (!values[i] && !values[i] == false) {
                errors[i.toString()] = "* This field is required";
            }
        })
        if (!values["VariablePay"] && values.IsVariable == true) {
            // console.log(values["Duration"])

            errors["VariablePay"] = "*This field is required"
        }
        if (values.IsVariable == true && !values["MQVariable"]) {
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
    const filtersubband = (s: any) => {
        var temp: any = []
        props.getasubbandactiveoptionsprop.forEach((e) => {
            // console.log(s)
            if (e.BandId == s) {
                temp.push({

                    key: e.key,
                    label: e.label,
                    BandId: e.BandId,
                    value: e.value

                })
            }
        })
        // console.log(temp)
        return temp
    }
    const callpreviewannexure = (values) => {
        console.log(values)
        if (
            values.selectedcandidateid &&
            values.DesignationId &&
            values.BandId &&
            values.SubBandId &&
            values.FixedCTC &&
            values.VariablePercentage &&
            values.MQVariable &&
            values.IS_Eligible_annu_Mgnt_Bonus &&
            values.IS_Eligible_Joining_Bonus &&
            values.IS_Eligible_Monthly_Incentive) {


        }
        dispatch(previewannexureaction(values))
    }
    return (
        <>
            {editmode ? console.log("editmode") : console.log("not edit mode")}
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
                        values["FinalCTC"] = values["FixedCTC"] + ((values["IsVariable"] ? (values["VariablePay"]) ? values["VariablePay"] : 0 : 0))
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
                    initialValues={editmode ? {
                        "selectedcandidateid": data.Selected_Candidate_ID,
                        // "VariablePay": 0,//will change after backend changes

                        "Modified_By": logindata.username,


                        "designation": data.designation,
                        "band": data.band,
                        "subband": data.subband,

                        "DateOfJoining": new Date(data.DateOfJoining),
                        "FixedCTC": data.FixedCTC,
                        "MQVariable": data.MQVariable,
                        "Is_Eligible_annu_Mgnt_Bonus": data.Is_Eligible_annu_Mgnt_Bonus,
                        "Is_Eligible_Joining_Bonus": data.Is_Eligible_Joining_Bonus,
                        "IS_Eligible_Monthly_Incentive": data.IS_Eligible_Monthly_Incentive,
                        "VariablePay": data.VariablePay,
                        "IsVariable": data.IsVariable
                    } : {

                        "selectedcandidateid": data.Selected_Candidate_ID,
                        "VariablePay": 0,
                        "Is_Eligible_annu_Mgnt_Bonus": data.IS_Eligible_annu_Mgnt_Bonus,
                        "Is_Eligible_Joining_Bonus": data.IS_Eligible_Joining_Bonus,
                        "IS_Eligible_Monthly_Incentive": data.IS_Eligible_Monthly_Incentive,
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
                                    name="designation"
                                    render={({ input, meta }) => (
                                        <div className="field">
                                            <label htmlFor="designation">Designation</label>
                                            <span className="p-float-label">
                                                <Dropdown id="designation" {...input} options={props.getactivedesignationoptionsprop} optionLabel="label" placeholder="Select Designation"
                                                    onChange={e => callpreviewannexure(values)}
                                                    className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )}
                                />

                                </div>
                                <div className="field col-12 md:col-3"><Field
                                    name="band"
                                    render={({ input, meta }) => (
                                        <div className="field">
                                            <label htmlFor="band">Band</label>
                                            <span className="p-float-label">
                                                <Dropdown id="band" {...input} options={props.getactivebandoptionsprop} optionLabel="label" placeholder="Select Band"
                                                    onChange={e => callpreviewannexure(values)}
                                                    className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )}
                                />

                                </div>
                                <div className="field col-12 md:col-3"><Field
                                    name="subband"
                                    render={({ input, meta }) => (
                                        <div className="field">
                                            <label htmlFor="subband">Sub Band</label>
                                            <span className="p-float-label">
                                                <Dropdown id="subband" {...input} options={filtersubband(values["band"])} optionLabel="label" placeholder="Select sub band"
                                                    onChange={e => callpreviewannexure(values)}
                                                    className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
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
                                                        <InputNumber id="FixedCTC" min={0} value={values.FixedCTC} onBlur={input.onBlur}
                                                            onValueChange={(e) => { input.onChange(e); callpreviewannexure(values) }} mode="currency" currency="INR" locale="en-IN" maxFractionDigits={0} className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
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
                                                name="IsVariable"
                                                render={({ input, meta }) => (
                                                    <>
                                                        <RadioButton  {...input} className='ml-2' inputId="IsVariable" name="IsVariable" value={true} checked={values.IsVariable == true} onClick={() => { values["FinalCTC"] = values["FixedCTC"] + ((values["IsVariable"] ? (values["VariablePay"]) ? values["VariablePay"] : 0 : 0)); callpreviewannexure(values) }} />

                                                    </>
                                                )} />
                                            <label className="radio-inline me-3">Yes
                                            </label>

                                            <Field
                                                name="IsVariable"
                                                render={({ input, meta }) => (
                                                    <>
                                                        <RadioButton  {...input} className='ml-2' inputId="IsVariable" name="IsVariable" value={false} checked={values.IsVariable == false} onClick={() => { values["FinalCTC"] = values["FixedCTC"] + ((values["IsVariable"] ? (values["VariablePay"]) ? values["VariablePay"] : 0 : 0)); callpreviewannexure(values) }} />

                                                    </>
                                                )} />
                                            <label className="radio-inline me-3">No
                                            </label>
                                        </div>
                                        <br />
                                        <div className='col-12' style={{ marginTop: "-30px" }}>
                                            <Field
                                                name="IsVariable"
                                                render={({ input, meta }) => (
                                                    <>

                                                        {getFormErrorMessage(meta)}
                                                    </>
                                                )} />
                                        </div>

                                    </div>

                                    <div hidden={values["IsVariable"] == true ? false : true} className="field col-12 md:col-3">
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
                                                                <InputNumber id="VariablePay" min={0} value={values.VariablePay} onBlur={input.onBlur} onValueChange={(e) => { input.onChange(e); values["FinalCTC"] = values["FixedCTC"] + ((values["IsVariable"] ? (values["VariablePay"]) ? values["VariablePay"] : 0 : 0)); callpreviewannexure(values) }} mode="currency" currency="INR" locale="en-IN" maxFractionDigits={0} className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                            </span>
                                                            {getFormErrorMessage(meta)}

                                                        </div>
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div hidden={values["IsVariable"] == true ? false : true} className="field col-12 md:col-3">
                                        <div className="field-radiobutton">
                                            <Field
                                                name="MQVariable"
                                                render={({ input, meta }) => (
                                                    <RadioButton  {...input} className='ml-2' inputId="MQVariable" onChange={e => callpreviewannexure(values)} name="MQVariable" value="M" checked={values.MQVariable == "M"} />
                                                )} />
                                            <label className="radio-inline me-3">Monthly
                                            </label>

                                            <Field
                                                name="MQVariable"
                                                render={({ input, meta }) => (
                                                    <RadioButton  {...input} className='ml-2' inputId="MQVariable" onChange={e => callpreviewannexure(values)} name="MQVariable" value="Q" checked={values.MQVariable == "Q"} />
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
                                <div className="p-fluid  grid">
                                    <div className="field col-12 md:col-6">
                                    </div>
                                    <div className="field col-12 md:col-6">
                                        Final ctc = {values["FixedCTC"] + ((values["IsVariable"] ? (values["VariablePay"]) ? values["VariablePay"] : 0 : 0))}
                                        {/* { values["FinalCTC"]=values["FixedCTC"]+((values["IsVariable"]?(values["VariablePay"])?values["VariablePay"]:0:0))} */}
                                    </div>
                                </div>
                            </Panel>


                            <br />



                            <div className="p-fluid  grid">
                                <div className="field col-12 md:col-4">
                                    <Field
                                        name="Is_Eligible_annu_Mgnt_Bonus"
                                        type="checkbox"
                                        render={({ input, meta }) => (
                                            <div className="field-checkbox">
                                                <Checkbox inputId={input.name} {...input} onChange={e => callpreviewannexure(values)} />
                                                <label htmlFor={input.name} style={{ cursor: "pointer" }}>
                                                    {"Eligible for Annual Mgnt Bonus"}
                                                </label>
                                            </div>)} />
                                </div>
                                <div className="field col-12 md:col-4">
                                    <Field
                                        name="Is_Eligible_Joining_Bonus"
                                        type="checkbox"
                                        render={({ input, meta }) => (
                                            <div className="field-checkbox">
                                                <Checkbox inputId={input.name} {...input} onChange={e => callpreviewannexure(values)} />
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
                                                <Checkbox inputId={input.name} {...input} onChange={e => callpreviewannexure(values)} />
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