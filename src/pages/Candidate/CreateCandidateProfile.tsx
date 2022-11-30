import { Calendar } from 'primereact/calendar'
import { Card } from 'primereact/card'
import { Dropdown } from 'primereact/dropdown'
import { InputNumber } from 'primereact/inputnumber'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { classNames } from 'primereact/utils'
import React, { useRef } from 'react'
import { Field, Form } from 'react-final-form'
import { InputMask } from 'primereact/inputmask';
import { FileUpload } from 'primereact/fileupload';
import { Button } from "primereact/button";

function CreateCandidateProfile() {
    const getFormErrorMessage = (meta) => {
        return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
    };
    const fileref=useRef()
    const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
    const validate = (values) => {
        let errors = {};
        // console.log(data)

        // if (!data.JobDesc) {
        //     errors.JobDesc = "*JobDescription is required.";
        // }
        // if (!data.JobTitle) {
        //     errors.JobTitle = "*JobDescription is required.";
        // }
        // var arr = ["CandidateFirstName", "BusinessUnit_id", "Serviceline_id", "Industry_id", "Industry_id", "Customer_id", "Location_id", "EmploymentType", "JobTitle", "JobDesc", "ExperianceLevel_id", "Qualification", "NoOfPositions", "OnBoardingDate", "HR_User_Name", "BH_User_Name"]
        var arr = ["CandidateFirstName", "CandidateLastName", "Qualification", "skills", "ExpectedDOJ","Email", "ContactNo", "Resume"]
        arr.forEach((i) => {
            if (!values[i]) {
                errors[i.toString()]= "* This field is required";
                           }
                  })
                  console.log(values["OverallYears"])
        // if(!values["Duration"]&&values.EmploymentType=="Contract"){
        //     console.log(values["Duration"])

        //     errors["Duration"]="*This ffield is required"
        // }
      
        return errors;
    };

    return (
        <>
            <div>
                <Card title="Create Candidate Profile">
                    <Form
                        onSubmit={(values: any) => {
                            console.log(values)
                        }}
                        initialValues={{ "OverallYears": 0, "OverallMonths": 0, "RelevantYears": 0, "RelevantMonths": 0, "Resume" : null }}
                        validate= {validate}
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
                                            name="CandidateFirstName"
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
                                            name="CandidateLastName"
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
                                                    name="OverallYears"
                                                    render={({ input, meta }) => (
                                                        <div className="field fluid">
                                                            <label htmlFor="OverallYears">Years</label>
                                                            <span className="field fluid">
                                                                <InputNumber id="OverallYears" value={values.OverallYears} onValueChange={e => values.OverallYears = e.value} showButtons className={classNames({ "p-invalid": isFormFieldValid(meta) })} mode="decimal" min={0} max={60} />
                                                                <label htmlFor="OverallYears" className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                                                            </span>
                                                            {getFormErrorMessage(meta)}
                                                        </div>
                                                    )}
                                                />
                                            </div>

                                            <div className="field col-12 md:col-6">
                                                <Field
                                                    name="OverallMonths"
                                                    render={({ input, meta }) => (
                                                        <div className="field fluid">
                                                            <label htmlFor="OverallMonths">Months</label>
                                                            <span className="field fluid">
                                                                <InputNumber id="OverallMonths" value={values.OverallMonths} onValueChange={e => values.OverallMonths = e.value} showButtons className={classNames({ "p-invalid": isFormFieldValid(meta) })} mode="decimal" min={0} max={12} />

                                                                <label htmlFor="OverallMonths" className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
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
                                                    name="RelevantYears"
                                                    render={({ input, meta }) => (
                                                        <div className="field fluid">
                                                            <label htmlFor="RelevantYears">Years</label>
                                                            <span className="field fluid">
                                                                <InputNumber id="RelevantYears" value={values.RelevantYears} onValueChange={e => values.RelevantYears = e.value} showButtons className={classNames({ "p-invalid": isFormFieldValid(meta) })} mode="decimal" min={0} max={60} />
                                                                <label htmlFor="RelevantYears" className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                                                            </span>
                                                            {getFormErrorMessage(meta)}
                                                        </div>
                                                    )}
                                                />
                                            </div>

                                            <div className="field col-12 md:col-6">
                                                <Field
                                                    name="RelevantMonths"
                                                    render={({ input, meta }) => (
                                                        <div className="field fluid">
                                                            <label htmlFor="RelevantMonths">Months</label>
                                                            <span className="field fluid">
                                                                <InputNumber id="RelevantMonths" value={values.RelevantMonths} onValueChange={e => values.RelevantMonths = e.value} showButtons className={classNames({ "p-invalid": isFormFieldValid(meta) })} mode="decimal" min={0} max={12} />

                                                                <label htmlFor="RelevantMonths" className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
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
                                            name="skills"
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
                                            name="CurrentOrg"
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
                                            name="CurrentLoc"
                                            render={({ input, meta }) => (
                                                <div className="field fluid">
                                                    <label htmlFor="CurrentLoc">Current Location</label>
                                                    <span className="field fluid">
                                                        <InputText maxLength={50} id="CurrentLoc" {...input} className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                        <label htmlFor="CurrentLoc" className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
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
                                                        <Calendar id="ExpectedDOJ" {...input} dateFormat="mm/dd/yy" mask="99/99/9999" showIcon placeholder="Select a Date" className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                    </span>
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
                                                        <InputNumber id="CurrentCTC" value={values.CurrentCTC} onValueChange={(e) => values.CurrentCTC = e.value}  mode="currency" currency="INR" className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
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
                                                <div className="field fluid">
                                                    <label htmlFor="ExpectedCTC">Expected CTC</label>
                                                    <span className="field fluid">
                                                        <InputNumber id="ExpectedCTC" value={values.ExpectedCTC} onValueChange={(e) => values.ExpectedCTC = e.value}  mode="currency" currency="INR" className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                        <label htmlFor="ExpectedCTC" className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
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
                                                        <InputNumber id="NegotiatedCTC" value={values.NegotiatedCTC} onValueChange={(e) => values.NegotiatedCTC = e.value}  mode="currency" currency="INR" className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
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

                                                                <label htmlFor="ExpectedCTC" className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
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
                                                                <InputNumber id="AvgApprovedCTC" disabled value={values.AvgApprovedCTC} onValueChange={(e) => values.AvgApprovedCTC = e.value} showButtons mode="currency" currency="INR" className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
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
                                                                <InputNumber id="AvgBillRate" value={values.AvgBillRate} onValueChange={(e) => values.AvgBillRate = e.value} showButtons mode="currency" currency="USD" min={0} className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
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
                                                    <span  className="field fluid">{console.log(values.Resume)}
                                                        <FileUpload ref={fileref} uploadOptions={{ style: { display: 'none' } }} cancelOptions={{ style: { display: 'none' } }}  accept="*" multiple={false} disabled={values.Resume?.values()?.length()>0?true:false} 
                                                        onSelect= {async (e)=> {console.log(e);  values.Resume =await e.files[0];console.log(values.Resume)}}
                                                        // onBeforeSelect= {() => {fileref.current.clear(); console.log("before"); return false}}
                                                         onClick={async (e)=>values.Resume?await fileref.current.clear():console.log("calling ")} 
                                                         maxFileSize={100000000}
                                                            emptyTemplate={<p className="m-0">No Files.</p>} className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                        {/* <InputNumber id="NegotiatedCTC" value={values.NegotiatedCTC} onValueChange={(e) => values.NegotiatedCTC = e.value} showButtons mode="currency" currency="INR" className={classNames({ "p-invalid": isFormFieldValid(meta) })} /> */}
                                                        <label htmlFor="Resume" className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                                                    </span>
                                                    {getFormErrorMessage(meta)}
                                                </div>
                                            )}
                                        />

                                    </div>
                                </div>

                                <Button label="Submit" className="mt-2" />



                            </form>

                        )
                        }

                    />



                </Card>
            </div>

        </>
    )
}

export default CreateCandidateProfile