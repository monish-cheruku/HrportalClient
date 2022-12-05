import React, { useEffect }  from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import BelcanLogo from "./assets/demo/flags/belcanLogo.JPG";
import { ILogin } from './features/Login/Loginslice';
import { RootState } from './app/store';
import { useSelector } from 'react-redux';
import { TieredMenu } from 'primereact/tieredmenu';
interface Itiredmenu{
    label: string,
    icon: string,
    items: 
        {
            label: string,
            icon: string
        }[]
        
    
}
export const AppTopbar = (props) => {
    const Logindata:ILogin = useSelector((state: RootState) => state.Login);
    const tieredMenuItems:Itiredmenu= {
        label: 'Profile',
        icon: 'pi pi-fw pi-user',
        items: [
            
        ]
    }
    useEffect(()=>{

Logindata.groups?Logindata.groups.forEach(e => {
    // console.log(e.name)
    tieredMenuItems.items.push({
        label: e.name.toString(),
        icon: 'pi pi-fw pi-user'
    })
}):console.log();
// console.log(Logindata)

    })
    return (
        <div className="layout-topbar">
            <span style={{position:"fixed",left:"0px"}}>

            <button type="button" className="p-link  layout-menu-button layout-topbar-button" onClick={props.onToggleMenuClick}>
                <i className="pi pi-bars"/>
            </button>
            </span>
            <span style={{width:"50px"}}></span>
            <Link to="/" className="layout-topbar-logo" style={{color:'white'}}>
                <img height="100px" src={props.layoutColorMode === 'light' ? BelcanLogo : BelcanLogo} alt="logo"/>
                
            </Link>
            <span className="layout-topbar-logo" style={{ color:'white'}}>HR WORKFLOW</span>

            <button type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={props.onMobileTopbarMenuClick}>
                <i className="pi pi-ellipsis-v" />
            </button>

                <ul className={classNames("layout-topbar-menu lg:flex origin-top", {'layout-topbar-menu-mobile-active': props.mobileTopbarMenuActive })}>
                    {/* <li>
                        <button className="p-link layout-topbar-button" onClick={props.onMobileSubTopbarMenuClick}>
                            <i className="pi pi-calendar"/>
                            <span>Events</span>
                        </button>
                    </li>
                    <li>
                        <button className="p-link layout-topbar-button" onClick={props.onMobileSubTopbarMenuClick}>
                            <i className="pi pi-cog"/>
                            <span>Settings</span>
                        </button>
                    </li> */}
                    {/* <span>{Logindata.first_name}</span>/ */}
                    <span style={{color:"white",fontSize:20,marginTop:10,paddingRight:"20px"}}>{Logindata.first_name +" , " +Logindata.last_name}</span>
                    {/* <span> , </span> */}
                    {/* <span>{Logindata.last_name}</span> */}
                    <span> </span>
                    <TieredMenu model={[tieredMenuItems]}  />
                    <li>
                        <button className="p-link layout-topbar-button" onClick={props.onMobileSubTopbarMenuClick}>
                            <i className="pi pi-user"/>
                            <span>Profile</span>
                        </button>
                    </li>
                </ul>
        </div>
    );
}