
import { Menubar } from "primereact/menubar";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import React, { useState, useEffect, Fragment } from "react";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { classNames, ConnectedOverlayScrollHandler } from "primereact/utils";
import { Dialog } from "primereact/dialog";
import { Form, Field } from 'react-final-form';
import { InputText } from "primereact/inputtext";
import { SpeedDial } from "primereact/speeddial";

import axios from "axios";

import { Checkbox } from "primereact/checkbox";

import { InputTextarea } from "primereact/inputtextarea";
import { RadioButton } from "primereact/radiobutton";
import Counter from "./Counter";
import QuotesComp from "./QuotesComp";
import { getcompaniesaction, createcompanyaction, updatecompanyaction, Company } from "../features/Company/companyslice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { Calendar } from 'primereact/calendar';
import { act } from "react-dom/test-utils";
import { FilterMatchMode } from "primereact/api";
import data11 from "./jobpostdata.json";
// import '../../index.css';
const MyJobPosts = () => {
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
    const dispatch = useDispatch();

    useEffect(() => {
        //dispatch(getcompaniesaction());
        console.log(data11.data);
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
                        setEditmode(false);
                        setCompanydesc("");
                        setCompanyname("");
                        setActive(true);

                        setProductDialog(true);
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
                label="Save"
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

    //  const end = <InputText placeholder="Search" type="text" />;
    const activediv = (body: { Active: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined }) => {
        return <div>{body.Active?.toString()}</div>;
    };
    return (
 
            <div>
                <div>
             
                
                {/* <Field name="date" render={({ input }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <Calendar id="date" {...input} dateFormat="dd/mm/yy" mask="99/99/9999" showIcon />
                                        <label htmlFor="date">Birthday</label>
                                    </span>
                                </div>
                            )} /> */}
                
            </div>
        </div>
    );
};
const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(MyJobPosts, comparisonFn);














  {/* <DataTable value={company} showGridlines={false} responsiveLayout="scroll" paginator={true} rows={5} globalFilterFields={["CompanyName", "CompanyDesc", "Active"]} filters={filters2} header={Headercomp}>
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
                        {/* <Column field="Active" header="Active" sortable dataType="boolean" body={activediv}></Column>
                        <Column field="edit" header="Edit" body={actionBodyTemplate} exportable={false}></Column> */}
                    {/* </DataTable>
                </div>

                <Dialog visible={productDialog} style={{ width: "450px" }} header="Companys Information " modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                    <div className="field">
                        <label htmlFor="CompanyName<">Company Name</label>
                        <InputText id=" CompanyName" onChange={(e) => setCompanyname(e.target.value)} value={companyname}></InputText>

                        <br />
                        <br />
                        <div className="field">
                            <label htmlFor="CompanyDesc">Company Description</label>
                            <InputTextarea id="CompanyDesc" onChange={(e) => setCompanydesc(e.target.value)} value={companydesc}></InputTextarea>
                        </div>

                        <div className="col-12">
                            <Checkbox inputId="Active" checked={active} onChange={(e) => setActive(!active)} />
                            <label htmlFor="binary"> Active</label>
                        </div>
                    </div>
                </Dialog>  */}