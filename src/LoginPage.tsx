import { InputText } from 'primereact/inputtext';
import React, { useState } from 'react';
import backgroundImage from '../src/assets/demo/images/belcan_logo.png';
import backgroundImage1 from '../src/assets/demo/images/3.jpg';
import { useEffect } from 'react';
import { AppConfig } from './AppConfig';
import { ILogin, loginaction } from './features/Login/Loginslice';
import { connect, useDispatch, useSelector } from "react-redux";
import '../src/assets/layout/sass/App.scss';
import { RootState } from './app/store';
import ErrorMessage from '../src/components/form/ErrorMessage';
import { useNavigate } from 'react-router';
import { Message } from 'primereact/message';
import { candidateinfogetaction } from './features/Candidate info/candidateinfoslice';
import { personaldetailsaction } from './features/Candidate info/personaldetailsslice';

function LoginPage() {
    const [username,setusername]=useState("")
    const [password,setpassword]=useState("")
    const candidateinfodata = useSelector((state: RootState) => state.candidateinfo);

    const[hidep,sethidep]=useState(true)
    const dispatch = useDispatch();
    const Logindata:ILogin = useSelector((state: RootState) => state.Login);
const navigate=useNavigate()
    useEffect(()=>{
        console.log("login page")
        var w:any=[]
        Logindata.groups != undefined?Logindata.groups.forEach((i)=>w.push(i["name"].toString())):console.log("")
        if (w.includes("Candidate")){
           dispatch(candidateinfogetaction({
                
                "email": Logindata.email
                
                
            }))
setTimeout(()=>{

    navigate("login")
    navigate("/candidateinfo")
},1000)
        }
        else if (Logindata.username!="") {
            navigate("/dashboard")
        }
    },[Logindata.username])
    async function handlesubmit(){
        
        
        console.log(username)
        console.log(password) 
        
        await dispatch(loginaction({"User_name":username,password}))
       
        
    }
    // useEffect(()=>{ 
    //     // alert("login page")
    //     if( Logindata.username!="")
    //     history.push("/dashboard")},[Logindata.username])
    return (
        <div className="login-body">
            <div className="login-wrapper">
                <div className="login-panel">
                    <img src={backgroundImage} alt="Belcan" />
                        <div className="login-form">
                            <h2>Welcome, please use the Credientials to sign-in</h2>

                            <div className="field"><span className="p-float-label p-input-icon-right">
                                <i className="pi pi-envelope"></i><input id="email" name="email" className="p-inputtext p-component" value={username} onChange={e=>setusername(e.target.value)} /><label className="">Email*</label></span>
                            </div>
<div style={{height:"20px"}}></div>
                            <div className="field"><span className="p-float-label p-input-icon-right">
                                <i className="pi pi-eye"  style={{cursor:"pointer"}}onClick={e=>sethidep(!hidep)}></i><input type={!hidep?"text":"password"}  name="password"   className="p-inputtext p-component" value={password} onChange={e=>setpassword(e.target.value)} /><label className="">Password*</label></span>
                            </div>

                            {/* <div className="field-checkbox" style={{color:'#fff'}}>
                                <div className="p-checkbox p-component">
                                    <div className="p-hidden-accessible">
                                        <input type="checkbox" id="accept" name="accept" />
                                    </div>
                                    <div className="p-checkbox-box"><span className="p-checkbox-icon p-c"></span></div>
                                </div>
                                <label className="">Remember Me</label>
                            </div> */}
                           <h4>
                           { Logindata.error?<Message severity="error" text={Logindata.error.toString()} />:<></>}
                            </h4> 

                            <button aria-label="Submit" type="submit" onClick={e=>handlesubmit()} className="p-button p-component" ><span className="p-button-label p-c">Submit</span><span role="presentation" className="p-ink"></span></button>
                        </div>
                        {/* <ErrorMessage error={}></ErrorMessage> */}
                </div>

                <div className="login-image">
                    <img style={{width:"100%",height:"100%"}}src={backgroundImage1} alt="Belcan" />
                </div>

                
            </div>

        </div>


    )
}



// LoginPage.getLayout = function getLayout(page) {
//     return (
//         <React.Fragment>
//             {page}
//             <AppConfig simple />
//         </React.Fragment>
//     );
// };
export default LoginPage;