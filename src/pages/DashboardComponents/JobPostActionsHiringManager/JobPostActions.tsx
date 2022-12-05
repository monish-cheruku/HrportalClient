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
            "ApproverName":Logindata.username
            // "ApproverName":"nkanagala"
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
                <Column field="JobCode" header="Job Code" body={rowdata=>
                // <Button 
                // // to={"dashboard/jobpostsactionApproval/"+rowdata.JobCode} 
                //  onClick={e=>
                //     // Redirect("dashboard/jobpostsactionApproval/"+rowdata.JobCode)
                //     // handleredirect(rowdata.JobCode)
                // //  usehistory.push("dashboard/jobpostsactionApproval/"+rowdata.JobCode)
                // //  navigate("/jobpostsactionApproval/"+rowdata.JobCode)
                
                // }
                //  >{rowdata.JobCode}</Button>
                 
                //  <Link to={"/jobpostsactionApproval/"+rowdata.JobCode} state={rowdata}  >{rowdata.JobCode}</Link>
               
                rowdata.Stage!="Profiles Pending"?<Link to={"/jobpostsactionApproval/"+rowdata.JobCode} state={rowdata}  >{rowdata.JobCode}</Link>:<Link to={"/jobpostsprofileupload/"+rowdata.JobCode} state={rowdata}  >{rowdata.JobCode}</Link>                 
                 
                 
                 }></Column>                
                <Column field="JobTitle" header="Job Title" ></Column>
                <Column field="HiringManager" header="Hiring Manager" ></Column>
                <Column field="Industry" header="Industry" ></Column>
                <Column field="Company" header="Company" ></Column>
                <Column field="BusinessUnit" header="BusinessUnit" ></Column>
                <Column field="ServiceLine" header="ServiceLine" ></Column>
                <Column field="Customer" header="Customer" ></Column>
                <Column field="ExperianceLevel" header="Experiance Level" ></Column>
                <Column field="OnBoardingDate" header="Expected DOJ" ></Column>
                <Column field="NoOfPositions" header="No Positions" ></Column>
                <Column field="Stage" header="Status" ></Column>
 
            </DataTable>


        </div>
    );



}

export default JobPostActions