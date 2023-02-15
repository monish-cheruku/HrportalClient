import { Button } from 'primereact/button'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setnextcandidateinfotab, setprevcandidateinfotab } from '../../../features/Misc/globalslice'
import { Field, Form } from 'react-final-form'
import { otherdocumentsgetaction } from '../../../features/Candidate info/otherdocumentsslice'
import { RootState } from '../../../app/store'
import { deleteedducationaldetailsaction } from '../../../features/Candidate info/educationdetailsslice'
import { deletedocumentaction, documentdownloadaction, uploaddocumentaction } from '../../../features/Candidate info/candidateinfoslice'
import { FileUpload } from 'primereact/fileupload'
import { Panel, PanelHeaderTemplateOptions } from 'primereact/panel'
import { RenderErrorBoundary } from 'react-router/dist/lib/hooks'
function Documents() {
    const dispatch = useDispatch()
    const candidateinfodata = useSelector((state: RootState) => state.candidateinfo)
    const otherdocumentsdata = useSelector((state: RootState) => state.otherdocuments)
    const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
    const Logindata = useSelector((state: RootState) => state.Login);
    const [roles, setRoles] = useState<any>([]);


    const getFormErrorMessage = (meta) => {
        return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
    };
    useEffect(() => {
        var w: any = []
        // Logindata.groups.forEach((i) => w.push(i["name"].toString()))
        Logindata.groups.forEach((i) => setRoles(roles => [...roles, i["name"].toString()]))
        dispatch(otherdocumentsgetaction({
            "selectedcandidateid": candidateinfodata.Selected_Candidate_ID
        }))
        console.log(otherdocumentsdata)
    }, [])

    const selectfileobject = (otherdocumentsdata, s) => {
        // console.log(otherdocumentsdata)
        return otherdocumentsdata.filter((i) => i.detailtype == s)

    }
    const chooseOptions = { icon: 'pi pi-fw pi-cloud-upload', iconOnly: true, className: 'custom-upload-btn p-button-success p-button-rounded ' };
    const photoheadertemplate = (options: PanelHeaderTemplateOptions) => {
        const className = `${options.className} justify-content`;
        const titleClassName = `${options.titleClassName} pl-1`;

        return (
            <div className={className}>

                <span className={titleClassName}>
                    <h4>
                        Photograph<span style={{ color: "red" }}>*</span>
                    </h4>
                </span>
                <FileUpload style={{}} disabled={selectfileobject(otherdocumentsdata, "Photograph").length > 0} chooseOptions={chooseOptions} className='p-success fileuplod2 mr-2' mode="basic" name="demo[]" chooseLabel='abc' maxFileSize={1000000} auto onSelect={k => {


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

                }} /></div>
        )

    }
    const passportheadertemplate = (options: PanelHeaderTemplateOptions) => {
        const className = `${options.className} justify-content`;
        const titleClassName = `${options.titleClassName} pl-1`;

        return (
            <div className={className}>

                <span className={titleClassName}>
                    <h4>
                        Passport
                    </h4>
                </span>
                <FileUpload disabled={selectfileobject(otherdocumentsdata, "Passport").length > 0} chooseOptions={chooseOptions} className='p-success fileuplod2 ' mode="basic" name="demo[]" maxFileSize={1000000} auto chooseLabel="upload File" onSelect={k => {

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

            </div>
        )

    }
    const panheadertemplate = (options: PanelHeaderTemplateOptions) => {
        const className = `${options.className} justify-content`;
        const titleClassName = `${options.titleClassName} pl-1`;

        return (
            <div className={className}>

                <span className={titleClassName}>
                    <h4>
                        Pan<span style={{ color: "red" }}>*</span>
                    </h4>
                </span>
                <FileUpload disabled={selectfileobject(otherdocumentsdata, "Pan").length > 0} chooseOptions={chooseOptions} className='p-success fileuplod2 mr-2' mode="basic" name="demo[]" maxFileSize={1000000} auto chooseLabel="upload File" onSelect={k => {

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

            </div>
        )

    }
    const payslipsheadertemplate = (options: PanelHeaderTemplateOptions) => {
        const className = `${options.className} justify-content`;
        const titleClassName = `${options.titleClassName} pl-1`;

        return (
            <div className={className}>

                <span className={titleClassName}>
                    <h4>
                        Payslips
                    </h4>
                </span>
                <FileUpload chooseOptions={chooseOptions} className='p-success fileuplod2 mr-2' mode="basic" name="demo[]" maxFileSize={1000000} auto chooseLabel="upload File" onSelect={k => {

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

            </div>
        )

    }
    const Form16headertemplate = (options: PanelHeaderTemplateOptions) => {
        const className = `${options.className} justify-content`;
        const titleClassName = `${options.titleClassName} pl-1`;

        return (
            <div className={className}>

                <span className={titleClassName}>
                    <h4>
                        Form16
                    </h4>
                </span>
                <FileUpload chooseOptions={chooseOptions} className='p-success fileuplod2 mr-2' mode="basic" name="demo[]" maxFileSize={1000000} auto chooseLabel="upload File" onSelect={k => {

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

            </div>
        )

    }
    const aadharheadertemplate = (options: PanelHeaderTemplateOptions) => {
        const className = `${options.className} justify-content`;
        const titleClassName = `${options.titleClassName} pl-1`;

        return (
            <div className={className}>

                <span className={titleClassName}>
                    <h4>
                        Aadhar<span style={{ color: "red" }}>*</span>
                    </h4>
                </span>
                <FileUpload disabled={selectfileobject(otherdocumentsdata, "Aadhar").length > 0} chooseOptions={chooseOptions} className='p-success fileuplod2 mr-2' mode="basic" name="demo[]" maxFileSize={1000000} auto chooseLabel="upload File" onSelect={k => {

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

            </div>
        )

    }
    return (
        <div>
            <style>{`
            // .p-fluid .p-fileupload .p-button {
            //     width: 50px;
            // }
            
        
            #star {
                font-size:4px;
                color: red;
                /* Some sort of border */
                text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
              }
          
             .fileshow{
                justify-content: space-between;
                display:flex;
             }
            
            `}

            </style>
            <br>
            </br>
            <br></br>
            <div className="p-fluid  grid">
                <div className="field col-12 md:col-6">
                    <Panel headerTemplate={photoheadertemplate}>


                        {
                            selectfileobject(otherdocumentsdata, "Photograph").length > 0 ?
                                <>
                                    {
                                        selectfileobject(otherdocumentsdata, "Photograph").map(i => (<div className="fileshow">
                                            {i.file.split("/")[i.file.split("/").length - 1]}
                                            <div>

                                            <i className="pi pi-download mr-2 ml-2" onClick={() => {
                                                dispatch(documentdownloadaction({
                                                    "file": i.file.toString().substring(1, i.file.length)
                                                }))
                                            }} style={{ cursor: "pointer", backgroundColor: "blue", padding: "4px", borderRadius: "4px", color: "white" }}> </i>
                                            <i className="pi pi-trash mr-2" style={{ cursor: "pointer", backgroundColor: "red", padding: "4px", borderRadius: "4px", color: "white" }}
                                                onClick={() => dispatch(deletedocumentaction({
                                                    "fileid": i.id

                                                }))}
                                            > </i>
                                            </div>
                                        </div>))

                                    }

                                </>
                                : <>
                                    No file Uploaded
                                </>


                        }
                    </Panel>
                </div>
                </div>
            <div className="p-fluid  grid">
                <div className="field col-12 md:col-6">
                    <Panel headerTemplate={photoheadertemplate}>


                        {
                            selectfileobject(otherdocumentsdata, "Photograph").length > 0 ?
                                <>
                                    {
                                        selectfileobject(otherdocumentsdata, "Photograph").map(i => (<div className="fileshow">
                                            {i.file.split("/")[i.file.split("/").length - 1]}
                                            <div>

                                            <i className="pi pi-download mr-2 ml-2" onClick={() => {
                                                dispatch(documentdownloadaction({
                                                    "file": i.file.toString().substring(1, i.file.length)
                                                }))
                                            }} style={{ cursor: "pointer", backgroundColor: "blue", padding: "4px", borderRadius: "4px", color: "white" }}> </i>
                                            <i className="pi pi-trash mr-2" style={{ cursor: "pointer", backgroundColor: "red", padding: "4px", borderRadius: "4px", color: "white" }}
                                                onClick={() => dispatch(deletedocumentaction({
                                                    "fileid": i.id

                                                }))}
                                            > </i>
                                            </div>
                                        </div>))

                                    }

                                </>
                                : <>
                                    No file Uploaded
                                </>


                        }
                    </Panel>
                </div>
                <div className="field col-12 md:col-6">
                    <Panel headerTemplate={passportheadertemplate}>

                        {
                            selectfileobject(otherdocumentsdata, "Passport").length > 0 ?
                                <>
                                    {
                                        selectfileobject(otherdocumentsdata, "Passport").map(i => (<div className='fileshow'>
                                       
                                            {i.file.split("/")[i.file.split("/").length - 1]}
                                            <span className=''>

                                                <i className="pi pi-download mr-2 ml-2" onClick={() => {
                                                    dispatch(documentdownloadaction({
                                                        "file": i.file.toString().substring(1, i.file.length)
                                                    }))
                                                }} style={{ cursor: "pointer", backgroundColor: "blue", padding: "4px", borderRadius: "4px", color: "white" }}> </i>
                                                <i className="pi pi-trash mr-2" style={{ cursor: "pointer", backgroundColor: "red", padding: "4px", borderRadius: "4px", color: "white" }}
                                                    onClick={() => dispatch(deletedocumentaction({
                                                        "fileid": i.id

                                                    }))}
                                                > </i>

                                            </span>
                                        </div>))

                                    }

                                </>
                                : <>
                                    No file Uploaded
                                </>


                        }

                    </Panel>
                </div>
            </div>
            <div className="p-fluid  grid">
                <div className="field col-12 md:col-6">
                    <Panel headerTemplate={panheadertemplate}>

                        {
                            selectfileobject(otherdocumentsdata, "Pan").length > 0 ?
                                <>
                                    {
                                        selectfileobject(otherdocumentsdata, "Pan").map(i => (<div className="fileshow">
                                            {i.file.split("/")[i.file.split("/").length - 1]}
                                            <div>
                                            <i className="pi pi-download mr-2 ml-2" onClick={() => {
                                                dispatch(documentdownloadaction({
                                                    "file": i.file.toString().substring(1, i.file.length)
                                                }))
                                            }} style={{ cursor: "pointer", backgroundColor: "blue", padding: "4px", borderRadius: "4px", color: "white" }}> </i>
                                            <i className="pi pi-trash mr-2" style={{ cursor: "pointer", backgroundColor: "red", padding: "4px", borderRadius: "4px", color: "white" }}
                                                onClick={() => dispatch(deletedocumentaction({
                                                    "fileid": i.id

                                                }))}
                                            > </i>
                                            </div>
                                        </div>))

                                    }

                                </>
                                : <>
                                    No file Uploaded
                                </>
                        }
                    </Panel>
                </div>
                <div className="field col-12 md:col-6">
                    <Panel headerTemplate={aadharheadertemplate}>


                        {
                            selectfileobject(otherdocumentsdata, "Aadhar").length > 0 ?
                                <>
                                    {
                                        selectfileobject(otherdocumentsdata, "Aadhar").map(i => (<div className='fileshow'>
                                            {i.file.split("/")[i.file.split("/").length - 1]}
                                            <div>
                                            <i className="pi pi-download mr-2 ml-2" onClick={() => {
                                                dispatch(documentdownloadaction({
                                                    "file": i.file.toString().substring(1, i.file.length)
                                                }))
                                            }} style={{ cursor: "pointer", backgroundColor: "blue", padding: "4px", borderRadius: "4px", color: "white" }}> </i>
                                            <i className="pi pi-trash mr-2" style={{ cursor: "pointer", backgroundColor: "red", padding: "4px", borderRadius: "4px", color: "white" }}
                                                onClick={() => dispatch(deletedocumentaction({
                                                    "fileid": i.id

                                                }))}
                                            > </i></div>
                                        </div>))

                                    }

                                </>
                                : <>
                                    No file Uploaded
                                </>


                        }
                    </Panel>
                </div>
                <div className="field col-12 md:col-6">

                </div>
            </div>

            <div className="p-fluid  grid">
                <div className="field col-12 md:col-6">
                    <Panel headerTemplate={payslipsheadertemplate}>


                        {
                            selectfileobject(otherdocumentsdata, "Payslips").length > 0 ?
                                <div className="p-fluid ">

                                    {
                                        selectfileobject(otherdocumentsdata, "Payslips").map(i => (<div className="field row-12 md:row-12 flex fileshow">
                                            {i.file.split("/")[i.file.split("/").length - 1]}
                                            <div>
                                            <i className="pi pi-download mr-2 ml-2" onClick={() => {
                                                dispatch(documentdownloadaction({
                                                    "file": i.file.toString().substring(1, i.file.length)
                                                }))
                                            }} style={{ cursor: "pointer", backgroundColor: "blue", padding: "4px", borderRadius: "4px", color: "white" }}> </i>
                                            <i className="pi pi-trash mr-2" style={{ cursor: "pointer", backgroundColor: "red", padding: "4px", borderRadius: "4px", color: "white" }}
                                                onClick={() => dispatch(deletedocumentaction({
                                                    "fileid": i.id

                                                }))}
                                            > </i>
                                        <br />
                                        </div>
                                        
                                        </div>))

                                    }

                                </div>
                                : <>
                                    No files Uploaded
                                </>


                        }
                    </Panel>
                </div>
                <div className="field col-12 md:col-6">
                    <Panel headerTemplate={Form16headertemplate}>


                        {
                            selectfileobject(otherdocumentsdata, "Form16").length > 0 ?
                                <>
                                    {
                                        selectfileobject(otherdocumentsdata, "Form16").map(i => (<div className='field row-12 md:row-12 flex fileshow'>
                                            {i.file.split("/")[i.file.split("/").length - 1]}
                                            <div>
                                            <i className="pi pi-download mr-2 ml-2" onClick={() => {
                                                dispatch(documentdownloadaction({
                                                    "file": i.file.toString().substring(1, i.file.length)
                                                }))
                                            }} style={{ cursor: "pointer", backgroundColor: "blue", padding: "4px", borderRadius: "4px", color: "white" }}> </i>
                                            <i className="pi pi-trash mr-2" style={{ cursor: "pointer", backgroundColor: "red", padding: "4px", borderRadius: "4px", color: "white" }}
                                                onClick={() => dispatch(deletedocumentaction({
                                                    "fileid": i.id

                                                }))}
                                            > </i>
                                            </div>
                                        </div>))

                                    }

                                </>
                                : <>
                                    No files Uploaded
                                </>


                        }
                    </Panel>
                </div>




                <div className="field col-12 md:col-6">
                </div>
            </div>




            <div className="p-fluid  grid">

                <div className="field col-12 md:col-4 flex">
                </div>
                <div className="field col-12 md:col-4 flex">
                </div>

                <div className="field col-12 md:col-4 flex gap-4">
                    <Button className='mr-4' onClick={e => dispatch(setprevcandidateinfotab())}>Previous</Button>
                   {!(roles.includes("HR")||roles.includes("Adminstrator")) ?<Button onClick={e => dispatch(setnextcandidateinfotab())}>Next</Button>:<></>}
                </div>
            </div>
        </div>
    )
}

export default Documents