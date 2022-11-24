import { Menubar } from "primereact/menubar";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import React, { useState, useEffect, Fragment, useRef } from "react";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { classNames, ConnectedOverlayScrollHandler } from "primereact/utils";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { SpeedDial } from "primereact/speeddial";

import axios from "axios";

import { Checkbox } from "primereact/checkbox";

import { InputTextarea } from "primereact/inputtextarea";
import { RadioButton } from "primereact/radiobutton";
import Counter from "./Counter";
import QuotesComp from "./QuotesComp";
import { getIndustriesaction, createIndustryaction, updateIndustryaction, } from "../features/Industry/Industryslice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { act } from "react-dom/test-utils";
import { FilterMatchMode } from "primereact/api";

// import '../../index.css';
const ManageIndustry = () => {
    const [productDialog, setProductDialog] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [cities, setCities] = useState([]);
    const [Industriesid, setIndustriesid] = useState(0);
    const [Industryname, setIndustryname] = useState("");
    const [Industrydesc, setIndustrydesc] = useState("");
    const [issave, setissave] = useState(false);
    const [active, setActive] = useState<boolean>(true);
    const [data, Setdata] = useState([]);
    const [editmode, setEditmode] = useState(false);
    const [globalFilterValue2, setGlobalFilterValue2] = useState("");
    const [filters2, setFilters2] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    const companiesdata = useSelector((state: RootState) => state.Industry);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getIndustriesaction());
    }, []);

    const onGlobalFilterChange2 = (e: any) => {
        const value = e.target.value;
        let _filters2 = { ...filters2 };
        _filters2["global"].value = value;

        setFilters2(_filters2);
        setGlobalFilterValue2(value);
    };
    const hideDialog = () => {
        setissave(false)
        setSubmitted(false);
        setProductDialog(false);
    };
    const Headercomp = () => {
        return (
            <div
                className="flex flex-column md:flex-row md:justify-content-between md:align-items-center"
                // className="flex justify-content-between"
            >
                <h2>Manage Industry</h2>
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
                    label="Add"
                    icon="pi pi-plus"
                    className="p-button-success mr-2"
                    onClick={(e) => {
                        setEditmode(false);
                        setIndustrydesc("");
                        setIndustryname("");
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
                        setIndustrydesc("");
                        setIndustryname("");
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
                <h2>Manage Industry</h2>
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
                        setIndustriesid(data.IndustryId);
                        setIndustryname(data.IndustryName);
                        setIndustrydesc(data.IndustryDesc);
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
                    setissave (true);
                    console.log(Industryname);
                    console.log(Industrydesc);
                    console.log(active);
                    var c = {
                        IndustryId: Industriesid,
                        IndustryName: Industryname,
                        IndustryDesc: Industrydesc,
                        Active: active,
                    };
                    if(Industryname!="")
                    {
                    if (editmode === false) {
                        dispatch(createIndustryaction(c));
                    } else {
                        dispatch(updateIndustryaction(c));
                    }
                    setProductDialog(false);}
                    // axios.post("http://10.154.155.135:8000/api/Industry");
                    // hideDialog();
                }}
            />
        </React.Fragment>
    );

    const onCategoryChange = () => {
        return console.log("dudgf");
    };

    //  const end = <InputText placeholder="Search" type="text" />;
    const activediv = (body:any) => {
        return <div>{body.Active?"Yes":"No"}</div>;
    };
    return (
        <div className="ManageIndustry">
            {/* <Counter></Counter>
      <QuotesComp></QuotesComp> */}
            <div>
                <div>
                    <DataTable value={companiesdata} showGridlines={false} responsiveLayout="scroll" paginator={true} rows={5} globalFilterFields={["IndustryName","IndustryDesc","Active"]} filters={filters2} header={Headercomp}>
                        <Column field="IndustryName" header="Industry Name" sortable></Column>
                        <Column field="IndustryDesc" header="Industry Description" sortable></Column>
                        <Column field="Active" header="Active" sortable dataType="boolean" body={activediv}></Column>
                        <Column field="edit" header="Edit" body={actionBodyTemplate} exportable={false}></Column>
                    </DataTable>
                </div>

                <Dialog visible={productDialog} style={{ width: "450px" }} header={editmode?"Edit Industrys Information ":"Add Industrys Information " }footer={productDialogFooter} modal className="p-fluid"  onHide={hideDialog}>
                    <div className="field">
                        <label htmlFor="Industryname<">Industry Name</label>
                        <InputText className={ issave==true&&Industryname==""?"p-invalid":"p-valid"} placeholder={Industryname==""?"":""} id=" Industryname" onChange={(e) => setIndustryname(e.target.value)} value={Industryname}></InputText>
                        { issave==true&&Industryname=="" && <small className="p-error">*Industry Name is required.</small>}

                        <br />
                        <br />
                        <div className="field">
                            <label htmlFor="Industrydesc">Industry Description</label>
                            <InputTextarea id="Industrydesc" onChange={(e) => setIndustrydesc(e.target.value)} value={Industrydesc}></InputTextarea>
                        
                        </div>

                        <div className="col-12">
                            <Checkbox inputId="Active" checked={active} onChange={(e) => setActive(!active)} />
                            <label htmlFor="binary"> Active</label>
                        </div>
                    </div>
                </Dialog>
            </div>
        </div>
    );
};
// const comparisonFn = function (prevProps, nextProps) {
//     return prevProps.location.pathname === nextProps.location.pathname;
// };

// export default React.memo(ManageIndustry, comparisonFn);
export default ManageIndustry







