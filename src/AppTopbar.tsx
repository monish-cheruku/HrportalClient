import React, { useEffect, useLayoutEffect, useRef, useState }  from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import BelcanLogo from "./assets/demo/flags/belcanLogo.JPG";
import { ILogin, logout } from './features/Login/Loginslice';
import { RootState } from './app/store';
import { useSelector } from 'react-redux';
import { TieredMenu } from 'primereact/tieredmenu';
import { useDispatch } from 'react-redux';
import { Menubar } from 'primereact/menubar';
import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';
// import { MenuItem } from 'primereact/menuitem';
import { PanelMenu } from 'primereact/panelmenu';
import { Dock } from 'primereact/dock';
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
    const menu = useRef(null);
    const profile = useRef(null);
    const navigate=useNavigate()
    const Logindata:ILogin = useSelector((state: RootState) => state.Login);
    const dispatch=useDispatch()
    const [profilemenuitems,setprofilemenuitems] =useState( [
       
      
        {
            label: 'Profile',
            icon: 'pi pi-fw pi-user',
            items: [
                {
                    label: 'Settings',
                    icon: 'pi pi-fw pi-cog'
                },
                {
                    label: 'Billing',
                    icon: 'pi pi-fw pi-file'
                }
            ]
        },

        {
            label: 'Roles',
            icon: 'pi pi-fw pi-user-plus',
            items:[{
                    label: 'Settings',
                    icon: 'pi pi-fw pi-cog'
                },
                {
                    label: 'Billing',
                    icon: 'pi pi-fw pi-file'
                }]
            
        },
        {
            label: 'Quit',
            icon: 'pi pi-fw pi-sign-out',
            command:()=>dispatch(logout())

        }
    ]);
    useEffect(()=>{
        // console.log(Logindata)
        // console.log(profilemenuitems)
        // console.log( profilemenuitems.filter((i)=>i.label=="Roles")[0])
        var temproles:any=[]
        Logindata.groups.forEach(element => {
            temproles.push(
                {
            "label": element.name,
            "icon": 'pi pi-fw pi-user-plus',
           
        }
        )
    }
    )
    // console.log(temproles)
// var temptemp=JSON.parse(JSON.stringify(  profilemenuitems))
// // var temptemp={...profilemenuitems}
// console.log(temptemp)
//     //  temptemp=profilemenuitems.filter((i)=>i.label=="Roles")[0].items=temproles
//      temptemp=profilemenuitems[1].items=temproles

//        setprofilemenuitems(temptemp)




setprofilemenuitems([
       
      
    {
        label: 'Profile',
        icon: 'pi pi-fw pi-user',
        items: [
            // {
            //     label: 'Settings',
            //     icon: 'pi pi-fw pi-cog'
            // },
            // {
            //     label: 'Billing',
            //     icon: 'pi pi-fw pi-file'
            // },
            {
                label: 'Quit',
                icon: 'pi pi-fw pi-sign-out',
                command:()=>dispatch(logout()),
        
        
            }
        ]
    },

    {
        label: 'Roles',
        icon: 'pi pi-fw pi-user-plus',
        items:temproles
        
    },
    
])
// setprofilemenuitems(...profilemenuitems,profilemenuitems["1"].items=temproles)
        // console.log(profilemenuitems)
    },[])
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
// console.log(Logindata.groups.some(
//     function checkAge(i) {
//         return i.name== "Administrator";
//       }



// ))

    })
    const Adminmenuitems = [
       
        // {
            // label: 'Administration',
            // label: 'Administration', icon: 'pi pi-fw pi-search',
            // items: [
               
                

                {
                    label: 'Industry', icon: 'pi pi-fw pi-bookmark',command:()=>navigate("/Industry")

                },
                {
                    label: 'Company', icon: 'pi pi-fw pi-bookmark', command:()=>navigate("/Managecompany"),
                },
                {
                    label: 'Businessunit', icon: 'pi pi-fw pi-bookmark',  command:()=>navigate("/ManageBusinessUnit"),
                },
                {
                    label: 'Service Line', icon: 'pi pi-fw pi-bookmark',   command:()=>navigate("/serviceline"),
                },
                // {
                //     label: 'Roles', icon: 'pi pi-fw pi-bookmark',to: '/manage Roles' ,
                // },



                {
                    label: 'Customer', icon: 'pi pi-fw pi-bookmark',  command:()=>navigate("/ManageCustomer"),
                },
                {
                    label: 'Location', icon: 'pi pi-fw pi-bookmark',  command:()=>navigate("/Location"),
                },

                {
                    label: 'Experience Level', icon: 'pi pi-fw pi-bookmark',  command:()=>navigate("/ManageExperienceLevel"),
                },
                {

                    label: 'Avg CTC/Bill Rate', icon: 'pi pi-fw pi-bookmark',   command:()=>navigate("/AvgCTC"),

                },
                {
                    label: 'Designation', icon: 'pi pi-fw pi-bookmark',   command:()=>navigate("/ManageDesignation"),
                },
                {
                    label: 'UserRoles', icon: 'pi pi-fw pi-bookmark',    command:()=>navigate("/userroles"),
                },
                {

                    label: 'Band', icon: 'pi pi-fw pi-bookmark',    command:()=>navigate("/Band"),

                },
                {
                    label: 'SubBand', icon: 'pi pi-fw pi-bookmark', command:()=>navigate("/ManageSubBand"),
                },


                {

                    label: 'Insurance/Accident Limit', icon: 'pi pi-fw pi-bookmark',    command:()=>navigate("/Insurance"),

                }


        

    ];
    
    return (
        <div className="layout-topbar">
            {/* <span style={{position:"fixed",left:"0px"}}> */}

            {/* <button type="button" className="p-link  layout-menu-button layout-topbar-button" onClick={props.onToggleMenuClick}>
                <i className="pi pi-bars"/>
            </button> */}
            {/* </span> */}
            {/* <span style={{width:"50px"}}></span> */}
          {  <Link to="/dashboard" className="layout-topbar-logo mr-4" style={{color:'white'}}>
                <img src={props.layoutColorMode === 'light' ? BelcanLogo : BelcanLogo} alt="logo"/>
                
            </Link>}
            {/* <span className="layout-topbar-logo" style={{ color:'white'}}>HR WORKFLOW</span> */}

            <button type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={props.onMobileTopbarMenuClick}>
                <i className="pi pi-ellipsis-v" />
            </button>


{/* <Menubar model={nestedMenuitems}  end={null}></Menubar> */}
{/* <Menu model={nestedMenuitems}  >
</Menu> */}

                <Button  className="mr-2" label="Dashboard" icon="pi pi-bars" onClick={(event) => navigate('/dashboard')} />
{Logindata.groups.some(
    function checkAge(i) {
        return i.name== "Administrator";
      }



)&&<><Menu model={Adminmenuitems} popup ref={menu} id="popup_menu" />
                <Button label="Administration" icon="pi pi-users" onMouseEnter={(event) => menu.current.toggle(event)}  aria-controls="popup_menu" aria-haspopup />
                </>}
           {/* <Menubar  model={Adminmenuitems} style={{backgroundColour:"blue"}} ></Menubar> */}



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
                    <span style={{color:"white",fontSize:16,marginTop:10,paddingRight:"20px"}}>{Logindata.first_name +" , " +Logindata.last_name}</span>
                    {/* <span> , </span> */}
                    {/* <span>{Logindata.last_name}</span> */}
                    <span> </span>
                    {/* <TieredMenu model={[tieredMenuItems]}  /> */}
                    <Menu model={profilemenuitems} popup ref={profile} id="popup_menu1" ></Menu>

                    <li>
                        <button className="p-link layout-topbar-button" onClick={(event) => profile.current.toggle(event)} aria-controls="popup_menu1" aria-haspopup>
                            <i className="pi pi-user"/>
                            <span>Profile</span>
                        </button>
                    </li>
                </ul>
        </div>
    );
}
