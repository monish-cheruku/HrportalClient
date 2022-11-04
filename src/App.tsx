import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { Route, useLocation } from 'react-router-dom';
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
import './App.scss';
import ManageCompany from './pages/ManageCompany';
import Dashboard from './pages/Dashboard';
import ManageBusinessUnit from './pages/ManageBusinessUnit';
import ManageCustomer from './pages/ManageCustomer';
import ManageExperienceLevel from './pages/ManageExperienceLevel';
import ManageDesignation from './pages/ManageDesignation';
import ManageSubBand from './pages/ManageSubBand';
import { Toast } from 'primereact/toast';
import ServiceLine from './pages/ServiceLine';

import Location from './pages/Location';

import ManageBand from './pages/ManageBand'

import ManageBill from '../src/pages/ManageBillrate'

import ManageInsurance from './pages/ManageInsurance';
import Industry from './pages/Industry';

import { createtoast, Toaster} from '../src/features/ToastSlice'

import { useDispatch } from 'react-redux';

import { useSelector } from 'react-redux';

import { RootState } from './app/store';



const App = () => {
    const toastdata=useSelector((state:RootState)=>state.toaster)
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
    PrimeReact.ripple = true;

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

useEffect(()=>{

    // var {status,data,endpoint}=toastdata

   

    // if(toastdata.status=="success")
    if (toastdata.data!=""){

        if(toastdata.status=="error")
        toast.current.show({severity:toastdata.status, summary: toastdata.status+" in "+toastdata.endpoint, detail:toastdata.data, life: 3000});
       else
        toast.current.show({severity:toastdata.status, summary: toastdata.status, detail:toastdata.data, life: 3000});
    }



},[toastdata])
    useEffect(() => {
        copyTooltipRef && copyTooltipRef.current && copyTooltipRef.current.updateTargetEvents();
    }, [location]);

    const onInputStyleChange = (inputStyle: React.SetStateAction<string>) => {
        setInputStyle(inputStyle);
    }

    const onRipple = () => {
        PrimeReact.ripple =! PrimeReact.ripple ;
        setRipple(! PrimeReact.ripple )
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
                {label: 'Dashboard', icon: 'pi pi-fw pi-Hospital', to: '/'}
            ]
        },
        {
            label: 'Administration',
            // label: 'Administration', icon: 'pi pi-fw pi-search',
            items: [
                
                
                        {
                            label: 'Company', icon: 'pi pi-fw pi-bookmark',to: '/Managecompany' ,
                        },
                        {
                            label: 'Businessunit', icon: 'pi pi-fw pi-bookmark',to: '/ManageBusinessUnit' ,
                        },
                        {
                            label: 'Service Line', icon: 'pi pi-fw pi-bookmark',to: '/serviceline' ,
                        },
                        // {
                        //     label: 'Roles', icon: 'pi pi-fw pi-bookmark',to: '/manage Roles' ,
                        // },



                        {
                            label: 'Customer', icon: 'pi pi-fw pi-bookmark',to: '/ManageCustomer' ,
                        },
                        {
                            label: 'Location', icon: 'pi pi-fw pi-bookmark',to: '/Location' ,
                        }, 
                                                
                        {
                            label: 'Experience Level', icon: 'pi pi-fw pi-bookmark',to: '/ManageExperienceLevel' ,
                        },
                        {

                            label: 'Avg CTC/Bill Rate', icon: 'pi pi-fw pi-bookmark',to: '/AvgCTC' ,

                        },
                        {
                            label: 'Designation', icon: 'pi pi-fw pi-bookmark',to: '/ManageDesignation' ,
                        },
                        {

                            label: 'Band', icon: 'pi pi-fw pi-bookmark',to: '/Band' ,

                        },
                        {
                            label: 'SubBand', icon: 'pi pi-fw pi-bookmark',to: '/ManageSubBand' ,
                        },


                        {

                            label: 'Insurance/Accident Limit', icon: 'pi pi-fw pi-bookmark',to: '/Insurance' ,

                        },
                        
                        {
                            label: 'Industry', icon: 'pi pi-fw pi-bookmark',to: '/Industry' 

                        }





                        // {
                        //     label: 'Manage Company', icon: 'pi pi-fw pi-bookmark',
                        //     items: [
                        //         { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
                        //         { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
                        //         { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' },
                        //     ]
                        // },
                      
               
            ]
        },
       
       
    ];

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

    return (
        <div className={wrapperClass} onClick={onWrapperClick}>
            <Tooltip ref={copyTooltipRef} target=".block-action-copy" position="bottom" content="Copied to clipboard" event="focus" />
            <Toast ref={toast} position="bottom-left" />
            <AppTopbar onToggleMenuClick={onToggleMenuClick} layoutColorMode={layoutColorMode}
                mobileTopbarMenuActive={mobileTopbarMenuActive} onMobileTopbarMenuClick={onMobileTopbarMenuClick} onMobileSubTopbarMenuClick={onMobileSubTopbarMenuClick} />


            <div className="layout-sidebar mw-100" onClick={onSidebarClick}>
                <AppMenu model={menu} onMenuItemClick={onMenuItemClick} layoutColorMode={layoutColorMode} />
            </div>
            <div className="layout-main-container">
                <div className="layout-main">


                    <Route path="/" exact component={Dashboard} />
                    <Route path="/Managecompany" component={ManageCompany} />
                    <Route path="/ManageBusinessUnit" component={ManageBusinessUnit} />
                    <Route path="/Managecustomer" component={ManageCustomer} />
                    <Route path="/ManageExperienceLevel" component={ManageExperienceLevel} />
                    <Route path="/ManageDesignation" component={ManageDesignation} />     
                    <Route path="/ManageSubBand" component={ManageSubBand} />
                    <Route path="/serviceline" component={ServiceLine}/>
                    <Route path="/Location" component={Location}/>
                    <Route path="/Band" component={ManageBand}/>
                    <Route path="/AvgCTC" component={ManageBill}/>
                    <Route path="/Insurance" component={ManageInsurance}/>
                    <Route path="/Industry" component={Industry}/>



                  
                   
                   
                </div>

                {/* < AppFooter layoutColorMode={layoutColorMode} /> */}
            </div>

            <AppConfig rippleEffect={ripple} onRippleEffect={onRipple} inputStyle={inputStyle} onInputStyleChange={onInputStyleChange}
                layoutMode={layoutMode} onLayoutModeChange={onLayoutModeChange} layoutColorMode={layoutColorMode} onColorModeChange={onColorModeChange} />

            <CSSTransition classNames="layout-mask" timeout={{ enter: 200, exit: 200 }} in={mobileMenuActive} unmountOnExit>
                <div className="layout-mask p-component-overlay"></div>
            </CSSTransition>

        </div>
    );

}

export default App;
