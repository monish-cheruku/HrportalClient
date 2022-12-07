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
import { myjobpostsaction } from "../../features/JobPostActions/myjobpostsslice";
import { Link } from "react-router-dom";
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
    const myJobPosts =useSelector((state:RootState)=>state.myjobposts);
    const Logindata = useSelector((state: RootState) => state.Login);

    const companiesdata = useSelector((state: RootState) => state.company);
    const selectcompany = useSelector((state: RootState) => state.company);

    const dispatch = useDispatch();
    const navigate = useNavigate()

    useEffect(() => {
        //dispatch(getcompaniesaction());
        // dispatch(getcompaniesaction());
        // dispatch(getbusinessunitsaction());
        // dispatch(getservicelineaction());
        // dispatch(getLocationaction());
        // dispatch(getcustomersaction())
        // dispatch(getIndustriesaction())
        // dispatch(getexperiencelevelsaction())
        // console.log(data11.data);
        //setcompany(data11;
        //fetch('./jobpostdata.json').then(res => {res.json(); console.log(res);}).then(d => setcompany(d.data));
    
    dispatch(myjobpostsaction({
        "UserName":Logindata.username
        // "ApproverName":"nkanagala"
    }))
    console.log(myJobPosts)
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
                      

                        navigate("/myjobposts/updatejobpost",{state:{data}})
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
                        // dispatch(createcompanyaction(c));
                    } else {
                        // dispatch(updatecompanyaction(c));
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

  
const linkbody=rowdata=>{
return(<Link to={"/jobpostdetailedview/"+rowdata.JobCode}>{rowdata.JobCode}</Link>)}
    //  const end = <InputText placeholder="Search" type="text" />;
    const activediv = (body: { Active: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined }) => {
        return <div>{body.stage_name?.toString()}</div>;
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
            <DataTable value={myJobPosts} showGridlines={false} responsiveLayout="scroll" paginator={true} rows={5} globalFilterFields={["CompanyName", "CompanyDesc", "Active"]} filters={filters2} header={Headercomp}>
                <Column field="JobCode" header="Job Code" sortable style={{ minWidth: '11rem', maxWidth : '14rem'}} body={linkbody}>  </Column>
                <Column field="JobTitle" header="Job Title" sortable></Column>
                <Column field="company_name" header="Company" sortable></Column>
                <Column field="businessunit_name" header="Business Unit" sortable></Column>
                <Column field="serviceline_name" header="Service Line" sortable></Column>
                <Column field="industry_name" header="Industry" sortable></Column>
                <Column field="customer_name" header="Customer" sortable></Column>
                <Column field="experience_Level" header="Experience Level" sortable></Column>
                <Column field="OnBoardingDate" header="On Boarding Date" sortable></Column>
                <Column field="NoOfPositions" header="No Of Positions" sortable></Column>
                <Column field="stage_name" header="Status" sortable  body={activediv}></Column>
                <Column field="edit" header="Edit" body={actionBodyTemplate} exportable={false}></Column>
            </DataTable>

            {/* <Form
                onSubmit={onSubmit}
                initialValues={{ Company: "", JobDescription: "", email: "", password: "", date: null, country: null, accept: false }}
                validate={validate}

                render={({ handleSubmit, values }) => (
                    <form onSubmit={handleSubmit} className="formgrid grid"> */}
                        {/* <Dialog visible={productDialog} style={{ width: "70vw" }} header="Create Job post" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}> */}
                            <br />

                           
{/* <CreateJobPost></CreateJobPost> */}
                   
        </div>
    );
};

export default MyJobPosts


