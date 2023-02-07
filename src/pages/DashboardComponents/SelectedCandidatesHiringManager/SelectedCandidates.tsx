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

// import {  getJobPostActionfromapi, JobPostActiondata } from '../../../features/JobPostActions/jobpostactionsslice';
import { generatepdf } from "../../../api/agent"
import { candidateactionsdetailsaction } from '../../../features/CandidateActions/candidateactiondetailsslice';
import { selectedcandidatesaction, sendofferletteraction } from '../../../features/CandidateActions/selectedcandidatesslice';
import { downloadresume } from '../../../features/Downloadpdfs/pdfslice';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
const SelectedCandidates = () => {


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

    const selectedcandidatesdata = useSelector((state: RootState) => state.Selectedcandidates);
    const Logindata = useSelector((state: RootState) => state.Login);
    

    // const navigate=useNavigate()
    // // const useRedirect=
    const dispatch = useDispatch();
    const navigate = useNavigate()

    //     useEffect(() => {
    // // alert("rerendering")
    //         dispatch(getJobPostActionfromapi({
    //             "ApproverName":Logindata.username
    //             // "ApproverName":"nkanagala"
    //         }))
    //         // console.log(jobpostactionsdata)
    //         //dispatch(getcompaniesaction());

    //         // console.log(data11.data);
    //         //setcompany(data11;
    //         //fetch('./jobpostdata.json').then(res => {res.json(); console.log(res);}).then(d => setcompany(d.data));
    //     }, []);
    useEffect(() => {
        var w: any = []
        Logindata.groups.forEach((i) => w.push(i["name"].toString()))
        dispatch(selectedcandidatesaction({

            "RoleName": w,

            "username": Logindata.username

        }))
        // console.log("working")
        console.log(selectedcandidatesdata)

    }, [])
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
    const handleredirect = (s: string) => {
        console.log(s)
        // Redirect()
    }
    const Headercomp = () => {
        return (
            <div
                className="flex flex-column md:flex-row md:justify-content-between md:align-items-center"
            // className="flex justify-content-between"
            >
                <h5>Selected Candidates </h5>
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

    // const leftToolbarTemplate = () => {
    //     return (
    //         <React.Fragment>
    //             <h4>My Job Posts</h4>
    //         </React.Fragment>
    //     );
    // };



    //  const end = <InputText placeholder="Search" type="text" />;
    const activediv = (body: { Active: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined }) => {
        return <div>{body.Active?.toString()}</div>;
    };

    const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
    const nametemplate = (rowdata) => {
        return (
            <>{rowdata.candidate.CanFirstName + ", " + rowdata.candidate.CanLastName}</>
        )
    }


    const exptemplate = (rowdata) => {
        return (
            <div>{rowdata.candidate.OverallExpYear + "." + rowdata.candidate.OverallExpMonth + " Years"}</div>
        )
    }
    // const linktemplate = (rowdata) => {
    //     var temp: String = rowdata.stage_name.toString()
    //     return (
    //         <>
    //             {temp == "Candidate Review" &&
    //                 <Link to={"/candidatereview/" + rowdata.CandidateCode} state={rowdata}  >{rowdata.CandidateCode}</Link>}

    //             {/* {emp == "Candidate Interview" &&<Link to={"/candidatefeedback/" + rowdata.CandidateCode} state={rowdata}  >{rowdata.CandidateCode}</Link>
    //             }                      */}
    //             {temp == "Candidate Interview" && <Link to={"/Interview/Hiringmanagerinterview"} state={rowdata}  >{rowdata.CandidateCode}</Link>
    //             } {temp == "Further Review" && <Link to={"/Interview/Hiringmanagerinterviewi2"} state={rowdata}  >{rowdata.CandidateCode}</Link>
    //             } {temp == "HR Interview" && <Link to={"/Interview/HRinterview"} state={rowdata}  >{rowdata.CandidateCode}</Link>
    //             }
    //             {temp == "HM Hold" && <Link to={"/SelectedCandidatesHold"} state={rowdata}  >{rowdata.CandidateCode}</Link>
    //             }
    //             {temp == "BH Candidate Approval" && <Link to={"/BusinessHeadApproval"} state={rowdata}  >{rowdata.CandidateCode}</Link>
    //             }
    //             {temp == "FC Approval" && <Link to={"/FinanceControllerApproval"} state={rowdata}  >{rowdata.CandidateCode}</Link>
    //             }
    //             {temp == "GM Approval" && <Link to={"/GeneralManagerApproval"} state={rowdata}  >{rowdata.CandidateCode}</Link>
    //             }

    //         </>
    //     )
    // }
    const formatCurrencycctc = (rowdata) => {
        var value1 = rowdata.candidate.CurrentCTC
        // console.log(  (rowdata.candidate.CurrentCTC.toString()).toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 }))
        return (<>{
            value1 ? value1.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 }) : ""
        }</>)
    }
    const formatCurrencyEctc = (rowdata) => {
        var value1 = rowdata.candidate.ExpectedCTC
        return (<>{
            value1 ? value1.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 }) : ""
        }</>)
    }
    const formatCurrencyNctc = (rowdata) => {
        var value1 = rowdata.candidate.NegotiatedCTC
        return (<>{
            //  (rowdata.candidate.NegotiatedCTC?.toString()).toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 })
            value1 ? value1.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 }) : ""
        }</>)
    }
    const formatCurrency = (value: any) => {
        return value.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 });
    }
    const datetemplate = (rowdata: any) => {

        return <>{formatDate(new Date(rowdata.candidate.ExpectedDOJ))}</>;


    }
    const formatDate = (value: any) => {
        return value.toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
        // return value.toLocaleDateString('en-US');
    }
    const linktemplate = (rowdata) => {
        console.log(rowdata)
        return (
            <Link to={'/SelectedCandidatesdetails'} state={rowdata}>{rowdata.candidate.CandidateCode}</Link>
        )
    }

    const actionBodyTemplate = (data) => {
        return (
            <React.Fragment>
                <div className="p-fluid  grid">
                    {data.OfferLetter && 
                    <div className="field col-12 md:col-5">
                        <Button
                            icon="pi pi-download"
                            tooltip='Download OfferLetter'
                            className="p-button-rounded p-button-warning mr-6"
                            // style={{ width: "30px", height: "30px",}}
                            onClick={(e) => {

                                dispatch(downloadresume(
                                    {
                                        'Resume': data?.OfferLetter?.toString().substring(1, data?.OfferLetter?.toString().length)
                                    }
                                ))
                            }}
                        />
                    </div>
                    }
                    {data.OfferLetter && 
                    <div className="field col-12 md:col-5">
                        <Button
                            icon="pi pi-share-alt"
                            tooltip='Send OfferLetter'
                            className="p-button-rounded p-button-success"                        
                            disabled = {data.IsOfferAccepted}
                       
                            onClick={(e) => {
                                // confirmDialog({
                                //     message: 'Are you sure you want to proceed?',
                                //     header: 'Confirmation',
                                //     icon: 'pi pi-exclamation-triangle',
                                //     accept(){console.log("assdsd")},
                                //     reject(){console.log("assdsd11")},
                                // });
                                dispatch(sendofferletteraction(
                                    {
                                        'selectedcandidateid': data?.Selected_Candidate_ID
                                    }
                                ))
                            }}
                        />
                    </div>
                    }
                </div>
            </React.Fragment>
        );
    };
    return (
        <div>

            <DataTable value={selectedcandidatesdata} showGridlines={false} responsiveLayout="scroll" paginator={true} rows={5}
                globalFilterFields={['candidate.CandidateCode', 'candidate.CanFirstName', 'candidate.Jobpost.JobCode', 'candidate.Jobpost.JobTitle', 'candidate.OverallExpYear', 'candidate.CurrentCTC', 'candidate.ExpectedCTC', 'Jobpost.NegotiatedCTC', 'candidate.ExpectedDOJ']} filters={filters2} header={Headercomp}>

                <Column field="candidate.CandidateCode" header="Candiate Code" sortable style={{ minWidth: '11rem', maxWidth: '14rem' }} body={linktemplate}></Column>
                <Column field="candidate.CanFirstName" body={nametemplate} header="Candidate Name" sortable></Column>
                <Column field="jobpost.JobCode" header="Job Code" sortable></Column>
                <Column field="jobpost.JobTitle" header="Job Title" sortable></Column>
                <Column field="candidate.OverallExpYear" body={exptemplate} header="Experience" sortable ></Column>
                <Column field="candidate.CurrentCTC" header="CurrentCTC " body={formatCurrencycctc} sortable > </Column>
                <Column field="candidate.ExpectedCTC" header="Expected CTC" body={formatCurrencyEctc} sortable></Column>
                <Column field="candidate.NegotiatedCTC" header="Negotiated CTC" body={formatCurrencyNctc} sortable></Column>
                <Column field="candidate.ExpectedDOJ" header="Expected DOJ" body={datetemplate} sortable></Column>
                <Column field="action" header="Action" body={actionBodyTemplate} exportable={false}></Column>
            </DataTable>


        </div>
    );



}

export default SelectedCandidates