import { FilterMatchMode } from 'primereact/api';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import React, { useEffect, useState } from 'react'
import { Form } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import { RootState } from '../../../app/store';
import {  getJobPostActionfromapi, JobPostActiondata } from '../../../features/JobPostActions/jobpostactionsslice';

const  JobPostActions=() =>{


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
    const [company, setcompany] = useState();

    const jobpostactionsdata = useSelector((state: RootState) => state.JobPostAction);
    const Logindata = useSelector((state: RootState) => state.Login);
const navigate=useNavigate()
// const useRedirect=
    const dispatch = useDispatch();

    useEffect(() => {
// alert("rerendering")
        dispatch(getJobPostActionfromapi({
            // "ApproverName":Logindata.username
            "ApproverName":"sbatchu"
        }))
        // console.log(jobpostactionsdata)
        //dispatch(getcompaniesaction());
       
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
    const handleredirect=(s:string)=>{
        console.log(s)
        // Redirect()
    }
    const Headercomp = () => {
        return (
            <div
                className="flex flex-column md:flex-row md:justify-content-between md:align-items-center"
            // className="flex justify-content-between"
            >
                <h5>Job Posts Actions</h5>
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

    return (
        <div>
            <DataTable value={jobpostactionsdata} showGridlines={false} responsiveLayout="scroll" paginator={true} rows={5} globalFilterFields={['JobPostID','JobCode','HiringManager','Company','BusinessUnit','ServiceLine','Customer','ExperianceLevel','NoOfPositions']} filters={filters2} header={Headercomp}>
                <Column field="JobCode" header="JobCode" body={rowdata=>
                // <Button 
                // // to={"dashboard/jobpostsactionApproval/"+rowdata.JobCode} 
                //  onClick={e=>
                //     // Redirect("dashboard/jobpostsactionApproval/"+rowdata.JobCode)
                //     // handleredirect(rowdata.JobCode)
                // //  usehistory.push("dashboard/jobpostsactionApproval/"+rowdata.JobCode)
                // //  navigate("/jobpostsactionApproval/"+rowdata.JobCode)
                
                // }
                //  >{rowdata.JobCode}</Button>
                 
                 <Link to={"/jobpostsactionApproval/"+rowdata.JobCode}   >{rowdata.JobCode}</Link>
                 
                 
                 
                 }></Column>
                <Column field="JobPostID" header="JobPostId" ></Column>
                <Column field="HiringManager" header="HiringManager" ></Column>
                <Column field="Company" header="Company" ></Column>
                <Column field="BusinessUnit" header="BusinessUnit" ></Column>
                <Column field="ServiceLine" header="ServiceLine" ></Column>
                <Column field="Customer" header="Customer" ></Column>
                <Column field="ExperianceLevel" header="ExperianceLevel" ></Column>
                <Column field="NoOfPositions" header="NoOfPositions" ></Column>
                {/* <Column field="company" header="Company" sortable></Column>
                <Column field="bu" header="Business Unit" sortable></Column>
                <Column field="serviceline" header="Service Line" sortable></Column>
                <Column field="customer" header="Customer" sortable></Column>
                <Column field="explevel" header="Experience Level" sortable></Column>
                <Column field="exponboarddate" header="On-bording Date" sortable></Column>
                <Column field="noposts" header="No Of Posts" sortable></Column>
                <Column field="status" header="Status" sortable></Column>
                <Column field="Active" header="Active" sortable dataType="boolean" body={activediv}></Column>
                <Column field="edit" header="Edit" body={actionBodyTemplate} exportable={false}></Column> */}
            </DataTable>

            <Form
                onSubmit={onSubmit}
                initialValues={{ Company:"",JobDescription: "", email: "", password: "", date: null, country: null, accept: false }}
                validate={validate}
                
                render={({ handleSubmit,values }) => (
                    <form onSubmit={handleSubmit} className="formgrid grid">
                        <Dialog visible={productDialog} style={{ width: "70vw" }} header="Create Job post" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                            <br />

                           

                        </Dialog>
                    </form>
                )}
            />
        </div>
    );



}

export default JobPostActions