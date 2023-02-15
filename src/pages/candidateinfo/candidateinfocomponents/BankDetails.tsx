import { Button } from 'primereact/button'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Field, Form } from 'react-final-form'
import { setnextcandidateinfotab, setprevcandidateinfotab } from '../../../features/Misc/globalslice'
import { Calendar } from 'primereact/calendar'
import { InputText } from 'primereact/inputtext'
import { Dialog } from 'primereact/dialog'
import { Dropdown } from 'primereact/dropdown'
import classNames from 'classnames'
import { useSelector } from 'react-redux'
import { RootState } from '../../../app/store'
import { Card } from 'primereact/card'
import { createbankdetailsaction, deletebankdetailsaction, bankdetailsgetaction, updatebankdetailsaction, Ibankdetail } from '../../../features/Candidate info/bankdetailsslice'
import { deletedocumentaction, documentdownloadaction, uploaddocumentaction } from '../../../features/Candidate info/candidateinfoslice'
import { FileUpload } from 'primereact/fileupload'
import { FilterMatchMode } from 'primereact/api'
import { SelectButton } from 'primereact/selectbutton'
import { Panel, PanelHeaderTemplateOptions } from 'primereact/panel'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { InputTextarea } from 'primereact/inputtextarea'


function BankDetails() {
    const dispatch = useDispatch()
    const [modalDialog, setModaldialog] = useState(false);
    const [edit, setEdit] = useState(true);
    const [gridview, setgridview] = useState("grid")
    const [globalFilterValue2, setGlobalFilterValue2] = useState("");
    const [filters2, setFilters2] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    const candidateinfodata = useSelector((state: RootState) => state.candidateinfo)
    const [tempdata, settempdata] = useState<any>({})
    const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
    const bankdetailsdata: Ibankdetail = useSelector((state: RootState) => state.bankdetails)
    useEffect(() => {
        dispatch(bankdetailsgetaction(
            {
                "selectedcandidateid": candidateinfodata.Selected_Candidate_ID

            }
        ))
        console.log("bankdetailsdata ")
    }, [])

    // const isFormFieldValid = (meta) => !!(meta.touched && meta.error);


    const getFormErrorMessage = (meta) => {
        return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
    };
    const validate = (values) => {
        const arr = ["BankName", "AccountNumber", "BranchName", "IFSCcode", "BankPassbook"]
        let errors = {};
        arr.forEach((i) => {
            // console.log(values["Resume"])
            if (!values[i]) {
                // console.log(i.toString())
                errors[i.toString()] = "* This field is required";
            }
        })

        console.log(errors)
        return errors
    }






    return (
        <div>
            <Form
                // {console.log(candidateinfodata)}
                onSubmit={(values: any) => {
                    console.log(values)


                    // var datetemp = new Date(values.DateOfBirth)
                    // console.log(datetemp.getFullYear() + "-" + datetemp.getMonth() + "-" + datetemp.getDate())
                    // values.DateOfBirth = datetemp.getFullYear() + "-" + (datetemp.getMonth() + 1).toString().padStart(2, '0') + "-" + datetemp.getDate().toString().padStart(2, '0')
                    // var datetemp = new Date(values.PassportValidFrom)
                    // console.log(datetemp.getFullYear() + "-" + datetemp.getMonth() + "-" + datetemp.getDate())
                    // values.PassportValidFrom = datetemp.getFullYear() + "-" + (datetemp.getMonth() + 1).toString().padStart(2, '0') + "-" + datetemp.getDate().toString().padStart(2, '0')
                    // var datetemp = new Date(values.PassportValidTo)
                    // console.log(datetemp.getFullYear() + "-" + datetemp.getMonth() + "-" + datetemp.getDate())
                    // values.PassportValidTo = datetemp.getFullYear() + "-" + (datetemp.getMonth() + 1).toString().padStart(2, '0') + "-" + datetemp.getDate().toString().padStart(2, '0')
                    console.log(values)
                    values.selectedCandidateid = candidateinfodata.Selected_Candidate_ID
                    edit ? dispatch(updatebankdetailsaction(values)) : dispatch(createbankdetailsaction(values))


                    dispatch(setnextcandidateinfotab())
                }}
                initialValues={edit ? {
                    "BankName": bankdetailsdata.BankName,
                    "AccountNumber": bankdetailsdata.AccountNumber,

                    "BranchName": bankdetailsdata.BranchName,

                    "IFSCcode": bankdetailsdata.IFSCcode,

                    "BankPassbook": bankdetailsdata.BankPassbook,





                } : {
                    // "BankName": bankdetailsdata.BankName,
                    // "AccountNumber": bankdetailsdata.AccountNumber,

                    // "BranchName": bankdetailsdata.BranchName,

                    // "IFSCcode": bankdetailsdata.IFSCcode,

                    // "BankPassbook": bankdetailsdata.BankPassbook,


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
                        <br></br>
                        <div className="p-fluid  grid">
                            <div className="field col-12 md:col-4">
                                <Field
                                    name="BankName"
                                    render={({ input, meta }) => (
                                        <div className="field " >
                                            <label htmlFor="BankName">Bank Name*</label>
                                            <span className="label">
                                                <InputText id="BankName" {...input} autoFocus className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                <label htmlFor="." className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )}
                                />
                            </div>
                            <div className="field col-12 md:col-4">
                                <Field
                                    name="AccountNumber"
                                    render={({ input, meta }) => (
                                        <div className="field " >
                                            <label htmlFor="AccountNumber">Account Number*</label>
                                            <span className="label">
                                                <InputText id="AccountNumber " {...input} autoFocus className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                <label htmlFor="." className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )}
                                />
                            </div>
                            <div className="field col-12 md:col-4">
                                <Field
                                    name="BranchName"
                                    render={({ input, meta }) => (
                                        <div className="field " >
                                            <label htmlFor="BranchName">Branch Name*</label>
                                            <span className="label">
                                                <InputText id="BranchName " {...input} autoFocus className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
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
                                    name="IFSCcode"
                                    render={({ input, meta }) => (
                                        <div className="field " >
                                            <label htmlFor="IFSCcode">IFSC Code*</label>
                                            <span className="label">
                                                <InputText id="IFSCcode " {...input} autoFocus className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                <label htmlFor="." className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )}
                                />
                            </div>
                            <div className="field col-12 md:col-4">
                                <Field
                                    name="BankPassbook"
                                    render={({ input, meta }) => (
                                        <div>

                                            <label htmlFor="BankPassbook">Passbook*</label>

                                            <span>
                                                <FileUpload style={{}} className='p-success mr-2' mode="basic" name="BankPassbook" maxFileSize={1000000} onSelect={k => {
                                                    if (k.files.length > 0) {
                                                        console.log(k.files[0])
                                                        values["BankPassbook"] = k.files[0]
                                                    }
                                                    else {
                                                        console.log("no files uploaded yet")
                                                    }
                                                }} />
                                            </span>


                                        </div>
                                    )}
                                />
                            </div>

                        </div>

                        <div className="p-fluid  grid">


                            {/* <div>
                                <label htmlFor="BankPassbook">Passbook*</label>

                                <FileUpload style={{}} className='p-success mr-2' mode="basic" name="BankPassbook" maxFileSize={1000000} onSelect={k => {



                                    if (k.files.length > 0) {

                                        console.log(k.files[0])
                                        values["BankPassbook"] = k.files[0]

                                    }
                                    else {
                                        console.log("no files uploaded yet")
                                    }



                                }} />

                            </div> */}


                        </div>








                        <br></br>
                        <br></br>
                        <br></br>
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

export default BankDetails