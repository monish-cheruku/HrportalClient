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
import { getexperiencelevelsaction, createexperiencelevelaction, updateexperiencelevelaction, ExperienceLevel } from "../features/ExperienceLevel/experiencelevelslice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { act } from "react-dom/test-utils";
import { FilterMatchMode } from "primereact/api";
import { InputNumber } from "primereact/inputnumber";
// import '../../index.css';
const ManageExperiencelevel = () => {
    const [productDialog, setProductDialog] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [cities, setCities] = useState([]);
    const [experiencelevelid, setexperiencelevelid] = useState(0);
    const [experiencelevel, setexperiencelevel] = useState("");
    const [experiencelevelrange, setexperiencelevelrange] = useState(0);
    const [active, setActive] = useState<boolean>(true);
    const [data, Setdata] = useState([]);
    const [editmode, setEditmode] = useState(false);
    const [globalFilterValue2, setGlobalFilterValue2] = useState("");
    const [filters2, setFilters2] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    const experiencelevelsdata = useSelector((state: RootState) => state.experiencelevel);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getexperiencelevelsaction());
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
                <h3>Manage Experience Level</h3>
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
                        setexperiencelevelrange(0);
                        setexperiencelevel("");
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
                        setexperiencelevelrange(0);
                        setexperiencelevel("");
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
                <h2>Manage experiencelevel</h2>
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
                        console.log(data)
                        setexperiencelevelid(data.ExperienceLevelId);
                        setexperiencelevelrange(data.ExperienceRange);
                        setexperiencelevel(data.ExperienceLevel);
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
                    console.log(experiencelevel);
                    console.log(experiencelevelrange);
                    console.log(active);
                    var c = {
                        ExperienceLevelId: experiencelevelid,
                        ExperienceLevel: experiencelevel,
                        ExperienceRange: experiencelevelrange,
                        Active: active,
                    };
                    if (editmode === false) {
                        dispatch(createexperiencelevelaction({                           
                            ExperienceLevel: experiencelevel,
                            ExperienceRange: experiencelevelrange,
                            Active: active,
                        }));
                    } else {
                        dispatch(updateexperiencelevelaction(c));
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
        <div className="ManageExperienceLevel">
            {/* <Counter></Counter>
      <QuotesComp></QuotesComp> */}
            <div>
                <div>
                    <DataTable value={experiencelevelsdata} showGridlines={false} responsiveLayout="scroll" paginator={true} rows={5} globalFilterFields={["ExperienceLevel", "ExperienceLevelRange", "Active"]} filters={filters2} header={Headercomp}>
                        <Column field="ExperienceLevel" header="Experience Level " sortable></Column>
                        <Column field="ExperienceRange" header="Experience Level Range" body={(d)=><div>{d.ExperienceRange?.toString()}</div>}sortable dataType="number"></Column>
                        <Column field="Active" header="Active" sortable dataType="boolean" body={activediv}></Column>
                        <Column field="edit" header="Edit" body={actionBodyTemplate} exportable={false}></Column>
                    </DataTable>
                </div>

                <Dialog visible={productDialog} style={{ width: "450px" }} header={editmode?"Edit Experience Levels Information ":"Add Experience Levels Information "} modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                    <div className="field">
                        <label htmlFor="ExperienceLevel<">ExperienceLevel </label>
                        <InputText id=" ExperienceLevel"  maxLength={100} onChange={(e) => setexperiencelevel(e.target.value)} value={experiencelevel}></InputText>

                        <br />
                        <br />
                        <div className="field">
                            <label htmlFor="ExperienceLevelRange">ExperienceLevel Range</label>
                            <InputNumber id="ExperienceLevelRange" onChange={(e) => setexperiencelevelrange(e.value)} value={experiencelevelrange}></InputNumber>
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
const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(ManageExperiencelevel, comparisonFn);
