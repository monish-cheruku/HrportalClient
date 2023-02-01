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
import { createemployementdetailsaction, deleteemployementdetailsaction, employementdetailsgetaction, updateemployementdetailsaction } from '../../../features/Candidate info/employementdetailsslice'
import { deletedocumentaction, documentdownloadaction, uploaddocumentaction } from '../../../features/Candidate info/candidateinfoslice'
import { FileUpload } from 'primereact/fileupload'


function Employement() {
  const dispatch = useDispatch()
  const [modalDialog, setModaldialog] = useState(false);
  const [editmode, setEditmode] = useState(false);
  const candidateinfodata = useSelector((state: RootState) => state.candidateinfo)
  const [tempdata, settempdata] = useState<any>({})
  const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
  const employmentdetailsdata = useSelector((state: RootState) => state.employementdetails)
  useEffect(() => {
    dispatch(employementdetailsgetaction(
      {
        "selectedcandidateid": candidateinfodata.Selected_Candidate_ID

      }
    ))
    console.log("employmentdetailsdata ")
  }, [])

  // const isFormFieldValid = (meta) => !!(meta.touched && meta.error);


  const getFormErrorMessage = (meta) => {
    return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
  };
  const validate=(values)=>{
    const arr=["PreviousCompanyName","PreviousCompanyAddress","Start_Date","End_Date","Designationonjoining","Designationonleaving"]
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
      <Button onClick={e => setModaldialog(true)}>Add Employment Details</Button>
      <Dialog visible={modalDialog} style={{ width: "450px" }} header={editmode ? "Edit  Information " : "Add  Information "} modal className="p-fluid" onHide={() => setModaldialog(false)}>

        <Form
          onSubmit={(values: any) => {
            var datetempstart = new Date(values.Start_Date)
            // console.log(datetemp.getFullYear() + "-" + datetemp.getMonth() + "-" + datetemp.getDate())
            values.Start_Date = datetempstart.getFullYear() + "-" + (datetempstart.getMonth() + 1).toString().padStart(2, '0') + "-" + datetempstart.getDate().toString().padStart(2, '0')
            var datetempend = new Date(values.End_Date)
            // console.log(datetemp.getFullYear() + "-" + datetemp.getMonth() + "-" + datetemp.getDate())
            values.End_Date = datetempend.getFullYear() + "-" + (datetempend.getMonth() + 1).toString().padStart(2, '0') + "-" + datetempend.getDate().toString().padStart(2, '0')


            values.selectedcandidateid = candidateinfodata.Selected_Candidate_ID
            console.log(values)
            if (!editmode) {
              dispatch(createemployementdetailsaction(values))
              setModaldialog(false)
            }
            else {
              dispatch(updateemployementdetailsaction(values))
              setEditmode(false)
              settempdata(undefined)
              setModaldialog(false)

            }
          }}
          initialValues={!editmode ? {} : {
            id: tempdata.id,
            PreviousCompanyName: tempdata.PreviousCompanyName,
            PreviousCompanyAddress: tempdata.PreviousCompanyAddress,
            Designationonjoining: tempdata.Designationonjoining,
            Designationonleaving: tempdata.Designationonleaving,
            Start_Date: tempdata.Start_Date,
            End_Date: tempdata.End_Date,
          }}
          // initialValues={{}}

          validate={validate}

          render={({ handleSubmit, values, submitting,
            submitError,
            invalid,
            pristine,
            initialValues = {},
            dirtySinceLastSubmit, }) => (
            <form onSubmit={handleSubmit} >

              <br></br>
              <div className="p-fluid  grid">
                <div className="field col-12 md:col-6">
                  <Field
                    name="PreviousCompanyName"
                    render={({ input, meta }) => (
                      <div className="field">
                        <label htmlFor="PreviousCompanyName">Previous Company Name</label>
                        <span className="column">
                          <InputText maxLength={50} id="PreviousCompanyName" {...input} className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                          <label htmlFor="PreviousCompanyName" className={classNames({ "p-error": isFormFieldValid(meta) })}></label>                        </span>
                        {getFormErrorMessage(meta)}
                      </div>
                    )}
                  />
                </div>

                <div className="field col-12 md:col-6">
                  <Field
                    name="PreviousCompanyAddress"
                    render={({ input, meta }) => (
                      <div className="field fluid">
                        <label htmlFor="PreviousCompanyAddress">Previous Company Address</label>
                        <span className="field fluid">
                          <InputText maxLength={50} id="PreviousCompanyAddress" {...input} className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                          <label htmlFor="PreviousCompanyAddress" className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                        </span>
                        {getFormErrorMessage(meta)}
                      </div>
                    )}
                  />
                </div>
                <div className="field col-12 md:col-6">
                  <Field
                    name="Start_Date"
                    render={({ input, meta }) => (
                      <div className="field fluid">
                        <label htmlFor="Start_Date">Date of Joining</label>
                        <span className="field fluid">
                          <Calendar id="Start_Date" {...input} dateFormat="mm/dd/yy" mask="99/99/9999" showIcon placeholder="Select Date of Joining" value={new Date(values["Start_Date"])} className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                        </span>
                        {getFormErrorMessage(meta)}
                      </div>
                    )}
                  />
                </div>

                <div className="field col-12 md:col-6">

                  <Field
                    name="End_Date"
                    render={({ input, meta }) => (
                      <div className="field fluid">
                        <label htmlFor="End_Date">Date Of Completion</label>
                        <span className="field fluid">
                          <Calendar id="End_Date" {...input} dateFormat="mm/dd/yy" mask="99/99/9999" showIcon placeholder="Select Date Of Completion" value={new Date(values["End_Date"])} className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                        </span>
                        {getFormErrorMessage(meta)}
                      </div>
                    )}
                  />
                </div>

                <div className="field col-12 md:col-11">
                  <Field
                    name="Designationonjoining"
                    render={({ input, meta }) => (
                      <div className="field fluid">
                        <label htmlFor="Designationonjoining">Designation on Joining</label>
                        <span className="field fluid">
                          <InputText maxLength={50} id="Designationonjoining" {...input} className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                          <label htmlFor="Designationonjoining" className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                        </span>
                        {getFormErrorMessage(meta)}
                      </div>
                    )}
                  />
                  <br>
                  </br>
                  <Field
                    name="Designationonleaving"
                    render={({ input, meta }) => (
                      <div className="field fluid">
                        <label htmlFor="Designationonleaving">Designation on Leaving </label>
                        <span className="field fluid">
                          <InputText maxLength={50} id="Designationonleaving" {...input} className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                          <label htmlFor="Designationonleaving" className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                        </span>
                        {getFormErrorMessage(meta)}
                      </div>
                    )}
                  />


                </div>
              </div>
              <div className="p-fluid  grid">
                <div className="field col-12 md:col-6">

                  <Button type='button' onClick={e => setModaldialog(false)}>Cancel</Button>
                </div>
                <div className="field col-12 md:col-6">
                  <Button type='submit'> Save</Button>
                </div>
              </div>

            </form>


          )}
        />
      </Dialog>
      <br></br>

      <div >
        {employmentdetailsdata ? employmentdetailsdata.map((e) => <div >
          <Card>
            <div className="p-fluid  grid" style={{ backgroundColor: "lightblue" }}>
              <div className="field col-12 md:col-12 flex" >
                <br></br>

                <h2> <i className="pi pi-pencil mr-2" style={{ cursor: "pointer", backgroundColor: "blue", padding: "4px", borderRadius: "9px", color: "white" }}

                  onClick={() => { setEditmode(true); settempdata(e); setModaldialog(true); }}
                > Edit Info</i>
                  <i className="pi pi-trash mr-2" style={{ cursor: "pointer", backgroundColor: "red", padding: "4px", borderRadius: "9px", color: "white" }}
                    onClick={() => dispatch(deleteemployementdetailsaction({
                      "id": e.id

                    }))}
                  > Delete</i>
                  <FileUpload className='p-success' mode="basic" name="demo[]" maxFileSize={1000000} auto chooseLabel="upload File" onSelect={k => {



                    if (k.files.length > 0) {



                      console.log(k.files[0])
                      const data = new FormData()
                      data.append("selectedcandidate", candidateinfodata.Selected_Candidate_ID.toString())
                      data.append("detailtypeId", e.id.toString())
                      data.append("detailtype", "Employment")
                      data.append("file", k.files[0])
                      dispatch(uploaddocumentaction(data))





                    }
                    else {
                      console.log("no files uploaded yet")
                    }



                  }} />
                </h2>
                {/* <Button style={{ width: "120px", height: "50px" }} className="btn btn-primary" onClick={() => { setEditmode(true); settempdata(e); setModaldialog(true); }}>edit</Button> */}
                <br></br>
                {/* Qualification:{e.Qualification} */}
                <br>
                </br>
                Previous Company Name : {e.PreviousCompanyName}
                <br>
                </br>
                Previous Company Address:{e.PreviousCompanyAddress}
                <br>
                </br>
                Start Date : {e.Start_Date}
                <br>
                </br>
                End Date : {e.End_Date}
                <br>
                </br>
                Designation on joining : {e.Designationonjoining}
                <br>
                </br>
                Designation on leaving : {e.Designationonleaving}
                <br>
                </br>

              </div>
            </div>
            <div className="p-fluid  grid">
              <div className="field col-12 md:col-12 flex" >


                {e.files.length > 0 ?
                  e.files.map((f) => (<div onClick={() => console.log(f.file)} style={{ border: "2px solid blue", padding: "4px", margin: "4px", borderRadius: "10px", backgroundColor: "burlywood", height: "30px" }}>

                    {f.file.split("/")[f.file.split("/").length - 1].toString()}
                    <i className="pi pi-download mr-2 ml-2" onClick={() => {
                      dispatch(documentdownloadaction({
                        "file": f.file.toString().substring(1, f.file.length)
                      }))
                    }} style={{ cursor: "pointer", backgroundColor: "blue", padding: "4px", borderRadius: "9px", color: "white" }}> </i>
                    <i className="pi pi-trash mr-2 ml-2" style={{ cursor: "pointer", backgroundColor: "red", padding: "4px", borderRadius: "9px", color: "white" }}
                      onClick={() => {
                        dispatch(deletedocumentaction({
                          "fileid": f.id
                        }))
                      }}
                    > </i>

                  </div>)) :
                  <div>
                  </div>



                }


              </div>
            </div>
          </Card>
          <br></br>




        </div>)
          : <></>
        }
      </div>


      <div className="p-fluid  grid">

        <div className="field col-12 md:col-4 flex">
          <Button onClick={e => dispatch(setprevcandidateinfotab("lkdjf"))}>Previous</Button>
          <Button onClick={e => dispatch(setnextcandidateinfotab())}>Next</Button>
        </div>
      </div>
    </div>
  )
}

export default Employement