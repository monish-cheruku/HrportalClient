import { Menubar } from "primereact/menubar";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import React, { useState, useEffect,useRef } from "react";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { classNames, ConnectedOverlayScrollHandler } from "primereact/utils";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { SpeedDial } from "primereact/speeddial";
import { InputNumber } from 'primereact/inputnumber';

import { getManageBillaction,createManageBillaction,updateManageBillaction} from "../features/ManageBillRate/ManageBillRateslice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { act } from "react-dom/test-utils";
import { FilterMatchMode } from "primereact/api";
import { getservicelineaction,IServiceLineoptions } from "../features/ServiceLine/ServiceLineSlice";
import { getexperiencelevelsaction,IExperienceLeveloptions } from "../features/ExperienceLevel/experiencelevelslice";
import { Dropdown } from 'primereact/dropdown';

// import '../../index.css';
const ManageBill = () => {
    const [productDialog, setProductDialog] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [Id, SetId] = useState(0);
    // const [ExperienceLevelId, SetExperienceLevelId] = useState("");
    const [AvgApprovedCTC, SetAvgApprovedCTC] = useState(2);
    const [AvgBillRate, SetAvgBillRate] = useState(2);
    const [head, sethead] = useState("ADD  Average CTC Bill Rate Information")

    //drop down//
    const[ServiceLineId,setServiceLineId]=useState("");
    const [ExperienceLevelId,setExperienceLevelId] = useState("");
    const [issave, setissave] = useState(false);
    const [issavee, setissavee] = useState(false);
    
    const [data, Setdata] = useState([]);
    const [editmode, setEditmode] = useState(false);
    const [globalFilterValue2, setGlobalFilterValue2] = useState("");
    // const toast = useRef();
    const [filters2, setFilters2] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    const selectserviceline=useSelector((state:RootState)=>state.serviceline)
    const selectexperiencelevel=useSelector((state:RootState)=>state.experiencelevel)
    
    const getdropdownelems=()=>{
        var ServiceLineoptions:IServiceLineoptions[]  =[]
    selectserviceline.forEach(e => {
      
        ServiceLineoptions.push({
            key:e. ServiceLineId,
            label:e. ServiceLineName,
            value:e. ServiceLineId
        })});
    
    return ServiceLineoptions
    }

    const getdropdownelemns=()=>{
        var ExperienceLeveloptions:IExperienceLeveloptions[]  =[]
        selectexperiencelevel.forEach(e => {
      
        ExperienceLeveloptions.push({
            key:e.ExperienceLevelId,
            label:e.ExperienceLevel,
            value:e.ExperienceLevelId
        })});
    
    return ExperienceLeveloptions
    }



    const getdropdownactiveelems=()=>{
        var bandoptions :IServiceLineoptions[]  =[]
    selectserviceline.forEach(e => {
        if(e.Active==true){
        bandoptions.push({
            key:e. ServiceLineId,
            label:e. ServiceLineName,
            value:e. ServiceLineId
        })}});
    
    return bandoptions
    }

    const getdropdownactiveelemns=()=>{
        var   ExperienceLeveloptions:IServiceLineoptions[]  =[]
        selectexperiencelevel.forEach(e => {
        if(e.Active==true){
            ExperienceLeveloptions.push({
            key:e. ExperienceLevelId,
            label:e. ExperienceLevel,
            value:e.  ExperienceLevelId
        })}});
    
    return  ExperienceLeveloptions;
    }


    const ManageBilldata= useSelector((state: RootState) => state.ManageBill);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getManageBillaction());
        
    }, []);


    useEffect(()=>{
        dispatch(getservicelineaction());
        getdropdownelems()
        getdropdownactiveelems()
    },[])
    useEffect(()=>{
        dispatch(getexperiencelevelsaction());
        getdropdownelemns()
        getdropdownactiveelemns()
    },[])

    const onGlobalFilterChange2 = (e: any) => {
        const value = e.target.value;
        let _filters2 = { ...filters2 };
        _filters2["global"].value = value;

        setFilters2(_filters2);
        setGlobalFilterValue2(value);
    };
    const hideDialog = () => {
        setissave(false)
        setissavee(false)
        setSubmitted(false);
        setProductDialog(false);
    };
    const Headercomp = () => {
        return (
            <div
                className="flex flex-column md:flex-row md:justify-content-between md:align-items-center"
                // className="flex justify-content-between"
            >
                <h2>Average CTC Bill Rate</h2>
               

                <span style={{ width: "30%" }}></span>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue2} onChange={onGlobalFilterChange2} placeholder="Keyword Search" />
                </span>

                <Button
                    label="Add"
                    icon="pi pi-plus"
                    className="p-button-success mr-2"
                    onClick={(e) => {
                        setEditmode(false);
                        setServiceLineId("");
                        setExperienceLevelId("");
                        SetAvgApprovedCTC(0);
                        SetAvgBillRate(0);
                        setProductDialog(true);
                    }}
                />
            </div>
        );
    };

    const servicelinetemplate=(data)=>{
        var ServiceLineoptions=getdropdownelems()
                var servicelineid=data. ServiceLineId
                var servicelinestr=''
                ServiceLineoptions.forEach(e => {
                    if(e.value==servicelineid)
                    servicelinestr=e.label
                });
                return(
                    <div>
        
                        {servicelinestr}
                    </div>
                )
            }


            const experienceleveltemplate=(data)=>{
                var  ExperienceLeveloptions=getdropdownelemns()
                        var experiencelevelid=data.ExperienceLevelId
                        var experiencelevelstr=''
                        ExperienceLeveloptions.forEach(e => {
                            if(e.value==experiencelevelid)
                            experiencelevelstr=e.label
                        });
                        return(
                            <div>
                
                                {experiencelevelstr}
                            </div>
                        )
                    }

                      const actionAverageTemplate = (rowData:any) => {
                      return formatCurrency(rowData.AvgApprovedCTC);
                    }
                    
                    const formatCurrency = (value:any) => {
                    return value.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits:2 });
                    }
                    
                    const actionAverageTemplate1 = (rowData:any) => {
                        return formatCurrency1(rowData.AvgBillRate);
                      }
                      
                      const formatCurrency1 = (value:any) => {
                      return value.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits:2 });
                      }

    
    const actionBodyTemplate = (data) => {
        return (
            <React.Fragment>
                <Button
                    icon="pi pi-pencil"
                    className="p-button-rounded p-button-success mr-2"
                    onClick={(e) => {
                        setEditmode(true);
                        console.log(data)
                        SetId(data.Id)
                        setServiceLineId(data.ServiceLineId);
                        setExperienceLevelId(data.ExperienceLevelId);
                        SetAvgApprovedCTC(data.AvgApprovedCTC);
                        SetAvgBillRate(data.AvgBillRate)
                        sethead("Edit Average CTC Bill Rate Information")
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
                    setissave (true);
                    setissavee(true);
                    // console.log(companyname);
                    // console.log(companydesc);
                    // console.log(active);
                    var c = {
                        Id:Id,
                        ServiceLineId:ServiceLineId,
                        ExperienceLevelId:ExperienceLevelId,
                        AvgApprovedCTC: AvgApprovedCTC,
                        AvgBillRate:AvgBillRate,
                    };
                    if(ServiceLineId!&&ExperienceLevelId!="")
                    {
                    if (editmode === false) {
                        dispatch(createManageBillaction(c));
                    } else {
                        dispatch(updateManageBillaction(c));
                    }
                    setProductDialog(false);}
                }}
            />
        </React.Fragment>
    );

    const onCategoryChange = () => {
        return console.log("dudgf");
    };

    return (
        <div className="Manage ServiceLine">
            
            <div>
                <div>
                    <DataTable value={ManageBilldata}showGridlines={false} responsiveLayout="scroll" paginator={true} rows={5} globalFilterFields={["ServiceLineId", "ExperienceLevelId", "AvgApprovedCTC","AvgBillRate"]} filters={filters2} header={Headercomp}>

                        <Column field="ServiceLineId" header=" ServiceLine Name"  body={servicelinetemplate} sortable></Column>
                        <Column field="ExperienceLevelId" header="Experience Level "  body={experienceleveltemplate}sortable></Column>

                        <Column field="AvgApprovedCTC" header="Average Approved CTC"  body={actionAverageTemplate} sortable></Column>
                        <Column field="AvgBillRate" header="Average Bill Rate" body={actionAverageTemplate1} sortable></Column>
                        <Column field="edit" header="Edit" body={actionBodyTemplate} exportable={false}></Column>
                    </DataTable>
                </div>

                <Dialog visible={productDialog} style={{ width: "450px" }} header={head} modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                    <div className="field">
                        <label htmlFor="ServiceLineId<">ServiceLine Name</label>
                        {/* <InputText id=" ServiceLineId" onChange={(e) => SetServiceLineId(e.target.value)} value={ServiceLineId}></InputText>
                         */}
<Dropdown className={ issave==true&&ServiceLineId==""?"p-invalid":"p-valid"} value={ServiceLineId} options={!editmode?getdropdownactiveelems():getdropdownelems()}   id="ServiceLineId" onChange={(e) => setServiceLineId(e.value)}   placeholder="Select  ServiceLine Name"/>
           { issave==true&&ServiceLineId=="" && <small className="p-error">*ServiceLine Name  is Required.</small>}

                        <br />
                        <br />
                        <div className="field">
                             <label htmlFor="ExperienceLevelId">Experience Level</label>         
 <Dropdown className={ issavee==true&&ExperienceLevelId==""?"p-invalid":"p-valid"} value={ExperienceLevelId} options={!editmode?getdropdownactiveelemns():getdropdownelemns()}   id="ExperienceLevelId" onChange={(e) => setExperienceLevelId(e.value)} placeholder="Select Experience Level"/>
           { issavee==true&&ExperienceLevelId=="" && <small className="p-error">*Experience Level  is Required.</small>}

                        </div>


                        <div className="field">

                        <label htmlFor="currency-india">Average Approved CTC</label>
                         <InputNumber inputId="currency-india" value={AvgApprovedCTC} onValueChange={(e) => SetAvgApprovedCTC(e.value)} mode="currency" currency="INR" currencyDisplay="code" locale="en-IN"  minFractionDigits={2}/> 
                        {/* <InputNumber value={AvgApprovedCTC} onValueChange={(e) => SetAvgApprovedCTC(e.value)}/> */}
                        </div>

                        <div className="col-12">
                          <label htmlFor="currency-india">Average Bill Rate</label>
                         <InputNumber inputId="currency-india" value={AvgBillRate} onValueChange={(e) => SetAvgBillRate(e.value)} mode="currency" currency="INR" currencyDisplay="code" locale="en-IN"  minFractionDigits={2}/> 
                        {/* <InputNumber value={AvgBillRate} onValueChange={(e) => SetAvgApprovedCTC(e.value)}/> */}
                        </div>
                    </div>
                </Dialog>
            </div>
        </div>
    );
};
const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(ManageBill, comparisonFn);










// ServiceLineId": 1,
//         "ServiceLineName": "abd",
//         "Acronym": "jap",
//         "ServiceLineDesc": "a",
//         "Active": true
















// "Id": 1,
// "ServiceLineId": 2,
// "ExperienceLevelId": 303,
// "AvgApprovedCTC": "9000.00000",
// "AvgBillRate": "564.0000"
// },
// {
// "Id": 2,
// "ServiceLineId": 2,
// "ExperienceLevelId": 303,
// "AvgApprovedCTC": "90000.00000",
// "AvgBillRate": "564.0000"
// }
