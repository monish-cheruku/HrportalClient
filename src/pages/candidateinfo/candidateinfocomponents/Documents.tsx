import { Button } from 'primereact/button'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setnextcandidateinfotab, setprevcandidateinfotab } from '../../../features/Misc/globalslice'
import { Field, Form } from 'react-final-form'
import { otherdocumentsgetaction } from '../../../features/Candidate info/otherdocumentsslice'
import { RootState } from '../../../app/store'
import { deleteedducationaldetailsaction } from '../../../features/Candidate info/educationdetailsslice'
import { deletedocumentaction, documentdownloadaction, uploaddocumentaction } from '../../../features/Candidate info/candidateinfoslice'
import { FileUpload } from 'primereact/fileupload'
function Documents() {
    const dispatch = useDispatch()
    const candidateinfodata = useSelector((state: RootState) => state.candidateinfo)
    const otherdocumentsdata = useSelector((state: RootState) => state.otherdocuments)
    const isFormFieldValid = (meta) => !!(meta.touched && meta.error);


    const getFormErrorMessage = (meta) => {
        return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
    };
    useEffect(() => {
        dispatch(otherdocumentsgetaction({
            "selectedcandidateid": candidateinfodata.Selected_Candidate_ID
        }))
        console.log(otherdocumentsdata)
    }, [])

    const selectfileobject = (otherdocumentsdata, s) => {
        console.log(otherdocumentsdata)
        return otherdocumentsdata.filter((i) => i.detailtype == s)

    }
    return (
        <div>Documents
            <br>
            </br>
            <br></br>
            <div className="p-fluid  grid">
                <div className="field col-12 md:col-4">
                    Photograph
                    <FileUpload disabled={selectfileobject(otherdocumentsdata, "Photograph").length > 0} className='p-success' mode="basic" name="demo[]" maxFileSize={1000000} auto chooseLabel="upload File" onSelect={k => {



                        if (k.files.length > 0) {



                            console.log(k.files[0])
                            const data = new FormData()
                            data.append("selectedcandidate", candidateinfodata.Selected_Candidate_ID.toString())
                            data.append("detailtypeId", "0")
                            data.append("detailtype", "Photograph")
                            data.append("file", k.files[0])
                            dispatch(uploaddocumentaction(data))





                        }
                        else {
                            console.log("no files uploaded yet")
                        }



                    }} />
                    <br></br>

                    {
                        selectfileobject(otherdocumentsdata, "Photograph").length > 0 ?
                            <>
                                {
                                    selectfileobject(otherdocumentsdata, "Photograph").map(i => (<>
                                        {i.file.split("/")[i.file.split("/").length - 1]}
                                        <i className="pi pi-download mr-2 ml-2" onClick={() => {
                                            dispatch(documentdownloadaction({
                                                "file": i.file.toString().substring(1, i.file.length)
                                            }))
                                        }} style={{ cursor: "pointer", backgroundColor: "blue", padding: "4px", borderRadius: "9px", color: "white" }}> </i>
                                        <i className="pi pi-trash mr-2" style={{ cursor: "pointer", backgroundColor: "red", padding: "4px", borderRadius: "9px", color: "white" }}
                                            onClick={() => dispatch(deletedocumentaction({
                                                "fileid": i.id

                                            }))}
                                        > Delete</i>
                                    </>))

                                }

                            </>
                            : <>
                            </>


                    }
                </div>

            </div>
            <div className="p-fluid  grid">
                <div className="field col-12 md:col-4">
                    PAN
                    <FileUpload disabled={selectfileobject(otherdocumentsdata, "Pan").length > 0} className='p-success' mode="basic" name="demo[]" maxFileSize={1000000} auto chooseLabel="upload File" onSelect={k => {



                        if (k.files.length > 0) {



                            console.log(k.files[0])
                            const data = new FormData()
                            data.append("selectedcandidate", candidateinfodata.Selected_Candidate_ID.toString())
                            data.append("detailtypeId", "0")
                            data.append("detailtype", "Pan")
                            data.append("file", k.files[0])
                            dispatch(uploaddocumentaction(data))





                        }
                        else {
                            console.log("no files uploaded yet")
                        }



                    }} />
                    <br></br>

                    {
                        selectfileobject(otherdocumentsdata, "Pan").length > 0 ?
                            <>
                                {
                                    selectfileobject(otherdocumentsdata, "Pan").map(i => (<>
                                        {i.file.split("/")[i.file.split("/").length - 1]}
                                        <i className="pi pi-download mr-2 ml-2" onClick={() => {
                                            dispatch(documentdownloadaction({
                                                "file": i.file.toString().substring(1, i.file.length)
                                            }))
                                        }} style={{ cursor: "pointer", backgroundColor: "blue", padding: "4px", borderRadius: "9px", color: "white" }}> </i>
                                        <i className="pi pi-trash mr-2" style={{ cursor: "pointer", backgroundColor: "red", padding: "4px", borderRadius: "9px", color: "white" }}
                                            onClick={() => dispatch(deletedocumentaction({
                                                "fileid": i.id

                                            }))}
                                        > Delete</i>
                                    </>))

                                }

                            </>
                            : <>
                            </>


                    }
                </div>
                <div className="field col-12 md:col-4">
                    Aadhar
                    <FileUpload disabled={selectfileobject(otherdocumentsdata, "Aadhar").length > 0} className='p-success' mode="basic" name="demo[]" maxFileSize={1000000} auto chooseLabel="upload File" onSelect={k => {



                        if (k.files.length > 0) {



                            console.log(k.files[0])
                            const data = new FormData()
                            data.append("selectedcandidate", candidateinfodata.Selected_Candidate_ID.toString())
                            data.append("detailtypeId", "0")
                            data.append("detailtype", "Aadhar")
                            data.append("file", k.files[0])
                            dispatch(uploaddocumentaction(data))





                        }
                        else {
                            console.log("no files uploaded yet")
                        }



                    }} />
                    <br></br>

                    {
                        selectfileobject(otherdocumentsdata, "Aadhar").length > 0 ?
                            <>
                                {
                                    selectfileobject(otherdocumentsdata, "Aadhar").map(i => (<>
                                        {i.file.split("/")[i.file.split("/").length - 1]}
                                        <i className="pi pi-download mr-2 ml-2" onClick={() => {
                                            dispatch(documentdownloadaction({
                                                "file": i.file.toString().substring(1, i.file.length)
                                            }))
                                        }} style={{ cursor: "pointer", backgroundColor: "blue", padding: "4px", borderRadius: "9px", color: "white" }}> </i>
                                        <i className="pi pi-trash mr-2" style={{ cursor: "pointer", backgroundColor: "red", padding: "4px", borderRadius: "9px", color: "white" }}
                                            onClick={() => dispatch(deletedocumentaction({
                                                "fileid": i.id

                                            }))}
                                        > Delete</i>
                                    </>))

                                }

                            </>
                            : <>
                            </>


                    }

                </div>
                <div className="field col-12 md:col-4">
                    Passport
                    <FileUpload disabled={selectfileobject(otherdocumentsdata, "Passport").length > 0} className='p-success' mode="basic" name="demo[]" maxFileSize={1000000} auto chooseLabel="upload File" onSelect={k => {



                        if (k.files.length > 0) {



                            console.log(k.files[0])
                            const data = new FormData()
                            data.append("selectedcandidate", candidateinfodata.Selected_Candidate_ID.toString())
                            data.append("detailtypeId", "0")
                            data.append("detailtype", "Passport")
                            data.append("file", k.files[0])
                            dispatch(uploaddocumentaction(data))





                        }
                        else {
                            console.log("no files uploaded yet")
                        }



                    }} />
                    <br></br>




                    {
                        selectfileobject(otherdocumentsdata, "Passport").length > 0 ?
                            <>
                                {
                                    selectfileobject(otherdocumentsdata, "Passport").map(i => (<>
                                        {i.file.split("/")[i.file.split("/").length - 1]}
                                        <i className="pi pi-download mr-2 ml-2" onClick={() => {
                                            dispatch(documentdownloadaction({
                                                "file": i.file.toString().substring(1, i.file.length)
                                            }))
                                        }} style={{ cursor: "pointer", backgroundColor: "blue", padding: "4px", borderRadius: "9px", color: "white" }}> </i>
                                        <i className="pi pi-trash mr-2" style={{ cursor: "pointer", backgroundColor: "red", padding: "4px", borderRadius: "9px", color: "white" }}
                                            onClick={() => dispatch(deletedocumentaction({
                                                "fileid": i.id

                                            }))}
                                        > Delete</i>
                                    </>))

                                }

                            </>
                            : <>
                            </>


                    }
                </div>
            </div>

            <div className="p-fluid  grid">
                <div className="field col-12 md:col-4">
                    Payslips
                    <FileUpload className='p-success' mode="basic" name="demo[]" maxFileSize={1000000} auto chooseLabel="upload File" onSelect={k => {



                        if (k.files.length > 0) {



                            console.log(k.files[0])
                            const data = new FormData()
                            data.append("selectedcandidate", candidateinfodata.Selected_Candidate_ID.toString())
                            data.append("detailtypeId", "0")
                            data.append("detailtype", "Payslips")
                            data.append("file", k.files[0])
                            dispatch(uploaddocumentaction(data))





                        }
                        else {
                            console.log("no files uploaded yet")
                        }



                    }} />
                    <br></br>

                    {
                        selectfileobject(otherdocumentsdata, "Payslips").length > 0 ?
                            <>
                                {
                                    selectfileobject(otherdocumentsdata, "Payslips").map(i => (<>
                                        {i.file.split("/")[i.file.split("/").length - 1]}
                                        <i className="pi pi-download mr-2 ml-2" onClick={() => {
                                            dispatch(documentdownloadaction({
                                                "file": i.file.toString().substring(1, i.file.length)
                                            }))
                                        }} style={{ cursor: "pointer", backgroundColor: "blue", padding: "4px", borderRadius: "9px", color: "white" }}> </i>
                                        <i className="pi pi-trash mr-2" style={{ cursor: "pointer", backgroundColor: "red", padding: "4px", borderRadius: "9px", color: "white" }}
                                            onClick={() => dispatch(deletedocumentaction({
                                                "fileid": i.id

                                            }))}
                                        > Delete</i>
                                    </>))

                                }

                            </>
                            : <>
                            </>


                    }
                </div>
                <div className="field col-12 md:col-4">
                    Form16
                    <FileUpload className='p-success' mode="basic" name="demo[]" maxFileSize={1000000} auto chooseLabel="upload File" onSelect={k => {



                        if (k.files.length > 0) {



                            console.log(k.files[0])
                            const data = new FormData()
                            data.append("selectedcandidate", candidateinfodata.Selected_Candidate_ID.toString())
                            data.append("detailtypeId", "0")
                            data.append("detailtype", "Form16")
                            data.append("file", k.files[0])
                            dispatch(uploaddocumentaction(data))





                        }
                        else {
                            console.log("no files uploaded yet")
                        }



                    }} />
                    <br></br>

                    {
                        selectfileobject(otherdocumentsdata, "Form16").length > 0 ?
                            <>
                                {
                                    selectfileobject(otherdocumentsdata, "Form16").map(i => (<>
                                        {i.file.split("/")[i.file.split("/").length - 1]}
                                        <i className="pi pi-download mr-2 ml-2" onClick={() => {
                                            dispatch(documentdownloadaction({
                                                "file": i.file.toString().substring(1, i.file.length)
                                            }))
                                        }} style={{ cursor: "pointer", backgroundColor: "blue", padding: "4px", borderRadius: "9px", color: "white" }}> </i>
                                        <i className="pi pi-trash mr-2" style={{ cursor: "pointer", backgroundColor: "red", padding: "4px", borderRadius: "9px", color: "white" }}
                                            onClick={() => dispatch(deletedocumentaction({
                                                "fileid": i.id

                                            }))}
                                        > Delete</i>
                                    </>))

                                }

                            </>
                            : <>
                            </>


                    }
                </div>
                <div className="field col-12 md:col-4">
                </div>
            </div>




            <div className="p-fluid  grid">
                <div className="field col-12 md:col-4">

                </div>
                <div className="field col-12 md:col-4">

                </div>
                <div className="field col-12 md:col-4 flex">
                    <Button onClick={e => dispatch(setprevcandidateinfotab())}>Previous</Button>
                    <Button onClick={e => dispatch(setnextcandidateinfotab())}>Next</Button>
                    {/* <Button onClick={e=>console.log("")}>Save</Button> */}
                </div>
            </div>
        </div>
    )
}

export default Documents