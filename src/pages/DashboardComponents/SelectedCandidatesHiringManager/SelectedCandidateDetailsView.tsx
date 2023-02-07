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
import Annexure from './Annexure'
import { Dialog } from 'primereact/dialog'

function SelectedCandidateDetailsView(props) {
    const location = useLocation()
    const [data, setdata] = useState(location.state)
    const logindata = useSelector((state: RootState) => state.Login)
    const annexuredata = useSelector((state: RootState) => state.anexure)
    const [mode, setmode] = useState(data.designation ? "true" : "false")
    const [candidatedata, setCandidatedata] = useState(data.candidate)
    const [jobpostdata, setjobpostdata] = useState(data.jobpost)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [show, setshow] = useState(false)
    useEffect(() => {
        dispatch(getdesignationsaction())
        dispatch(getBandaction())
        dispatch(getsubbandsaction())
        // console.log(location.state)
        console.log(data)
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
                values.VariablePay)
                return false
            else
                return true
        }
    }
    const callpreviewannexure1 = async (values) => {

        console.log(values)
        values["FixedCTC"] = parseInt(values["FixedCTC"])
        values["VariablePay"] = parseInt(values["VariablePay"])
        values.selectedcandidateid= values.Selected_Candidate_ID
        if (
            values.selectedcandidateid &&
            values.designation &&
            values.band &&
            values.subband &&
            values.FixedCTC &&
            values.VariablePercentage &&
            values.MQVariable &&
            values.IS_Eligible_annu_Mgnt_Bonus &&
            values.IS_Eligible_Joining_Bonus &&
            values.IS_Eligible_Monthly_Incentive) {


        }
        // values.selectedcandidateid=data.Selected_Candidate_ID?data.Selected_Candidate_ID:values.selectedcandidateid
        {
            values.candidate =
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
    const formatCurrency = (value: any) => {
        return value?value.toLocaleString('en-US', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }):'';
      
      
      }
    return (
        <>
            {console.log(mode)}

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
                <Panel >

                    <div className="grid">
                        <div className="md:col-3">
                            Designation: {data.designation_name}
                        </div>
                        <br></br>


                        <div className="md:col-3">
                            Band: {data.band_name}
                        </div>
                        <br></br>


                        <div className="md:col-3">
                            Sub Band: {data.subband_name}
                        </div>
                        <br></br>


                        <div className="md:col-3">
                            Date of joining:{new Date(data?.DateOfJoining).toLocaleDateString('en-US', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                    })}
                        </div>

                    </div>

                </Panel>
                <br></br>
                <Panel header="Final CTC">
                    <div className="grid">
                        <div className="md:col-4">
                            Fixed CTC: {formatCurrency(data?.FixedCTC)}
                            {/* {formatCurrency(candidatedata?.ExpectedCTC)} */}
                            <br></br>
                            <br></br>
                            {data.IsVariable == true ? (<>Variable Pay :{formatCurrency(data?.VariablePay)}</>) : ""}
                            ({data.IsVariable == true ? (<>{data.MQVariable=="M"?"Monthly":"Quaterly"}</>) : ""})
                            <br></br>
                            <br></br>
                            Final CTC: {formatCurrency(data?.FinalCTC)}


                        </div>
                        <br></br>

                        
                        {/* <div className="md:col-2"> */}
                        {/* </div> */}
                        <br></br>

                        {/* <div className="md:col-2">
                        </div> */}
                        {/* <div className="md:col-2"> */}
                        {/* </div> */}
                        <div className="md:col-2">

                        </div>
                        <div className="md:col-2">
                        </div>

                    </div>
                    

                    
                </Panel>
                    <br></br>
                    <br></br>
                    <div className="grid">
                        <div className="md:col-3">
                        Eligible for Annual Mgnt Bonus:{data.Is_Eligible_annu_Mgnt_Bonus == true ? (<> Yes</>) : " No"}
<br></br>
<br></br>
                             

                        {data.Is_Eligible_Joining_Bonus == true ? (<>Eligible for Joining Bonus: Yes</>) : ""}

                            
                       <br></br>
                       <br></br>
                        {data.IS_Eligible_Monthly_Incentive == true ? (<>Eligible for Monthly Incentive: Yes</>) : ""}

                        </div>

                    </div>
                    

                        <br></br>
                        <br></br>  
                         
                <div className=" grid">
                        
                        <div className="field col-12 md:col-6"></div>
                        <div className="field col-12 md:col-6 flex">
                            <Button className='mr-3' type="button" onClick={e => {
                                callpreviewannexure1(data);

                            }}>Annexure Details

                            </Button>


                            <Button type="button" onClick={e => navigate(-1)}>Cancel
                            </Button>
                        </div>
                    </div>

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
export default connect(mapStateToProps)(SelectedCandidateDetailsView)