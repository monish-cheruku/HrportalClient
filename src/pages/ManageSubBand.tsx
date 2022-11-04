import { Menubar } from "primereact/menubar";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import React, { useState, useEffect, Fragment } from "react";
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
import { getsubbandsaction, createsubbandaction, updatesubbandaction, SubBand } from "../features/SubBand/subbandslice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { act } from "react-dom/test-utils";
import { FilterMatchMode } from "primereact/api";
// import '../../index.css';
const ManageSubband = () => {
    const [productDialog, setProductDialog] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [cities, setCities] = useState([]);
    const [subbandid, setsubbandid] = useState(0);
    const [subbandname, setsubbandname] = useState("");
    const [bandname, setbandname] = useState("");
    const [subbanddesc, setsubbanddesc] = useState("");
    const [active, setActive] = useState<boolean>(true);
    const [data, Setdata] = useState([]);
    const [editmode, setEditmode] = useState(false);
    const [globalFilterValue2, setGlobalFilterValue2] = useState("");
    const [filters2, setFilters2] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    const subbandsdata = useSelector((state: RootState) => state.subband);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getsubbandsaction());
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
                <h2>Manage Sub Band</h2>
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
                        setsubbanddesc("");
                        setsubbandname("");
                        setbandname("");
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
                        setsubbanddesc("");
                        setsubbandname("");
                        setbandname("");
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
                <h2>Manage Sub Band</h2>
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
                        setsubbandid(data.subbandId);
                        setsubbanddesc(data.SubBandDesc);
                        setsubbandname(data.SubBandName);
                        setbandname(data.BandName);
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
                    console.log(subbandname);
                    console.log(bandname);
                    console.log(subbanddesc);
                    console.log(active);
                    var c = {
                        SubBandId: subbandid,
                        BandId: bandname,
                        SubBandName: subbandname,
                        SubBandDesc: subbanddesc,
                        Active: active,
                    };
                    if (editmode === false) {
                        dispatch(createsubbandaction( {
                            BandId: bandname,
                            SubBandName: subbandname,
                            SubBandDesc: subbanddesc,
                            Active: active,
                        }));
                    } else {
                        dispatch(updatesubbandaction(c));
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

    //  const end = <InputText placeholder="Search" type="text" />;
    const activediv = (body:any) => {
        return <div>{body.Active?"Yes":"No"}</div>;
    };
    return (
        <div className="ManageSubBand">
            {/* <Counter></Counter>
      <QuotesComp></QuotesComp> */}
            <div>
                <div>
                    <DataTable value={subbandsdata} showGridlines={false} responsiveLayout="scroll" paginator={true} rows={5} globalFilterFields={["SubBandName", "SubBandDesc", "Active"]} filters={filters2} header={Headercomp}>
                        <Column field="SubBandName" header="Sub Band Name" sortable></Column>
                        <Column field="BandName" header="Band Name" sortable></Column>
                        <Column field="SubBandDesc" header="Sub Band Description" sortable></Column>
                        <Column field="Active" header="Active" sortable dataType="boolean" body={activediv}></Column>
                        <Column field="edit" header="Edit" body={actionBodyTemplate} exportable={false}></Column>
                    </DataTable>
                </div>

                <Dialog visible={productDialog} style={{ width: "450px" }} header={editmode?"Edit Sub Bands Information ":"Add Sub Bands Information "} modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                <div className="field">
                        <label htmlFor="SubBandName<">Sub Band Name</label>
                        <InputText id=" SubBandName"  maxLength={5}onChange={(e) => setsubbandname(e.target.value)} value={subbandname}></InputText>


                    <div className="field">
                        <label htmlFor="BandName<">Band Name</label>
                        <InputText id=" BandName" onChange={(e) => setbandname(e.target.value)} value={bandname}></InputText>
                        <br />
                        <br />
                        <div className="field">
                            <label htmlFor="SubBandDesc">Sub Band Description</label>
                            <InputTextarea id="SubBandDesc"  maxLength={500} onChange={(e) => setsubbanddesc(e.target.value)} value={subbanddesc}></InputTextarea>
                        </div>

                        <div className="col-12">
                            <Checkbox inputId="Active" checked={active} onChange={(e) => setActive(!active)} />
                            <label htmlFor="binary"> Active</label>
                        </div>
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

export default React.memo(ManageSubband, comparisonFn);
