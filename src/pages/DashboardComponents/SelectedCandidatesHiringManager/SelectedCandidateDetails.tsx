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
import { useLocation, useNavigate } from 'react-router'
import CandidateDetails from '../CandidateDetails'
import JobPostDetails from '../JobPostDetails'

function SelectedCandidateDetails() {
    const location = useLocation()
    const data = location.state
    const navigate = useNavigate()
    useEffect(() => {
        console.log(location.state)
    })
    const validate = (values) => {
        let errors = {};
        // console.log(data)

        // if (!data.JobDesc) {
        //     errors.JobDesc = "*JobDescription is required.";
        // }
        // if (!data.JobTitle) {
        //     errors.JobTitle = "*JobDescription is required.";
        // }
        var arr = ["Company", "BusinessUnit", "ServiceLine", "Industry", "Customer",
            "Location", "EmploymentType", "JobTitle", "JobDesc", "ExperienceLevel",
            "Qualification", "NoOfPositions", 'MaximumExperience', 'MinimumExperience', 'MaximumCTC',
            "OnBoardingDate", "HR_User_Name", "BH_User_Name"]
        arr.forEach((i) => {
            if (!values[i]) {
                errors[i.toString()] = "* This field is required";
            }
        })
        //   console.log(values["Duration"])
        if (!values["Duration"] && values.EmploymentType != "Full-Time") {
            // console.log(values["Duration"])

            errors["Duration"] = "*This field is required"
        }
        // console.log(errors)
        return errors;
    };
    const isFormFieldValid = (meta) => !!(meta.touched && meta.error);

    const getFormErrorMessage = (meta) => {
        return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
    };
    return (
        <>
            <Card>
                <Panel header={"JobPost Details"}>

                    <JobPostDetails JobData={data.jobpost}></JobPostDetails>
                </Panel>
                <br>
                </br>
                <Panel header={"Candidate Details"}>

                    <CandidateDetails data={data.candidate}></CandidateDetails>
                </Panel>
                <br></br>
                <Form

                    onSubmit={(values: any) => {
                        // console.log(values)
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
                        CanFirstName: data.candidate.CanFirstName,
                        CanLastName: data.candidate.CanLastName,
                        ExpectedDOJ: new Date(data.candidate.ExpectedDOJ.toString()),
                        CurrentCTC: data.candidate.CurrentCTC,
                        ExpectedCTC: data.candidate.ExpectedCTC,
                        NegotiatedCTC: data.candidate.NegotiatedCTC




                    }}

                    validate={validate}

                    render={({ handleSubmit, values, submitting,
                        submitError,
                        invalid,
                        pristine,
                        initialValues = {},
                        dirtySinceLastSubmit, }) => (
                        <form onSubmit={handleSubmit} >
                            {/* <div className="p-fluid  grid">
                                <div className="field col-12 md:col-4"><Field
                                    name="CanFirstName"
                                    render={({ input, meta }) => (
                                        <div className="field">
                                            <label htmlFor="Job Title">First Name</label>
                                            <span className="p-float-label">
                                                <InputText readOnly={true} id="Job Title" {...input} autoFocus className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                <label htmlFor="." className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )}
                                /></div>
                                <div className="field col-12 md:col-4"><Field
                                    name="CanLastName"
                                    render={({ input, meta }) => (
                                        <div className="field">
                                            <label htmlFor="Job Title">Last Name</label>
                                            <span className="p-float-label">
                                                <InputText id="Job Title" {...input} autoFocus className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                <label htmlFor="." className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )}
                                /></div>
                                <div className="field col-12 md:col-4"><Field
                                    name="ExpectedDOJ"
                                    render={({ input, meta }) => (
                                        <div className="field">
                                            <label htmlFor="ExpectedDOJ">Expected Date Of Joining</label>
                                            <span className="p-float-label">
                                                <Calendar showIcon={true} id="ExpectedDOJ" {...input} value={values.ExpectedDOJ} className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                <label htmlFor="ExpectedDOJ" className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )}
                                /></div>
                            </div> */}
                            {/* <div className="p-fluid  grid">

                                <div className="field col-12 md:col-4"><Field
                                    name="CurrentCTC"
                                    render={({ input, meta }) => (
                                        <div className="field">
                                            <label htmlFor="No of openings">Current CTC</label>
                                            <span className="p-float-label">
                                                   <InputNumber id="CurrentCTC" value={values.CurrentCTC} showButtons min={1} onBlur={input.onBlur} onValueChange={(e) => input.onChange(e)} className={classNames({ "p-invalid": isFormFieldValid(meta) })} />

                                                <label htmlFor="No of openings" className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )}
                                /></div>
                                <div className="field col-12 md:col-4"><Field
                                    name="ExpectedCTC"
                                    render={({ input, meta }) => (
                                        <div className="field">
                                            <label htmlFor="ExpectedCTC">Expected CTC</label>
                                            <span className="p-float-label">
                                                   <InputNumber id="ExpectedCTC" value={values.ExpectedCTC} showButtons min={1} onBlur={input.onBlur} onValueChange={(e) => input.onChange(e)} className={classNames({ "p-invalid": isFormFieldValid(meta) })} />

                                                <label htmlFor="ExpectedCTC" className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )}
                                /></div>
                                <div className="field col-12 md:col-4"><Field
                                    name="NegotiatedCTC"
                                    render={({ input, meta }) => (
                                        <div className="field">
                                            <label htmlFor="NegotiatedCTC">Negotiated CTC</label>
                                            <span className="p-float-label">
                                                 <InputNumber id="NegotiatedCTC" value={values.NegotiatedCTC} showButtons min={1} onBlur={input.onBlur} onValueChange={(e) => input.onChange(e)} className={classNames({ "p-invalid": isFormFieldValid(meta) })} />

                                                <label htmlFor="NegotiatedCTC" className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )}
                                /></div>
                            </div> */}
                            <div className="p-fluid  grid">
                                <div className="field col-12 md:col-4"><Field
                                    name="ExperienceLevel"
                                    render={({ input, meta }) => (
                                        <div className="field">
                                            <label htmlFor="Experience Level">Designation</label>
                                            <span className="p-float-label">
                                                <Dropdown id="Experience Level" {...input} options={[]} optionLabel="label" placeholder="Select Experience-Level" className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )}
                                />

                                </div>
                                <div className="field col-12 md:col-4"><Field
                                    name="ExperienceLevel"
                                    render={({ input, meta }) => (
                                        <div className="field">
                                            <label htmlFor="Experience Level">Band</label>
                                            <span className="p-float-label">
                                                <Dropdown id="Experience Level" {...input} options={[]} optionLabel="label" placeholder="Select Experience-Level" className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )}
                                />

                                </div>
                                <div className="field col-12 md:col-4"><Field
                                    name="ExperienceLevel"
                                    render={({ input, meta }) => (
                                        <div className="field">
                                            <label htmlFor="Experience Level">Sub Band</label>
                                            <span className="p-float-label">
                                                <Dropdown id="Experience Level" {...input} options={[]} optionLabel="label" placeholder="Select Experience-Level" className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )}
                                />

                                </div>



                            </div>
                            <div className="p-fluid  grid">
                                <div className="field col-12 md:col-4"><Field
                                    name="ExperienceLevel"
                                    render={({ input, meta }) => (
                                        <div className="field">
                                            <label htmlFor="Experience Level">Date of joining</label>
                                            <span className="p-float-label">
                                                <Calendar showIcon={true} id="Experience Level" {...input} placeholder="Select Experience-Level" className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )}
                                />

                                </div>
                                <div className="field col-12 md:col-4"><Field
                                    name="Final ctc"
                                    render={({ input, meta }) => (
                                        <div className="field">
                                            <label htmlFor="Final ctc">Final ctc</label>
                                            <span className="p-float-label">
                                                <InputText id="Experience Level" {...input} placeholder="Final ctc" className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )}
                                />

                                </div>
                                <div className="field col-12 md:col-4"><Field
                                    name="ExperienceLevel"
                                    render={({ input, meta }) => (
                                        <div className="field">
                                            <label htmlFor="Experience Level">variable(%)</label>
                                            <span className="p-float-label">
                                                <InputNumber id="Experience Level" {...input} min={0} max={100} step={1} showButtons={true} placeholder="Select Experience-Level" className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )}
                                />

                                </div>



                            </div>

                            <div className="p-fluid  grid">
                                <div className="field col-12 md:col-4">
                                </div>
                                <div className="field col-12 md:col-4">
                                </div>
                                <div className="field col-12 md:col-4">
                                </div>
                            </div>




                            <div className="p-fluid  grid">
                                <div className="field col-12 md:col-4">
                                    <Field
                                        name="Eligible for Annual Mgnt Bonus"
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
                                        name="Eligible for Joining Bonus"
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
                                        name="Eligible for Monthly Incentive"
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
                                    <Button className='mr-3'>Download/Preview Offer Letter
                                    </Button>
                                    <Button className='mr-3'>Send Offer Letter

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

export default SelectedCandidateDetails