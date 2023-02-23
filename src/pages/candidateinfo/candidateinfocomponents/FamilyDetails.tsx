import { Button } from 'primereact/button'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Field, Form } from 'react-final-form'
import { setnextcandidateinfotab, setprevcandidateinfotab } from '../../../features/Misc/globalslice'
import { Card } from 'primereact/card'
import { InputText } from 'primereact/inputtext'
import { Checkbox } from 'primereact/checkbox'
import { Dialog } from 'primereact/dialog'
import { InputTextarea } from 'primereact/inputtextarea'
import classNames from 'classnames'
import { Calendar } from 'primereact/calendar'
import { InputMask } from 'primereact/inputmask'
import { RootState } from '../../../app/store'
import { createfamilydetailsaction, deletefamilydetailsaction, familydetailsaction, updatefamilydetailsaction } from '../../../features/Candidate info/familydetailsslice'
import { Panel, PanelHeaderTemplateOptions } from 'primereact/panel'
import { SelectButton } from 'primereact/selectbutton'
import { FilterMatchMode } from 'primereact/api'
import { deletedocumentaction, documentdownloadaction, uploaddocumentaction } from '../../../features/Candidate info/candidateinfoslice'
import { FileUpload } from 'primereact/fileupload'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Dropdown } from 'primereact/dropdown'
// import { createfamilydetailsaction, familydetailsaction, updatefamilydetailsaction } from '../../../features/Candidateinfo/familydetailsslice'

function FamilyDetails() {

    const familydetailsdata = useSelector((state: RootState) => state.CandidateFamilydetails);

    const [tempdata, settempdata] = useState<any>({})
    const [gridview, setgridview] = useState("grid")
    const [globalFilterValue2, setGlobalFilterValue2] = useState("");
    const [filters2, setFilters2] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    const [editmode, setEditmode] = useState(false);
    var candidateinfodata = useSelector((state: RootState) => state.candidateinfo);
    const [modalDialog, setModaldialog] = useState(false);
    const isFormFieldValid = (meta) => !!(meta.touched && meta.error);

    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(familydetailsaction(
            {
                "selectedcandidateid": candidateinfodata.Selected_Candidate_ID

            }
        ))
        console.log(familydetailsdata)
    }, [])

    const validate = (values) => {
        values["CurrentCTC"] = values["CurrentCTC"]
        let errors = {};
        // console.log(data)

        // if (!data.JobDesc) {
        //     errors.JobDesc = "*JobDescription is required.";
        // }
        // if (!data.JobTitle) {
        //     errors.JobTitle = "*JobDescription is required.";
        // }
        // var arr = ["CandidateFirstName", "BusinessUnit_id", "Serviceline_id", "Industry_id", "Industry_id", "Customer_id", "Location_id", "EmploymentType", "JobTitle", "JobDesc", "ExperianceLevel_id", "Qualification", "NoOfPositions", "OnBoardingDate", "HR_User_Name", "BH_User_Name"]
        var arr = ["FullName", "Date_Of_Birth", "Relationship_with_employee"]
        arr.forEach((i) => {
            // console.log(values["Resume"])
            if (!values[i]) {
                // console.log(i.toString())
                errors[i.toString()] = "* This field is required";
            }
        })
        // console.log(values["OverallExpYear"])
        if (values["FullName"] == undefined || values["FullName"] == null) {

            errors["FullName"] = "*This field is required"
        }

        if (values["Date_Of_Birth"] == undefined || values["Date_Of_Birth"] == null) {

            errors["Date_Of_Birth"] = "*This field is required"
        }



        if (values["Relationship_with_employee"] == undefined || values["Relationship_with_employee"] == null) {

            errors["Relationship_with_employee"] = "*This field is required"
        }


        // if (values["Contact_Number"] == undefined || values["Contact_Number"] == null) {

        //     errors["Contact_Number"] = "*Enter correct number "
        // }


        // if (!editmode && (values["Resume"] == null)) {

        //     errors["Resume"] = "*This field is required"
        // }
        console.log(errors)
        return errors;
    };


    const getFormErrorMessage = (meta) => {
        return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
    };
    const gridviewoptions = ['grid', 'table'];
    const template = (options: PanelHeaderTemplateOptions) => {

        const className = `${options.className} justify-content`;
        const titleClassName = `${options.titleClassName} pl-1`;

        return (
            <div className={className}>

                <span className={titleClassName}>
                    <h4>
                        Family details
                    </h4>
                </span>
                <SelectButton value={gridview} options={gridviewoptions} onChange={(e) => setgridview(e.value)} />
                <Button className='' style={{}} onClick={e => { setEditmode(false); setModaldialog(true) }}>Add </Button>            </div>
        )
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

            > <span style={{ width: "30%" }}></span>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue2} onChange={onGlobalFilterChange2} placeholder="Keyword Search" />
                </span>


            </div>
        );
    };
    const actionBodyTemplate = (rowdata) => {
        return (
            <div className=" flex gap-2">
                <Button className="p-button-info editbutton mr-2" style={{ height: "40px", width: "4.4rem" }} label="" icon="pi pi-pencil" onClick={() => { setEditmode(true); settempdata(rowdata); setModaldialog(true); }}></Button>

                <Button style={{ height: "40px", width: "4.4rem" }} icon="pi pi-trash" className="p-button-danger" onClick={() => dispatch(deletefamilydetailsaction({
                    "id": rowdata.id

                }))} />

            </div>


        )
    }
    const Relation = [
        { value: 'mother', label: 'Mother' },
        { value: 'father', label: 'Father' },
        { value: 'spouse', label: 'Spouse' },
        { value: 'brother', label: 'Brother' },
        { value: 'sister', label: 'Sister' },
        { value: 'others', label: 'Others' },

    ]

    const formatDate = (value: any) => {
        return value.toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
        // return value.toLocaleDateString('en-US');
    }
    const formatdob = (rowdata: any) => {
        return new Date(rowdata.Date_Of_Birth).toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
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
                            var datetempstart = new Date(values.Date_Of_Birth)
                            // console.log(datetemp.getFullYear() + "-" + datetemp.getMonth() + "-" + datetemp.getDate())
                            values.Date_Of_Birth = datetempstart.getFullYear() + "-" + (datetempstart.getMonth() + 1).toString().padStart(2, '0') + "-" + datetempstart.getDate().toString().padStart(2, '0')

                            if (!values["Contact_Number"]) {
                                values["Contact_Number"] = ""
                            }
                            values.selectedcandidateid = candidateinfodata.Selected_Candidate_ID
                            console.log(values)
                            if (!editmode) {
                                dispatch(createfamilydetailsaction(values))
                                setModaldialog(false)
                            }
                            else {
                                dispatch(updatefamilydetailsaction(values))
                                setEditmode(false)
                                settempdata(undefined)
                                setModaldialog(false)

                            }
                        }}
                        initialValues={!editmode ? {
                            Contact_Number: "",
                        } : {
                            id: tempdata.id,
                            FullName: tempdata.FullName,
                            Date_Of_Birth: new Date(tempdata.Date_Of_Birth),
                            Relationship_with_employee: tempdata.Relationship_with_employee,
                            Contact_Number: tempdata.Contact_Number ? tempdata.Contact_Number : "",
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
                                <div className="p-fluid  grid">


                                    <div className="field col-12 md:col-10">
                                        <Field
                                            name="FullName"
                                            render={({ input, meta }) => (
                                                <div className="field fluid">
                                                    <label htmlFor="FullName">Full Name*</label>
                                                    <span className="field fluid">
                                                        <InputText maxLength={50} id="FullName" {...input} className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                        <label htmlFor="FullName" className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                                                    </span>
                                                    {getFormErrorMessage(meta)}
                                                </div>
                                            )}
                                        />
                                    </div>
                                    <div className="field col-12 md:col-10">
                                        <Field
                                            name="Date_Of_Birth"
                                            render={({ input, meta }) => (
                                                <div className="field " >
                                                    <label htmlFor="Date_Of_Birth ">Date Of Birth (As per Aadhar Card)*</label>
                                                    <Calendar id="ExpectedDOJ" {...input} dateFormat="mm/dd/yy" showIcon placeholder="Select a Date" className={classNames({ "p-invalid": isFormFieldValid(meta) })} />

                                                    <span className="label">
                                                        <label htmlFor="." className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                                                    </span>
                                                    {getFormErrorMessage(meta)}
                                                </div>
                                            )}
                                        />
                                    </div>

                                    <div className="field col-12 md:col-10">

                                        <Field
                                            name="Relationship_with_employee"
                                            render={({ input, meta }) => (
                                                <div className="field">
                                                    <label htmlFor="Relationship_with_employee ">Relation*</label>
                                                    <span className="p-float-label">
                                                        <Dropdown id="Relationship_with_employee " {...input} options={Relation} placeholder="Select Relation" className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                    </span>
                                                    {getFormErrorMessage(meta)}
                                                </div>
                                            )}
                                        />
                                    </div>

                                    <div className="field col-12 md:col-10">
                                        <Field
                                            name="Contact_Number"
                                            render={({ input, meta }) => (
                                                <div className="field " >
                                                    <label htmlFor="Contact_Number">Contact No*</label>
                                                    <span className="label">
                                                        {/* <InputNumber id="Employee Name " value={values.NoOfPositions} onChange={e=>values["ContactNumber"]=e.value} max={9999999999} {...input} autoFocus className={classNames({ "p-invalid": isFormFieldValid(meta) })} /> */}
                                                        {/* <InputMask  value="12345"   mask="99-9999999999" /> */}
                                                        {/* <InputMask id="Contact_Number" mask="99-9999999999" {...input} value={values.Contact_Number} placeholder="91-9999999999" ></InputMask> */}
                                                        <InputMask {...input} mask="99-9999999999" />

                                                        <label htmlFor="." className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                                                    </span>
                                                    {getFormErrorMessage(meta)}
                                                </div>
                                            )}
                                        />
                                        <br>
                                        </br>



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
                    {gridview == "grid" && familydetailsdata.length == 0 && <div className='flex text-align-center'> No Data</div>}

                    {gridview == "grid" ? familydetailsdata.map((e) => <div className='lg:col-3 md:col-6 sm:col-2 gap-4' key={e.id.toString()}>
                        <Card className='card1 margin-auto'>
                            <div className="p-fluid  grid card1content">

                                <div className="card-body">
                                    <p className="FullName">Name : {e.FullName}</p>
                                    <p className="Date_Of_Birth"> Date Of Birth : {formatDate(new Date(e.Date_Of_Birth))}</p>
                                    <p className="Relationship_with_employee"> Relationship : {e.Relationship_with_employee}</p>
                                    <p className="Contact_Number">Contact : {e.Contact_Number}</p>


                                </div>

                                <br></br>


                            </div>

                            <br />
                            <div className="card-footer p-fluid grid ">
                                <div className="field col-12 md:col-4 flex">

                                </div>
                                <div className="field col-12 md:col-3 flex">


                                </div>
                                <div className="field col-12 md:col-5 flex gap-2">
                                    <Button className="p-button-info editbutton mr-2" style={{ height: "35px", width: "3.5rem" }} label="" icon="pi pi-pencil" onClick={() => { console.log(e); setEditmode(true); settempdata(e); setModaldialog(true); }}></Button>



                                    <Button style={{ height: "35px", width: "3.5rem" }} icon="pi pi-trash" className="p-button-danger" onClick={() => dispatch(deletefamilydetailsaction({
                                        "id": e.id

                                    }))} />

                                </div>




                            </div>

                        </Card>
                        <br></br>

                    </div>)

                        :


                        <DataTable className='dttable' value={familydetailsdata} showGridlines={false} responsiveLayout="scroll" paginator={true} rows={5}
                            globalFilterFields={['FullName', 'Date_Of_Birth', 'Relationship_with_employee', 'Contact_Number']} filters={filters2} header={Headercomp}>

                            <Column field="FullName" header="FullName" sortable style={{ minWidth: '11rem', maxWidth: '14rem' }} ></Column>
                            <Column field="Date_Of_Birth" header="Date Of Birth" body={formatdob} sortable></Column>
                            <Column field="Relationship_with_employee" header="Relationship" sortable></Column>
                            <Column field="Contact_Number" header="Contact Number" sortable></Column>


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

export default FamilyDetails