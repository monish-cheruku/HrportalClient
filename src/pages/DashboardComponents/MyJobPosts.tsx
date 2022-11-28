import { Menubar } from "primereact/menubar";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import React, { useState, useEffect, Fragment } from "react";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { classNames, ConnectedOverlayScrollHandler } from "primereact/utils";
import { Dialog } from "primereact/dialog";
import { Form, Field } from "react-final-form";
import { InputText } from "primereact/inputtext";
import { SpeedDial } from "primereact/speeddial";

import axios from "axios";

import { Checkbox } from "primereact/checkbox";

import { InputTextarea } from "primereact/inputtextarea";
import { RadioButton } from "primereact/radiobutton";
import Counter from "../Counter";
import QuotesComp from "../QuotesComp";
import { getcompaniesaction, createcompanyaction, updatecompanyaction, Company, ICompanyoptions } from "../../features/Company/companyslice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { act } from "react-dom/test-utils";
import { FilterMatchMode } from "primereact/api";
import { connect } from "react-redux";
import data11 from "../jobpostdata.json";
import { InputNumber } from "primereact/inputnumber";
import { getactivebandoptions, getallbandoptions } from "../../features/Band/BandSelector";

//dropdowns//
import { getallcompanyoptions, getactivecompanyoptions } from "../../features/Company/CompanySelector";
import { getactiveLocationoptions, getallLocations } from "../../features/Location/LocationSelector";
import { getactivecustomeroptions } from "../../features/Customer/customerselector";
import { getactiveservicelineoptions } from "../../features/ServiceLine/ServiceLineSelectors";
import { getbusinessunitsaction } from "../../features/BusinessUnit/businessunitslice";
import { getservicelineaction } from "../../features/ServiceLine/ServiceLineSlice";
import { getactivebusinessunitoptions, getactivebusinessunitoptionsfilterbycustomer } from "../../features/BusinessUnit/businessunitselector";
import { getLocationaction } from "../../features/Location/Locationslice";
import { getcustomersaction } from "../../features/Customer/customerslice";
import { getIndustriesaction } from "../../features/Industry/Industryslice";
import { getactiveIndustryoptions } from "../../features/Industry/industryselector";
import { getexperiencelevelsaction } from "../../features/ExperienceLevel/experiencelevelslice";
import { getactiveexperienceleveloptions } from "../../features/ExperienceLevel/experiencelevelselector";
import CreateJobPost from "./CreateJobPost";
import { useNavigate } from "react-router";
// import '../../index.css';
const MyJobPosts = (props) => {
    const [productDialog, setProductDialog] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [cities, setCities] = useState([]);
    const [companyid, setCompanyid] = useState(0);
    const [companyname, setCompanyname] = useState("");
    const [companydesc, setCompanydesc] = useState("");
    const [active, setActive] = useState<boolean>(true);
    const [data, Setdata] = useState([]);
    const [editmode, setEditmode] = useState(false);
    const [globalFilterValue2, setGlobalFilterValue2] = useState("");
    const [filters2, setFilters2] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    const [company, setcompany] = useState(data11.data);

    const companiesdata = useSelector((state: RootState) => state.company);
    const selectcompany = useSelector((state: RootState) => state.company);

    const dispatch = useDispatch();
    const navigate=useNavigate()

    useEffect(() => {
        //dispatch(getcompaniesaction());
        dispatch(getcompaniesaction());
        dispatch(getbusinessunitsaction());
        dispatch(getservicelineaction());
        dispatch(getLocationaction());
        dispatch(getcustomersaction())
        dispatch(getIndustriesaction())
        dispatch(getexperiencelevelsaction())
        // console.log(data11.data);
        //setcompany(data11;
        //fetch('./jobpostdata.json').then(res => {res.json(); console.log(res);}).then(d => setcompany(d.data));
    }, []);

    const onGlobalFilterChange2 = (e: any) => {
        const value = e.target.value;
        let _filters2 = { ...filters2 };
        _filters2["global"].value = value;

        setFilters2(_filters2);
        setGlobalFilterValue2(value);
    };
    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    };
    const Headercomp = () => {
        return (
            <div
                className="flex flex-column md:flex-row md:justify-content-between md:align-items-center"
            // className="flex justify-content-between"
            >
                <h5>My Job Posts</h5>
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

                <Button
                    label="Create Job Post"
                    icon="pi pi-plus"
                    className="p-button-success mr-2"
                    onClick={(e) => {
                        // setEditmode(false);
                        // setCompanydesc("");
                        // setCompanyname("");
                        // setActive(true);

                        // setProductDialog(true);
                        // Navigate(to="/myjobposts/createjobpost")
                        navigate("/myjobposts/createjobpost")
                    }}
                />
            </div>
        );
    };
    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Headercomp />
                <Button
                    label="Add"
                    icon="pi pi-plus"
                    className="p-button-success mr-2"
                    onClick={(e) => {
                        setEditmode(false);
                        setCompanydesc("");
                        setCompanyname("");
                        setActive(true);

                        setProductDialog(true);
                    }}
                />
            </React.Fragment>
        );
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <h4>My Job Posts</h4>
            </React.Fragment>
        );
    };
    const actionBodyTemplate = (data) => {
        return (
            <React.Fragment>
                <Button
                    icon="pi pi-pencil"
                    className="p-button-rounded p-button-success mr-2"
                    onClick={(e) => {
                        setEditmode(true);
                        // console.log(rowdata)
                        setCompanyid(data.CompanyId);
                        setCompanydesc(data.CompanyDesc);
                        setCompanyname(data.CompanyName);
                        setActive(data.Active);
                        setProductDialog(true);
                    }}
                />
            </React.Fragment>
        );
    };
    const productDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button
                type="submit"
                label="Submit"
                icon="pi pi-check"
                className="p-button-text"
                onClick={() => {
                    console.log(companyname);
                    console.log(companydesc);
                    console.log(active);
                    var c = {
                        CompanyId: companyid,
                        CompanyName: companyname,
                        CompanyDesc: companydesc,
                        Active: active,
                    };
                    if (editmode === false) {
                        dispatch(createcompanyaction(c));
                    } else {
                        dispatch(updatecompanyaction(c));
                    }
                    setProductDialog(false);
                    // axios.post("http://10.154.155.135:8000/api/company");
                    // hideDialog();
                }}
            />
        </React.Fragment>
    );

    const onCategoryChange = () => {
        return console.log("dudgf");
    };
    const onSubmit = (data, form) => {
        form.restart();
    };

    const getdropdownactiveelemns = () => {
        var Companyoptions: ICompanyoptions[] = [];
        selectcompany.forEach((e) => {
            if (e.Active == true) {
                // console.log(BusinessUnitId)
                Companyoptions.push({
                    key: e.CompanyId,
                    label: e.CompanyName,
                    value: e.CompanyId,
                });
            }
        });

        return Companyoptions;
    };

    const validate = (data) => {
        let errors = {};

        if (!data.JobDescription) {
            errors.JobDescription = "*JobDescription is required.";
        }

        return errors;
    };

    //  const end = <InputText placeholder="Search" type="text" />;
    const activediv = (body: { Active: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined }) => {
        return <div>{body.Active?.toString()}</div>;
    };

    const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
    const getFormErrorMessage = (meta) => {
        return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
    };

    // const onSubmit = (data, form) => {
    //     new FormData(data);
    //     setShowMessage(true);

    //     form.restart();
    // };
    const filterbusinessunit = (i: any, s: any) => {
        // console.log(i)
        // console.log(s)
        var temp: any = []
        i.forEach((e) => {
            // console.log(e)
            if (e.companyid == s) {
                temp.push({

                    key: e.key,
                    label: e.label,
                    value: e.value

                })
            }
        })
        //    console.log(temp)
        return temp
    }
    const filterserviceline = (i: any, c: any, b: any) => {
        console.log(i)
        console.log(c)
        console.log(b)

        var temp: any = []
        i.forEach((e) => {
            // console.log(e)
            if (e.companyid == c && e.businessunitid == b) {
                temp.push({

                    key: e.key,
                    label: e.label,
                    value: e.value

                })
            }
        })
        console.log(temp)
        return temp
    }
    return (
        <div>
            <DataTable value={company} showGridlines={false} responsiveLayout="scroll" paginator={true} rows={5} globalFilterFields={["CompanyName", "CompanyDesc", "Active"]} filters={filters2} header={Headercomp}>
                <Column field="code" header="Job Code" sortable></Column>
                <Column field="title" header="Job Title" sortable></Column>
                <Column field="company" header="Company" sortable></Column>
                <Column field="bu" header="Business Unit" sortable></Column>
                <Column field="serviceline" header="Service Line" sortable></Column>
                <Column field="customer" header="Customer" sortable></Column>
                <Column field="explevel" header="Experience Level" sortable></Column>
                <Column field="exponboarddate" header="On-bording Date" sortable></Column>
                <Column field="noposts" header="No Of Posts" sortable></Column>
                <Column field="status" header="Status" sortable></Column>
                <Column field="Active" header="Active" sortable dataType="boolean" body={activediv}></Column>
                <Column field="edit" header="Edit" body={actionBodyTemplate} exportable={false}></Column>
            </DataTable>

            {/* <Form
                onSubmit={onSubmit}
                initialValues={{ Company: "", JobDescription: "", email: "", password: "", date: null, country: null, accept: false }}
                validate={validate}

                render={({ handleSubmit, values }) => (
                    <form onSubmit={handleSubmit} className="formgrid grid"> */}
                        <Dialog visible={productDialog} style={{ width: "70vw" }} header="Create Job post" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                            <br />

                            {/* <div className="p-fluid formgrid grid">
                                <div className="field col-12 md:col-4">
                                    <Field
                                        name="Company"
                                        render={({ input }) => (
                                            <div>
                                                <div className="field">
                                                    <label htmlFor="Company">Company Name</label>
                                                    <span className="column">
                                                        <Dropdown id="Company" {...input} options={props.getactivecompanyoptionsprop} placeholder="Select a Company" />
                                                    </span>
                                                </div>
                                            </div>

                                        )}
                                    />
                                </div>

                                <div className="field col-12 md:col-4">
                                    <Field
                                        name="Businessunit"
                                        render={({ input }) => (
                                            <div className="field">
                                                <label htmlFor="Business unit">Business unit</label>
                                                <span className="column">
                                                    <Dropdown id="Business unit" {...input} options={filterbusinessunit(props.getactivebusinessunitoptionsprop, values.Company)} placeholder="Select a Business unit" />
                                                </span>
                                            </div>
                                        )}
                                    />
                                </div>

                                <div className="field col-12 md:col-4">
                                    <Field
                                        name="service Line"
                                        render={({ input }) => (
                                            <div className="field">
                                                <label htmlFor="service Line">Service Line</label>
                                                <span className="column">
                                                    <Dropdown id="service Line" {...input} options={filterserviceline(props.getactiveservicelineoptionsprop, values.Company, values.Businessunit)} optionLabel="label" placeholder="Select a service Line" />
                                                </span>
                                            </div>
                                        )}
                                    />
                                </div>
                            </div>


                            <div className="p-fluid formgrid grid">
                                <div className="field col-12 md:col-4">
                                    <Field
                                        name="Industry"
                                        render={({ input }) => (
                                            <div className="field">
                                                <label htmlFor="Industry">Industry</label>
                                                <span className="p-float-label">
                                                    <Dropdown id="Industry" {...input} options={props.getactiveIndustryoptionsprop} optionLabel="label" placeholder=" select a Industry" />
                                                </span>
                                            </div>
                                        )}
                                    />
                                </div>



                                <div className="field col-12 md:col-4">
                                    <Field
                                        name="customer"
                                        render={({ input }) => (
                                            <div className="field">
                                                <label htmlFor="customer">customer</label>
                                                <span className="p-float-label">
                                                    <Dropdown id="customer" {...input} options={props.getactivecustomeroptionsprop} optionLabel="label" placeholder="Select a customer" />
                                                </span>
                                            </div>
                                        )}
                                    />
                                </div>


                                <div className="field col-12 md:col-4">
                                    <Field
                                        name="Location"
                                        render={({ input }) => (
                                            <div className="field">
                                                <label htmlFor="Location">Location</label>
                                                <span className="p-float-label">
                                                    <Dropdown id="Location" {...input} options={props.getactiveLocationoptionsprop} optionLabel="label" placeholder="Select a Location" />
                                                </span>
                                            </div>
                                        )}
                                    />
                                </div>
                            </div>



                            <div className="Row">
                                <div className="Col">
                                    <Field
                                        name="Employement Type"
                                        render={({ input }) => (
                                            <div className="field">
                                                <label htmlFor="Employement Type">Employement Type</label>
                                                <span className="p-float-label">
                                                    <Dropdown id="Employement Type" {...input} options={getdropdownactiveelemns()} optionLabel="name" placeholder="Select a Employement Type" />
                                                </span>
                                            </div>
                                        )}
                                    />
                                </div>

                                <div className="Col">

                                    <Field
                                        name="Duration"
                                        render={({ input, meta }) => (
                                            <div className="field">
                                                <label htmlFor="Duration">Duration(for other than Fulltime)</label>
                                                <span className="p-float-label">
                                                    <InputText id="Duration" {...input} type={"number"} autoFocus className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                    <label htmlFor="Duration" className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                                                </span>
                                                {getFormErrorMessage(meta)}
                                            </div>
                                        )}
                                    />
                                </div>
                            </div>



                            <Field
                                name="Job Title"
                                render={({ input, meta }) => (
                                    <div className="field">
                                        <label htmlFor="Job Title">Job Title</label>
                                        <span className="p-float-label">
                                            <InputText id="Job Title" {...input} autoFocus className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                            <label htmlFor="Job Title" className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                                        </span>
                                        {getFormErrorMessage(meta)}
                                    </div>
                                )}
                            />



                            <Field
                                name="JobDescription"
                                render={({ input, meta }) => (
                                    <div className="field">
                                        <label htmlFor="JobDescription">Job Descriptioon</label>
                                        <span className="p-float-label">
                                            <InputTextarea id="JobDescription" {...input} autoFocus className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                            <label htmlFor="." className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                                        </span>
                                        {getFormErrorMessage(meta)}
                                    </div>
                                )}
                            />




                            <div className="p-fluid formgrid grid">
                                <div className="field col-12 md:col-4">
                                    <Field
                                        name="Experience Level"
                                        render={({ input }) => (
                                            <div className="field">
                                                <label htmlFor="Experience Level">Experience Level</label>
                                                <span className="p-float-label">
                                                    <Dropdown id="Experience Level" {...input} options={props.getactiveexperienceleveloptionsprop} optionLabel="label" placeholder="Select a Experience Level" />
                                                </span>
                                            </div>
                                        )}
                                    />
                                </div>
                                <div className="field col-12 md:col-4">

                                    <Field
                                        name="Highest Qualification"
                                        render={({ input }) => (
                                            <div className="field fluid">
                                                <label htmlFor="Highest Qualification">Highest Qualification</label>
                                                <span className="field fluid">
                                                    <Dropdown id="Highest Qualification" {...input} options={getdropdownactiveelemns()} optionLabel="name" placeholder="Select a Highest Qualification" />
                                                </span>
                                            </div>
                                        )}
                                    />

                                </div>


                                <div className="field col-12 md:col-4">
                                    <Field
                                        name="No of openings"
                                        render={({ input, meta }) => (
                                            <div className="field">
                                                <label htmlFor="No of openings">No of openings</label>
                                                <span className="p-float-label">
                                                    <InputNumber id="No of openings" {...input} autoFocus className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                    <label htmlFor="No of openings" className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                                                </span>
                                                {getFormErrorMessage(meta)}
                                            </div>
                                        )}
                                    />
                                </div>
                            </div>



                            <div className="p-fluid formgrid grid">
                                <div className="field col-12 md:col-4">
                                    <Field
                                        name="date"
                                        render={({ input }) => (
                                            <div className="field fluid">
                                                <label htmlFor="date">Expected onboarding date</label>
                                                <span className="field fluid">
                                                    <Calendar id="date" {...input} dateFormat="dd/mm/yy" mask="99/99/9999" showIcon placeholder="Select a Date" />
                                                </span>
                                            </div>
                                        )}
                                    />
                                </div>
                                <div className="field col-12 md:col-4">
                                    <Field
                                        name="Po Reference"
                                        render={({ input, meta }) => (
                                            <div className="field fluid">
                                                <label htmlFor="Po Reference">Po Reference</label>
                                                <span className="field fluid">
                                                    <InputText id="Po Reference" {...input} autoFocus className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
                                                    <label htmlFor="Po Reference" className={classNames({ "p-error": isFormFieldValid(meta) })}></label>
                                                </span>
                                                {getFormErrorMessage(meta)}
                                            </div>
                                        )}
                                    />
                                </div>


                                <div className="field col-12 md:col-4">

                                    <Field
                                        name="Talent"
                                        render={({ input }) => (
                                            <div className="field">
                                                <label htmlFor="Talent">Talent Acquisition Team</label>
                                                <span className="p-float-label">
                                                    <Dropdown id="Talent" {...input} options={getdropdownactiveelemns()} optionLabel="name" placeholder="Select a Member" />
                                                </span>
                                            </div>
                                        )}
                                    />

                                </div>


                            </div>

                            <div className="p-fluid formgrid grid">
                                <div className="field col-12 md:col-4">
                                    <Field
                                        name="Business Head"
                                        render={({ input }) => (
                                            <div className="field">
                                                <label htmlFor="Business Head">Business Head</label>
                                                <span className="p-float-label">
                                                    <Dropdown id="Business Head" {...input} options={getdropdownactiveelemns()} optionLabel="name" placeholder="Select a Business Head" />
                                                </span>
                                            </div>
                                        )}
                                    />
                                </div>
                            </div> */}
<CreateJobPost></CreateJobPost>
                        </Dialog>
                    {/* </form>
                )}
            /> */}
        </div>
    );
};

function mapStateToProps(state) {
    // const { todos } = state

    // console.log(state);

    return {
        getactivecompanyoptionsprop: getactivecompanyoptions(state),
        getactivebusinessunitoptionsprop: getactivebusinessunitoptions(state),


        getactiveLocationoptionsprop: getactiveLocationoptions(state),


        getactiveservicelineoptionsprop: getactiveservicelineoptions(state),
        getactivecustomeroptionsprop: getactivecustomeroptions(state),
        getactiveIndustryoptionsprop: getactiveIndustryoptions(state),
        getactiveexperienceleveloptionsprop: getactiveexperienceleveloptions(state),
    };
}

// const comparisonFn = function (prevProps, nextProps) {
//     return prevProps.location.pathname === nextProps.location.pathname;
// };

// export default React.memo(connect(mapStateToProps)(MyJobPosts), comparisonFn);
export default connect(mapStateToProps)(MyJobPosts)


