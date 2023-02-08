import { Button } from 'primereact/button'
import { Calendar } from 'primereact/calendar'
import { Card } from 'primereact/card'
import { Checkbox } from 'primereact/checkbox'
import { Dropdown } from 'primereact/dropdown'
import { InputNumber } from 'primereact/inputnumber'
import { InputText } from 'primereact/inputtext'
import { Panel } from 'primereact/panel'
import { classNames } from 'primereact/utils'
import React, { useEffect, useRef, useState } from 'react'
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
import Annexure from './Annexure'
import { Dialog } from 'primereact/dialog'
import { selectedcandidateactions } from '../../../api/agent'
import { Toast } from 'primereact/toast';
import { ProgressSpinner } from 'primereact/progressspinner';
import LoadingOverlay from "react-loading-overlay";

function SelectedCandidateDetails(props) {
    const location = useLocation()
    const [data, setdata] = useState(location.state)
    const logindata = useSelector((state: RootState) => state.Login)
    const annexuredata = useSelector((state: RootState) => state.anexure)
    const toaststatus = useSelector((state: RootState) => state.toaster.status)
    const [mode, setmode] = useState(data.designation ? "true" : "false")
    const [candidatedata, setCandidatedata] = useState(data.candidate)
    const [jobpostdata, setjobpostdata] = useState(data.jobpost)
    const [doj, setDoj] = useState(data.DateOfJoining)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [show, setshow] = useState(false)
    const toast = useRef(null);
    const [showspinner, setShowspinner] = useState(false)
    
    useEffect(() => {
        dispatch(getdesignationsaction())
        dispatch(getBandaction())
        dispatch(getsubbandsaction())
        // console.log(location.state)
        // console.log(data)
        console.log(annexuredata)

    }, [])
    useEffect(() => {
        console.log(annexuredata)
    }, [annexuredata])
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

            "designation", "band", "subband"
            , "DateOfJoining"

        ]
        arr.forEach((i) => {
            if (!values[i] ) {
                errors[i.toString()] = "* This field is required";
            }
        })
        console.log(values.IsVariable)
        if ( values.IsVariable  == null) {

            errors["IsVariable"] = "*This field is required"
        }
        if (!values["VariablePay"] && values.IsVariable == true) {
            // console.log(values["Duration"])

            errors["VariablePay"] = "*This field is required"
        }
        if (!values["FixedCTC"]) {
            // console.log(values["Duration"])

            errors["FixedCTC"] = "*This field is required"
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
    const shoulddisanleanexurebutton = (values) => {
 
        console.log(values)
        if (!values.IsVariable) {
            if (
                values.designation > 0 &&
                values.band > 0 &&
                values.subband > 0 &&
                values.DateOfJoining &&
                values.FixedCTC > 0
            )
                return false
            else
                return true
        }
        else {

            if (
                values.designation > 0 &&
                values.band > 0 &&
                values.subband > 0 &&
                values.DateOfJoining &&
                values.FixedCTC > 0 &&
                values.MQVariable != "" &&
                values.VariablePay )
                return false
            else
                return true
        }
    }
    const callpreviewannexure1 = async (values) => {
       
        console.log(values)
        values["FixedCTC"] = parseInt(values["FixedCTC"])
        values["VariablePay"] = parseInt(values["VariablePay"])
        if (
            values.selectedcandidateid &&
            values.designation &&
            values.band &&
            values.subband &&
            values.FixedCTC 
      ) {
   
            var datetemp = new Date(values.DateOfJoining)            
            values.DateOfJoining = datetemp.getFullYear() + "-" + (datetemp.getMonth() + 1) + "-" + datetemp.getDate()        
            await dispatch(previewannexureaction(values))
            await setdata(values)
            await setmode("draft")
            setshow(true)
        }
    }
    const DialogFooter = () => {
        return (
            <>
                <Button onClick={e => { setshow(false) }}>Close</Button>
            </>
        )
    }
    return (
        <> 
              <LoadingOverlay
        active={showspinner}
        spinner
        text="Generating Offer Letter..."
      >
        {/* {showspinner &&
            <ProgressSpinner  style={{width: '50px', height: '50px'}} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s"/>
            } */}
            <Toast ref={toast} position="bottom-left" />
            {console.log(mode)}
            {console.log(data)}
            <Card>
                <Dialog visible={show} style={{ width: "50%" }} header="Annexure Information " modal className="p-fluid" footer={DialogFooter} onHide={() => setshow(false)}>

                    {/* <label htmlFor="BandName<">Annexure</label> */}

                    <Annexure annexure={annexuredata}></Annexure>

                </Dialog>
                <Panel header={"Candidate Details"}>
                    <CandidateDetails data={candidatedata}></CandidateDetails>
                </Panel>
                <br>
                </br>
                <Accordion>
                    <AccordionTab header={"JobPost Details"}>
                        <JobPostDetails JobData={jobpostdata}></JobPostDetails>
                    </AccordionTab>
                </Accordion>
                {/* <Panel header={"JobPost Details"}>
                    <JobPostDetails JobData={data.jobpost}></JobPostDetails>
                    
                </Panel> */}
                <br></br>
                <Form

                    onSubmit={async(values: any) => {
                        values["FixedCTC"] = parseInt(values["FixedCTC"])
                        values["VariablePay"] = parseInt(values["VariablePay"])
                        console.log(values.DateOfJoining)
                        // console.log(typeof values.DateOfJoining)
                        // var tempdate = values.DateOfJoining
                        var datetemp = new Date(values.DateOfJoining)
                        values["FinalCTC"] = values["FixedCTC"] + ((values["IsVariable"] ? (values["VariablePay"]) ? values["VariablePay"] : 0 : 0))
                        values["doj"] = datetemp.getFullYear() + "-" + (datetemp.getMonth() + 1) + "-" + datetemp.getDate()
                        console.log(values)                        
                        // await setdata(values)
                        // await setmode("draft")
                        // dispatch(updateselectedcandidatesaction(values))
                        try {
                            setShowspinner(true)
                            selectedcandidateactions.updateselectedcandidate(values)
                            .then((res)=>{ console.log(res);
                                setShowspinner(false)
                                toast.current.show({severity:'success', summary: 'Success Message', detail:res, life: 3000});
                                })
                            .catch((ex)=>{console.log(ex);
                                setShowspinner(false)
                                setdata(values); setmode('draft');
                            toast.current.show({severity:'error', summary: 'Error Message', detail:ex, life: 3000});})
                  
                            // console.log(res)
                    
                            // yield put({type:"selectedcandidates/selectedandidatesdata",payload:res})
                           
                        }
                        catch (err) {
                            console.log(err)                 
                    
                            setShowspinner(false)
                    
                        }
                        // values.DateOfJoining = tempdate
                        
                        // console.log(toaststatus)
                        // navigate(-1)
                        // console.log(values.OnBoardingDate)
                        // var datetemp = new Date(values.OnBoardingDate)
                        // console.log(datetemp.getMonth())
                        // console.log(datetemp.getFullYear() + "-" + (datetemp.getMonth() + 1) + "-" + datetemp.getDate())
                        // values.OnBoardingDate = datetemp.getFullYear() + "-" + (datetemp.getMonth() + 1) + "-" + datetemp.getDate()
                        // // alert("sub mit form")
                        // if (mode) {


                        //     dispatch(updatejobpost(values))
                        //     navigate(-1)
                        // }
                        // else {
                        //     dispatch(createnewjobpost(values))
                        //     navigate(-1)
                        // }
                    }
                    }
                    initialValues={mode == "true" ? {
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
                        
                        
                    } : mode == "false" ? {

                        "selectedcandidateid": data.Selected_Candidate_ID,
                        // "VariablePay": 0,
                        "Is_Eligible_annu_Mgnt_Bonus": false,
                        "Is_Eligible_Joining_Bonus": false,
                        "IS_Eligible_Monthly_Incentive": false,
                        "Modified_By": logindata.username,
                        "MQVariable": null,                  

                        "designation": null,
                        "band": null,
                        "subband": null,
                        "VariablePay" : null,
                        "DateOfJoining": null,
                        "IsVariable": null


                    } :
                        {
                            "selectedcandidateid": data.selectedcandidateid,
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
                        }

                    }

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
                                                <Dropdown id="designation"  {...input} options={props.getactivedesignationoptionsprop} optionLabel="label" placeholder="Select Designation"

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
                                                <Calendar dateFormat='mm/dd/yy' showIcon={true} id="DateOfJoining" {...input} placeholder="Select Date of joining" className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )}
                                />

                                </div>

                            </div>

                            <Panel header={"Cost To Company"}>
                                <div className="p-fluid  grid">
                                    <div className="field col-12 md:col-3">
                                        <Field name="FixedCTC">
                                            {({ input, meta }) => (
                                                <div>
                                                    <label>Fixed CTC: </label>
                                                    <br></br>
                                                    <br></br>
                                                    <input className='p-inputtext p-component' {...input} type="number" value={parseInt(values["FixedCTC"])} placeholder="Fixed CTC" />
                                                    <br></br>
                                                    {getFormErrorMessage(meta)}
                                                </div>
                                            )}
                                        </Field>
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
                                                        <RadioButton  {...input} className='ml-2' inputId="IsVariable" name="IsVariable" value={true} checked={values.IsVariable == true} onClick={() => { values["FinalCTC"] = values["FixedCTC"] + ((values["IsVariable"] ? (values["VariablePay"]) ? values["VariablePay"] : 0 : 0)); }} />

                                                    </>
                                                )} />
                                            <label className="radio-inline me-3">Yes
                                            </label>

                                            <Field
                                                name="IsVariable"
                                                render={({ input, meta }) => (
                                                    <>
                                                        <RadioButton  {...input} className='ml-2' inputId="IsVariable" name="IsVariable" value={false} checked={values.IsVariable == false} onClick={() => { values["FinalCTC"] = values["FixedCTC"] + ((values["IsVariable"] ? (values["VariablePay"]) ? values["VariablePay"] : 0 : 0)); }} />

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
                                                <Field name="VariablePay">
                                                    {({ input, meta }) => (
                                                        <div>
                                                            <input className='p-inputtext p-component' {...input} value={parseInt(values["VariablePay"])} type="number" placeholder="variable pay" />

                                                            {getFormErrorMessage(meta)}
                                                        </div>
                                                    )}
                                                </Field>
                                            </div>
                                        </div>
                                    </div>
                                    <div hidden={values["IsVariable"] == true ? false : true} className="field col-12 md:col-3">
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
                                <div className="p-fluid  grid">
                                    <div className="field col-12 md:col-10">
                                    </div>
                                    <div className="field col-12 md:col-2"><b>
                                        Final CTC = {(parseInt(values["FixedCTC"]?values["FixedCTC"]:0) + ((values["IsVariable"] ? (values["VariablePay"]) ? parseInt(values["VariablePay"]) : 0 : 0))).toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 })}
                                        {/* Final ctc = {values["FinalCTC"] } */}
                                        {/* { values["FinalCTC"]=values["FixedCTC"]+((values["IsVariable"]?(values["VariablePay"])?values["VariablePay"]:0:0))} */}
                                        </b>
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
                                                <Checkbox inputId={input.name} {...input} />
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
                                {/* <div className="field col-12 md:col-6">Annexure
                                    <Annexure annexure={annexuredata}></Annexure>

                                </div> */}
                                <div className="field col-12 md:col-6"></div>
                                <div className="field col-12 md:col-6 flex">
                                    {/* <div style={{ height: "50px", width: "50px", backgroundColor: "red" }} onMouseLeave={() => callpreviewannexure1(values)}>calc</div> */}
                                    <Button className='mr-3' type="button" disabled={shoulddisanleanexurebutton(values)} onClick={e => {
                                        callpreviewannexure1(values);

                                    }}>Preview Annexure

                                    </Button>
                                    <Button className='mr-3' type="submit" onClick={e => handleSubmit}>Save & Generate Offer Letter

                                    </Button>
                                    {/* <Button className='mr-3' type="button">Download/Preview Offer Letter
                                    </Button> */}
                                    <Button type="button" onClick={e => navigate(-1)}>Cancel
                                    </Button>
                                </div>
                            </div>


                        </form>
                    )}


                />
            </Card>
            </LoadingOverlay>
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