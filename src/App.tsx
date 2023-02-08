import React, { useState, useEffect, useRef ,lazy,Suspense} from 'react';
import classNames from 'classnames';
import { Route, useLocation, Routes, Navigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import { AppTopbar } from './AppTopbar';
import { AppFooter } from './AppFooter';
import { AppMenu } from './AppMenu';
import { AppConfig } from './AppConfig';

import PrimeReact from 'primereact/api';
import { Tooltip } from 'primereact/tooltip';

import 'primereact/resources/primereact.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'prismjs/themes/prism-coy.css';
import './assets/demo/flags/flags.css';
import './assets/demo/Demos.scss';
import './assets/layout/layout.scss';

import { Toast } from 'primereact/toast';

import { createtoast, Toaster, toastreset } from '../src/features/ToastSlice'
import { useDispatch } from 'react-redux';

import { useSelector } from 'react-redux';

import { RootState } from './app/store';
import { ILogin } from './features/Login/Loginslice';
import Newcomp from './Newcomp';
import { ProgressSpinner } from "primereact/progressspinner";
import SelectedCandidateDetailsView from './pages/DashboardComponents/SelectedCandidatesHiringManager/SelectedCandidateDetailsView';
const Acknowledgementpage =lazy(()=>import( './pages/candidateinfo/candidateinfocomponents/Acknowledgementpage'));

const  ManageCompany=lazy(()=>import("./pages/ManageCompany")) ;
const Dashboard =lazy(()=>import("./pages/Dashboard"));
const ManageBusinessUnit =lazy(()=>import("./pages/ManageBusinessUnit"));
const ManageCustomer =lazy(()=>import("./pages/ManageCustomer"));
const ManageExperienceLevel =lazy(()=>import("./pages/ManageExperienceLevel"));
const ManageDesignation =lazy(()=>import("./pages/ManageDesignation"));
const ManageSubBand =lazy(()=>import("./pages/ManageSubBand"));
const  ServiceLine=lazy(()=>import("./pages/ServiceLine"));
const  Location=lazy(()=>import("./pages/Location"));
const  ManageBand=lazy(()=>import("./pages/ManageBand"))
const  ManageBill=lazy(()=>import("../src/pages/ManageBillrate"))
const  ManageInsurance=lazy(()=>import("./pages/ManageInsurance"));
const  Industry=lazy(()=>import("./pages/Industry"));
const  UserRoles =lazy(()=>import('./pages/UserRoles'));
const LoginPage =lazy(()=>import('./LoginPage'));
const JobpostsactionApproval =lazy(()=>import('./pages/DashboardComponents/JobPostActionsHiringManager/JobpostsactionApproval'));
const CreateJobPost =lazy(()=>import('./pages/DashboardComponents/CreateJobPost'));
const Jobpostdetailedview =lazy(()=>import('./pages/DashboardComponents/Jobpostdetailedview'));
const CreateCandidateProfile =lazy(()=>import('./pages/Candidate/CreateCandidateProfile'))
const JobPostProfileUpload =lazy(()=>import("./pages/DashboardComponents/JobPostActionsHiringManager/JobPostsProfileUpload"))
const CandidateDetailsview =lazy(()=>import('./pages/DashboardComponents/CandidateDetailsview'));
const CandidateReview =lazy(()=>import('./pages/DashboardComponents/CandidateActionHiringManager/CandidateReview'));
const CandidateShortlist =lazy(()=>import('./pages/DashboardComponents/CandidateActionHiringManager/CandidateShortlist'));
const HiringmanagerInterview =lazy(()=>import('./pages/InterviewComponents/HiringmanagerInterview'));
const HiringManagerin2 =lazy(()=>import('./pages/InterviewComponents/HiringManagerin2'));
const HRInterview =lazy(()=>import('./pages/InterviewComponents/HRInterview'));
const BusinessHeadApproval =lazy(()=>import('./pages/DashboardComponents/BusinessHeadApproval'));
const GeneralManagerApproval =lazy(()=>import( './pages/DashboardComponents/GeneralManagerApproval'));
const FinanceControllerApproval=lazy(()=>import('./pages/DashboardComponents/FinanceControllerApproval'));
const SelectedCandidatesHold=lazy(()=>import('./pages/DashboardComponents/SelectedCandidatesHold'));
const SelectedCandidates =lazy(()=>import('./pages/DashboardComponents/SelectedCandidatesHiringManager/SelectedCandidates'));
const SelectedCandidatesHRHold =lazy(()=>import('./pages/DashboardComponents/SelectedCandidatesHRHold'));
const SelectedCandidateDetails=lazy(()=>import('./pages/DashboardComponents/SelectedCandidatesHiringManager/SelectedCandidateDetails'));
const Candidateinfo =lazy(()=>import('./pages/candidateinfo/Candidateinfo'));
const PersonalDetails =lazy(()=>import('./pages/candidateinfo/candidateinfocomponents/PersonalDetails'));

const App = () => {
    const toastdata = useSelector((state: RootState) => state.toaster)
    const state = useSelector((state: RootState) => state)
    const [layoutMode, setLayoutMode] = useState('static');
    const [layoutColorMode, setLayoutColorMode] = useState<any>('light')
    const [inputStyle, setInputStyle] = useState('outlined');
    const [ripple, setRipple] = useState(true);
    const [staticMenuInactive, setStaticMenuInactive] = useState(false);
    const [overlayMenuActive, setOverlayMenuActive] = useState(false);
    const [mobileMenuActive, setMobileMenuActive] = useState(false);
    const [mobileTopbarMenuActive, setMobileTopbarMenuActive] = useState(false);
    const copyTooltipRef = useRef<any>();
    const location = useLocation();
    const toast = useRef(null);
    const dispatch = useDispatch()
    PrimeReact.ripple = true;
    var Logindata: ILogin = useSelector((state: RootState) => state.Login);

    let menuClick = false;
    let mobileTopbarMenuClick = false;

    useEffect(() => {

        if (mobileMenuActive) {
            addClass(document.body, "body-overflow-hidden");
        } else {
            removeClass(document.body, "body-overflow-hidden");
        }
    }, [mobileMenuActive]);
    useEffect(() => {

        copyTooltipRef && copyTooltipRef.current && copyTooltipRef.current.updateTargetEvents();

    }, [location]);

    useEffect(() => {
        // console.log(toastdata)
        if (toastdata.id != 1)
            if (toast.current ? toastdata.data != "" : false) {

                if (toastdata.status == "error")
                    toast.current.show({ severity: toastdata.status, summary: toastdata.status + " in " + toastdata.endpoint, detail: toastdata.data, life: 3000 });
                else
                    toast.current.show({ severity: toastdata.status, summary: toastdata.status, detail: toastdata.data, life: 3000 });
                dispatch(toastreset())
            }

    }, [toastdata])


    useEffect(() => {
        copyTooltipRef && copyTooltipRef.current && copyTooltipRef.current.updateTargetEvents();
    }, [location]);
    useEffect(() => {
        // console.log(state)
    }, [])

    const onInputStyleChange = (inputStyle: React.SetStateAction<string>) => {
        setInputStyle(inputStyle);
    }

    const onRipple = () => {
        PrimeReact.ripple = !PrimeReact.ripple;
        setRipple(!PrimeReact.ripple)
    }

    const onLayoutModeChange = (mode: React.SetStateAction<string>) => {
        setLayoutMode(mode)
    }

    const onColorModeChange = (mode: React.SetStateAction<string>) => {
        setLayoutColorMode(mode.toString())
    }

    const onWrapperClick = (event: any) => {
        if (!menuClick) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }

        if (!mobileTopbarMenuClick) {
            setMobileTopbarMenuActive(false);
        }

        mobileTopbarMenuClick = false;
        menuClick = false;
    }
    const onToggleMenuClick = (event: { preventDefault: () => void; }) => {
        menuClick = true;

        if (isDesktop()) {
            if (layoutMode === 'overlay') {
                if (mobileMenuActive === true) {
                    setOverlayMenuActive(true);
                }

                setOverlayMenuActive((prevState) => !prevState);
                setMobileMenuActive(false);
            }
            else if (layoutMode === 'static') {
                setStaticMenuInactive((prevState) => !prevState);
            }
        }
        else {
            setMobileMenuActive((prevState) => !prevState);
        }

        event.preventDefault();
    }

    const onSidebarClick = () => {
        menuClick = true;
    }

    const onMobileTopbarMenuClick = (event: { preventDefault: () => void; }) => {
        mobileTopbarMenuClick = true;

        setMobileTopbarMenuActive((prevState) => !prevState);
        event.preventDefault();
    }

    const onMobileSubTopbarMenuClick = (event: { preventDefault: () => void; }) => {
        mobileTopbarMenuClick = true;

        event.preventDefault();
    }

    const onMenuItemClick = (event: { item: { items: any; }; }) => {
        if (!event.item.items) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }
    }
    const isDesktop = () => {
        return window.innerWidth >= 992;
    }

    const menu = [
        {
            label: 'Home',
            items: [
                // {label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/'},
                { label: 'Dashboard', icon: 'pi pi-fw pi-Hospital', to: '/dashboard' },
            ]
        },
        {
            label: 'Administration',
            // label: 'Administration', icon: 'pi pi-fw pi-search',
            items: [


                {
                    label: 'Industry', icon: 'pi pi-fw pi-bookmark', to: '/Industry'

                },
                {
                    label: 'Company', icon: 'pi pi-fw pi-bookmark', to: '/Managecompany',
                },
                {
                    label: 'Businessunit', icon: 'pi pi-fw pi-bookmark', to: '/ManageBusinessUnit',
                },
                {
                    label: 'Service Line', icon: 'pi pi-fw pi-bookmark', to: '/serviceline',
                },
                // {
                //     label: 'Roles', icon: 'pi pi-fw pi-bookmark',to: '/manage Roles' ,
                // },



                {
                    label: 'Customer', icon: 'pi pi-fw pi-bookmark', to: '/ManageCustomer',
                },
                {
                    label: 'Location', icon: 'pi pi-fw pi-bookmark', to: '/Location',
                },

                {
                    label: 'Experience Level', icon: 'pi pi-fw pi-bookmark', to: '/ManageExperienceLevel',
                },
                {

                    label: 'Avg CTC/Bill Rate', icon: 'pi pi-fw pi-bookmark', to: '/AvgCTC',

                },
                {
                    label: 'Designation', icon: 'pi pi-fw pi-bookmark', to: '/ManageDesignation',
                },
                {
                    label: 'UserRoles', icon: 'pi pi-fw pi-bookmark', to: '/userroles',
                },
                {

                    label: 'Band', icon: 'pi pi-fw pi-bookmark', to: '/Band',

                },
                {
                    label: 'SubBand', icon: 'pi pi-fw pi-bookmark', to: '/ManageSubBand',
                },


                {

                    label: 'Insurance/Accident Limit', icon: 'pi pi-fw pi-bookmark', to: '/Insurance',

                },


            ]
        },


    ];
    if (Logindata.groups ? !(Logindata.groups.length > 1) : true) {
        // console.log(Logindata.groups?Logindata.groups.length>1:"text")

        var ob = menu.filter((i) => i.label == "Administration")
        var i = menu.indexOf(ob[0])
        i > 0 ? menu.splice(i, 1) : console.log()

    }
    const addClass = (element: HTMLElement, className: string) => {
        if (element.classList)
            element.classList.add(className);
        else
            element.className += ' ' + className;
    }

    const removeClass = (element: HTMLElement, className: string) => {
        if (element.classList)
            element.classList.remove(className);
        else
            element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }

    const wrapperClass = classNames('layout-wrapper', {
        'layout-overlay': layoutMode === 'overlay',
        'layout-static': layoutMode === 'static',
        'layout-static-sidebar-inactive': staticMenuInactive && layoutMode === 'static',
        'layout-overlay-sidebar-active': overlayMenuActive && layoutMode === 'overlay',
        'layout-mobile-sidebar-active': mobileMenuActive,
        'p-input-filled': inputStyle === 'filled',
        'p-ripple-disabled': ripple === false,
        'layout-theme-light': layoutColorMode === 'light'
    });
    // if (Component.getLayout) {
    //     return (
    //         <LayoutProvider>
    //             {Component.getLayout(<Component {...pageProps} />)}
    //         </LayoutProvider>
    //     )
    // } else {
    function RequireAuth({ children, redirectTo }) {
        let isAuthenticated = true;
        return isAuthenticated ? children : <Navigate to={redirectTo} />;
    }
    return (
        //         <Switch>
        // <HashRouter>
        //React protected router?


<Suspense fallback={  <ProgressSpinner
            style={{ width: "100px", height: "100px",left:"50%",top:"50%"   ,position:"absolute"}}
            strokeWidth="4"
            fill="var(--surface-ground)"
            animationDuration="1s"
          />}>

        <Routes>
            <Route path="/Login" element={<LoginPage />} />
           
            <Route
                path="*"
                element={Logindata.username != "" ?
                    // <RequireAuth  redirectTo="/login">
                    <div className={wrapperClass} onClick={onWrapperClick}>
                        <div>

                            <Tooltip ref={copyTooltipRef} target=".block-action-copy" position="bottom" content="Copied to clipboard" event="focus" />
                            <Toast ref={toast} position="bottom-left" />
                            <AppTopbar onToggleMenuClick={onToggleMenuClick} layoutColorMode={layoutColorMode}
                                mobileTopbarMenuActive={mobileTopbarMenuActive} onMobileTopbarMenuClick={onMobileTopbarMenuClick} onMobileSubTopbarMenuClick={onMobileSubTopbarMenuClick} />
                            {/* <div className="layout-sidebar mw-100" onClick={onSidebarClick}>
                                    <AppMenu model={menu} onMenuItemClick={onMenuItemClick} layoutColorMode={layoutColorMode} />
                                </div> */}
                            <div className="layout-main-container">
                                <div className="layout-main">
<Suspense fallback={ <ProgressSpinner
            style={{ width: "100px", height: "100px",left:"50%",top:"50%"   ,position:"absolute"}}
            strokeWidth="4"
            fill="var(--surface-ground)"
            animationDuration="1s"
          />}>
                                    <Routes>
                                        <Route path="/dashboard" element={<Dashboard />} />
                                        <Route path="/Industry" element={<Industry />} />
                                        <Route path="/Managecompany" element={<ManageCompany />} />
                                        <Route path="/ManageBusinessUnit" element={<ManageBusinessUnit />} />
                                        <Route path="/Managecustomer" element={<ManageCustomer />} />
                                        <Route path="/ManageExperienceLevel" element={<ManageExperienceLevel />} />
                                        <Route path="/ManageDesignation" element={<ManageDesignation />} />
                                        <Route path="/ManageSubBand" element={<ManageSubBand />} />
                                        <Route path="/serviceline" element={<ServiceLine />} />
                                        <Route path="/Location" element={<Location />} />
                                        <Route path="/Band" element={<ManageBand />} />
                                        <Route path="/AvgCTC" element={<ManageBill />} />
                                        <Route path="/Insurance" element={<ManageInsurance />} />
                                        <Route path="/userroles" element={<UserRoles />} />






                                        <Route path="/jobpostsprofileupload/:JobCode" element={<JobPostProfileUpload />} />
                                        <Route path="/jobpostsactionApproval/:JobCode" element={<JobpostsactionApproval />} />
                                        <Route path="/jobpostsprofileupload/:JobCode" element={<JobPostProfileUpload />} />

                                        <Route path="/myjobposts/createjobpost" element={<CreateJobPost />} />
                                        <Route path="/myjobposts/updatejobpost" element={<CreateJobPost />} />
                                        <Route path='/jobpostdetailedview/:JobCode' element={<Jobpostdetailedview />} />
                                        <Route path="/candidate/createcandidateprofile" element={<CreateCandidateProfile />} />
                                        <Route path="/candidate/updatecandidateprofile" element={<CreateCandidateProfile />} />
                                        <Route path="/candidate/candidatedetailsview" element={<CandidateDetailsview />} />
                                        <Route path="/candidatereview/:CandidateCode" element={<CandidateReview />} />
                                        <Route path="/candidatefeedback/:CandidateCode" element={<CandidateShortlist />} />

                                        <Route path="/Interview/Hiringmanagerinterview" element={<HiringmanagerInterview></HiringmanagerInterview>} />
                                        <Route path="/Interview/Hiringmanagerinterviewi2" element={<HiringManagerin2></HiringManagerin2>} />
                                        <Route path="/Interview/HRinterview" element={<HRInterview></HRInterview>} />
                                        <Route path="/BusinessHeadApproval" element={<BusinessHeadApproval></BusinessHeadApproval>} />
                                        <Route path="/GeneralManagerApproval" element={<GeneralManagerApproval></GeneralManagerApproval>} />
                                        <Route path="/FinanceControllerApproval" element={<FinanceControllerApproval></FinanceControllerApproval>} />
                                        <Route path="/SelectedCandidatesHold" element={<SelectedCandidatesHold></SelectedCandidatesHold>} />
                                        <Route path="/SelectedCandidates" element={<SelectedCandidates></SelectedCandidates>} />
                                        <Route path="/SelectedCandidatesHRHold" element={<SelectedCandidatesHRHold></SelectedCandidatesHRHold>} />
                                        <Route path="/SelectedCandidatesdetails" element={<SelectedCandidateDetails></SelectedCandidateDetails>} />
                                        <Route path="/SelectedCandidatesdetailsview" element={<SelectedCandidateDetailsView></SelectedCandidateDetailsView>} />
                                        <Route path='/candidateinfo' element={<Candidateinfo></Candidateinfo>}></Route>
                                        <Route path='/candidateinfo/PersonalDetails' element={<PersonalDetails></PersonalDetails>}></Route>
                                        <Route path='/acknowledgementpage' element={<Acknowledgementpage></Acknowledgementpage>}></Route>
                                    </Routes>
                                    </Suspense>
                                </div>


                            </div>

                            <AppConfig rippleEffect={ripple} onRippleEffect={onRipple} inputStyle={inputStyle} onInputStyleChange={onInputStyleChange}
                                layoutMode={layoutMode} onLayoutModeChange={onLayoutModeChange} layoutColorMode={layoutColorMode} onColorModeChange={onColorModeChange} />

                            <CSSTransition classNames="layout-mask" timeout={{ enter: 200, exit: 200 }} in={mobileMenuActive} unmountOnExit>
                                <div className="layout-mask p-component-overlay"></div>
                            </CSSTransition>
                        </div>
                    </div> : <LoginPage></LoginPage>
                }
            />
          

        </Routes>
        </Suspense>

    );

}

export default App;
