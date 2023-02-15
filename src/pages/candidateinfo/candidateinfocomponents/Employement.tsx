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
import { FilterMatchMode } from 'primereact/api'
import { SelectButton } from 'primereact/selectbutton'
import { Panel, PanelHeaderTemplateOptions } from 'primereact/panel'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { InputTextarea } from 'primereact/inputtextarea'


function Employement() {
  const dispatch = useDispatch()
  const [modalDialog, setModaldialog] = useState(false);
  const [editmode, setEditmode] = useState(false);
  const [gridview, setgridview] = useState("grid")
  const [globalFilterValue2, setGlobalFilterValue2] = useState("");
  const [filters2, setFilters2] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
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
  const validate = (values) => {
    const arr = ["PreviousCompanyName", "PreviousCompanyAddress", "Start_Date", "End_Date", "Designationonjoining", "Designationonleaving"]
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

  const onGlobalFilterChange2 = (e: any) => {
    const value = e.target.value;
    let _filters2 = { ...filters2 };
    _filters2["global"].value = value;

    setFilters2(_filters2);
    setGlobalFilterValue2(value);
  };
  const Headercomp = () => {
    return (
      <div
        className="flex flex-column md:flex-row md:justify-content-between md:align-items-center"
      // className="flex justify-content-between"
      >

        {/* <Toolbar
    //  className="mb-4"
     left={leftToolbarTemplate}
     right={rightToolbarTemplate}
   >
     {" "}
   </Toolbar> */}

        <span style={{ width: "30%" }}></span>
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText value={globalFilterValue2} onChange={onGlobalFilterChange2} placeholder="Keyword Search" />
        </span>


      </div>
    );
  };
  const filestemplate=(rowdata)=>{
    const rowfiles=rowdata.files
    const no:number=rowdata.files?rowdata.files.length:0
    if (no>0)
    return(
      <div style={{overflowY: "scroll",height: "70px"}}>{
            rowdata.files.map((f) => (
                <div className='field row-12 md:row-12 flex' onClick={() => console.log(f.file)} style={{ border: "2px solid blue", padding: "4px", margin: "4px", borderRadius: "10px", backgroundColor: "#C1C2F3", height: "30px" }}>

                    {f.file.split("/")[f.file.split("/").length - 1].toString().length < 20 ? f.file.split("/")[f.file.split("/").length - 1] : f.file.split("/")[f.file.split("/").length - 1].substring(0, 20) + "..."}
                    <i className="pi pi-download mr-2 ml-2" onClick={() => {
                        dispatch(documentdownloadaction({
                            "file": f.file.toString().substring(1, f.file.length)
                        }))
                    }} style={{ cursor: "pointer", backgroundColor: "blue", padding: "4px", borderRadius: "4px", color: "white" }}> </i>
                    <i className="pi pi-trash mr-2 ml-2" style={{ cursor: "pointer", backgroundColor: "red", padding: "4px", borderRadius: "4px", color: "white" }}
                        onClick={() => {
                            dispatch(deletedocumentaction({
                                "fileid": f.id
                            }))
                        }}
                    > </i>

                </div>
            ))
                    }
            </div>
    )
}
  const formatstartDate = (rowdata:any) => {
    return new Date(rowdata.Start_Date).toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
  }
const formatendDate = (rowdata:any) => {
    return new Date(rowdata.End_Date).toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
  }
  const formatDate = (value: any) => {
    return value.toLocaleDateString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    // return value.toLocaleDateString('en-US');
  }
  const gridviewoptions = ['grid', 'table'];
  const template = (options: PanelHeaderTemplateOptions) => {

    const className = `${options.className} justify-content`;
    const titleClassName = `${options.titleClassName} pl-1`;

    return (
      <div className={className}>

        <span className={titleClassName}>
          <h4>
            Employement details
          </h4>
        </span>
        <SelectButton value={gridview} options={gridviewoptions} onChange={(e) => setgridview(e.value)} />
        <Button className='' style={{}} onClick={e => { setEditmode(false); setModaldialog(true) }}>Add </Button>            </div>
    )
  }
  const actionBodyTemplate=(rowdata)=>{
    return (
<div className=" flex gap-2">
                                <Button className="p-button-info editbutton mr-2" style={{ height: "40px", width: "4.4rem" }} label="" icon="pi pi-pencil" onClick={() => { setEditmode(true); settempdata(rowdata); setModaldialog(true); }}></Button>


                                <FileUpload emptyTemplate={emptytemplate} style={{}} chooseOptions={chooseOptions} className='p-success mr-2' mode="basic" name="demo[]" chooseLabel='abc' maxFileSize={1000000} auto onSelect={k => {



                                    if (k.files.length > 0) {



                                        console.log(k.files[0])
                                        const data = new FormData()
                                        data.append("selectedcandidate", candidateinfodata.Selected_Candidate_ID.toString())
                                        data.append("detailtypeId", rowdata.id.toString())
                                        data.append("detailtype", "Employment")
                                        data.append("file", k.files[0])
                                        dispatch(uploaddocumentaction(data))





                                    }
                                    else {
                                        console.log("no files uploaded yet")
                                    }



                                }} />
                                <Button style={{ height: "40px", width: "4.4rem" }}  icon="pi pi-trash" className="p-button-danger" onClick={() => dispatch(deleteemployementdetailsaction({
                                    "id": rowdata.id

                                }))} />

                            </div>


    )
}
  const chooseOptions = { icon: 'pi pi-fw pi-cloud-upload', iconOnly: true, className: 'custom-upload-btn p-button-success' };

  const emptytemplate = () => {
    return (
      <>abcd</>
    )


  }
  return (
    <div>
      <style>{`
            .card-header{
                text-align:center;
                width:100%;
                align-self:center;
                color: #7659E2  ;
                vertical-align:top;
            }
            .card-header.h3{
                // text-align:center
            }
            .card1content{
                border-radius: 5px;
                background: rgba(255,255,255,0.40);
            }
            .card-body{
                margin-left:5px;
            }
           .qualification{
            width:100%;
            // background: linear-gradient(180deg, #005bea 0%, #00c6fb 100%);
           
           }
          
            .card1{
                   
                   
                // background: linear-gradient(-52deg, #155dce 0%, #2de3b0 100%);
                // background:  linear-gradient(-50deg, #155dce 0%, #2de3b0 100%);
                background:  #c1c2f3;;
                    background-blend-mode: normal;
                    border-radius:8px;
                    // width:300px
                    
               color:white;
            }
            .card1:hover{
                scale:1.1;
                transition:  1s;
                
            }
           
            .card-body.p{
                color:white
            }
            .filesarea{
                border:2px dashed #7b2cbf;
                overflow-y: scroll;
                height: 80px;
              
                background-color: #eeeeee;
            }
            .nofiles{
                display: flex;
                align-self: center;
                color:"gray"
            }
.fileuplod2{
    font:40px;
}
.p-fluid .p-fileupload .p-button {
    Height: 35px;
    width: 3.5rem;
    font-size:40px;
}

#contained-button-file{
    display: 'flex',
    margin: 'auto',
    width: 400,
    flexWrap: 'wrap',
    background:#ffeeee;
}
.p-card .p-card-content {
    padding:  0rem; 
}
            `}</style>
      <Panel headerTemplate={template}>

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
                          <label htmlFor="PreviousCompanyName">Company Name*</label>
                          <span className="column">
                            <InputText maxLength={50} id="PreviousCompanyName" {...input} className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                            <label htmlFor="PreviousCompanyName" className={classNames({ "p-error": isFormFieldValid(meta) })}></label>                        </span>
                          {getFormErrorMessage(meta)}
                        </div>
                      )}
                    />
                  </div>

                  <div className="field col-12 md:col-10">
                    <Field
                      name="PreviousCompanyAddress"
                      render={({ input, meta }) => (
                        <div className="field fluid">
                          <label htmlFor="PreviousCompanyAddress">Company Address*</label>
                          <span className="field fluid">
                            <InputTextarea maxLength={200} id="PreviousCompanyAddress"  {...input} className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
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
                          <label htmlFor="Start_Date">Start Date*</label>
                          <span className="field fluid">
                            <Calendar id="Start_Date" {...input} dateFormat="mm/dd/yy" mask="99/99/9999"  maxDate={new Date(values["End_Date"])}  showIcon placeholder="Select Date of Joining" value={new Date(values["Start_Date"])} className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
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
                          <label htmlFor="End_Date">End Date* </label>
                          <span className="field fluid">
                            <Calendar id="End_Date" {...input} dateFormat="mm/dd/yy" mask="99/99/9999"  minDate={new Date(values["Start_Date"])} showIcon placeholder="Select Date Of Completion" value={new Date(values["End_Date"])} className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
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
                          <label htmlFor="Designationonjoining">Designation on Joining*</label>
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
                          <label htmlFor="Designationonleaving">Designation on Leaving* </label>
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

        <div className='grid' style={gridview == "grid" ? { display: "flex" } : { display: "block" }}>
          {gridview == "grid"&& employmentdetailsdata.length==0&&<div className='flex text-align-center'> No Data</div>}
          {gridview == "grid" ? employmentdetailsdata.map((e) => <div className='lg:col-3 md:col-6 sm:col-2 gap-4' key={e.id.toString()}>
            <Card className='card1 margin-auto'>

              <div className="p-fluid  grid card1content">
                <div className="card-header">
                  <h4 className="Company">{e.PreviousCompanyName}</h4>
                </div>
                <div className="card-body">
                  <p className="date-range"> Duration : {formatDate(new Date(e.Start_Date))} to {formatDate(new Date(e.End_Date))}</p>
                  <p className="specialization"> Address : {e.PreviousCompanyAddress}</p>
                  <p className="institution">Designation on joining : {e.Designationonjoining}</p>
                  <p className="institution">Designation on leaving : {e.Designationonleaving}</p><br/>

                </div>

                <br></br>


              </div>

              <div className="p-fluid  grid filesarea" style={{}}>



                {e.files.length > 0 ?
                  e.files.map((f) => (
                    <div className='field row-12 md:row-12 flex' onClick={() => console.log(f.file)} style={{ border: "2px solid blue", padding: "4px", margin: "4px", borderRadius: "10px", backgroundColor: "#C1C2F3", height: "30px" }}>

                      {f.file.split("/")[f.file.split("/").length - 1].toString().length < 20 ? f.file.split("/")[f.file.split("/").length - 1] : f.file.split("/")[f.file.split("/").length - 1].substring(0, 20) + "..."}
                      <i className="pi pi-download mr-2 ml-2" onClick={() => {
                        dispatch(documentdownloadaction({
                          "file": f.file.toString().substring(1, f.file.length)
                        }))
                      }} style={{ cursor: "pointer", backgroundColor: "blue", padding: "4px", borderRadius: "4px", color: "white" }}> </i>
                      <i className="pi pi-trash mr-2 ml-2" style={{ cursor: "pointer", backgroundColor: "red", padding: "4px", borderRadius: "4px", color: "white" }}
                        onClick={() => {
                          dispatch(deletedocumentaction({
                            "fileid": f.id
                          }))
                        }}
                      > </i>

                    </div>
                  )) :
                  <div className='nofiles' style={{}}
                    onDragOver={e => {
                      e.preventDefault();

                      e.stopPropagation(); console.log(e)
                    }}
                    onDrop={e => {

                      e.preventDefault();

                      e.stopPropagation(); console.log(e)
                    }}>
                    No Files Uploaded
                  </div>



                }


              </div>
              <br />
              <div className="card-footer p-fluid grid ">
                                <div className="field col-12 md:col-3 flex">

                                </div>
                                <div className="field col-12 md:col-2 flex">


                                </div>
              <div className="field col-12 md:col-7 flex gap-2">
                                    <Button className="p-button-info editbutton mr-2" style={{ height: "35px", width: "3.5rem" }} label="" icon="pi pi-pencil" onClick={() => { setEditmode(true); settempdata(e); setModaldialog(true); }}></Button>


                                    <FileUpload emptyTemplate={emptytemplate} style={{}} chooseOptions={chooseOptions} className='p-success fileuplod2 mr-2' mode="basic" name="demo[]" chooseLabel='abc' maxFileSize={1000000} auto onSelect={k => {



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
                                    <Button style={{ height: "35px", width: "3.5rem" }} icon="pi pi-trash" className="p-button-danger" onClick={() => dispatch(deleteemployementdetailsaction({
                                        "id": e.id

                                    }))} />

                                </div>

</div>

            </Card>
            <br></br>




          </div>)
            : 
                    
            <DataTable   className='dttable' value={employmentdetailsdata} showGridlines={false} responsiveLayout="scroll" paginator={true} rows={5}
        globalFilterFields={['PreviousCompanyName','Start_Date','End_Date','PreviousCompanyAddress','Designationonjoining','Designationonleaving']} filters={filters2} header={Headercomp}>

        <Column field="PreviousCompanyName" header="Company Name" sortable style={{ minWidth: '11rem', maxWidth: '14rem' }} ></Column>
        <Column field="Start_Date" header="Start Date" body={formatstartDate}sortable></Column>
        <Column field="End_Date" header="End Date"body={formatendDate} sortable></Column>
        <Column field="PreviousCompanyAddress" header="CompanyAddress" sortable></Column>
        <Column field="Designationonjoining" header="Designation on joining" sortable ></Column>
        <Column field="Designationonleaving" header="Designation on leaving "sortable > </Column>
        <Column field="" header="Uploaded Files " body={filestemplate} > </Column>
       
        <Column field="action" header="Actions" body={actionBodyTemplate} exportable={false}></Column>
    </DataTable>
            
            
          }
        </div>

      </Panel>
      <br />
      <div className="p-fluid  grid">

<div className="field col-12 md:col-4 flex">
</div>
<div className="field col-12 md:col-4 flex">
</div>

<div className="field col-12 md:col-4 flex gap-4">
          <Button className='mr-4' onClick={e => dispatch(setprevcandidateinfotab())}>Previous</Button>
          <Button onClick={e => dispatch(setnextcandidateinfotab())}>Next</Button>
        </div>
      </div>
    </div>
  )
}

export default Employement