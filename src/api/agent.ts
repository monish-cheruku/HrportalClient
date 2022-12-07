import axios, { AxiosResponse } from "axios";
import {Company} from "../features/Company/companyslice"
import {BusinessUnit} from "../features/BusinessUnit/businessunitslice"
import {Customer} from "../features/Customer/customerslice"
import {ExperienceLevel} from "../features/ExperienceLevel/experiencelevelslice"
import {Designation} from "../features/Designation/designationslice"
import {SubBand} from "../features/SubBand/subbandslice"
import {store} from '../app/store'

import { createtoast } from '../features/ToastSlice'
import {UserRoles} from "../features/UserRoles/userroleslice"




// import {Band} from "../features/Band/bandslice"

// axios.defaults.baseURL = 'http://10.154.20.197:8000/api';
// axios.defaults.baseURL = 'http://127.0.0.1:8000/api';
axios.defaults.baseURL = 'http://10.154.155.88:8000/api';
// axios.defaults.baseURL = 'http://10.154.20.121:8000/api';
//http://10.154.28.148:8000/api/     monish//
//http://10.154.155.152:8000/api      /dwaraka
axios.interceptors.response.use(undefined, (error) => {
  if (error.message === "Network Error" && !error.response) {
    console.log("Network error - make sure API is running!");
    // alert("error : "+error)
    store.dispatch(createtoast({

      id:34,

      status:"error",

      data:"Network error - make sure API is running!",

      endpoint:"400"

  }
  )
  )

  return
  }
  const { status, data, config } = error.response;
  if(error.response.data==undefined){console.log("Please Check Internet Connection")
  store.dispatch(createtoast({

    id:34,

    status:"info",

    data:"please check Internet Connection",

    endpoint:"400"

}))

  return
}
 
  if (status === 404) {
    console.log("404 errosr in API "+error.config.url+"  -->  "+error.response.data.message)
  }
 
  if (
    status === 400
   
  ) {
    // history.push("/notfound");
    console.log(error)
  }
  if (status === 500) {
    console.log("Server error - check the terminal for more info!");
  }
  if(status>500)console.log("Server error - check the terminal for more info!");
  throw error.response;
});

const responseBody = (response: AxiosResponse) => response.data;
const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    del: (url: string) => axios.delete(url).then(responseBody),
  };


export const Login={
  login:(data)=>requests.post('/login',data)
}
export const companyapi={
  getallcompaniesdata:()=>requests.get(`/company`),
  createcompany:(data)=>requests.post("/company",data),
  updatecompany:(data)=>requests.put("/company",data)
}
export const businessunitapi={
  getallbusinessunitsdata:()=>requests.get(`/businessunit`),
  createbusinessunit:(data)=>requests.post("/businessunit",data),
  updatebusinessunit:(data)=>requests.put("/businessunit",data)
}
export const Customerapi={
  getallcustomersdata:()=>requests.get(`/Customer`),
  createcustomer:(data)=>requests.post("/Customer",data),
  updatecustomer:(data)=>requests.put("/Customer",data)
}
export const Experienceapi={
  getallexperiencelevelsdata:()=>requests.get(`/Experience`),
  createexperiencelevel:(data)=>requests.post("/Experience",data),
  updateexperiencelevel:(data)=>requests.put("/Experience",data)
}
export const Designationapi={
  getalldesignationsdata:()=>requests.get(`/Designation`),
  createdesignation:(data)=>requests.post("/Designation",data),
  updatedesignation:(data)=>requests.put("/Designation",data)
}
export const SubBandapi={
  getallsubbandsdata:()=>requests.get(`/SubBand`),
  createsubband:(data)=>requests.post("/SubBand",data),
  updatesubband:(data)=>requests.put("/SubBand",data)
}
export const servicelineapi={

  getallservicelinedata:()=>requests.get("/serviceline"),

  createserviceline:(data)=>requests.post("/serviceline",data),

  updateserviceline:(data)=>requests.put("/serviceline",data)

}

export const Locationapi={

  getallLocationdata:()=>requests.get("/Location"),

  createLocation:(data)=>requests.post("/Location",data),

  updateLocation:(data)=>requests.put("/Location",data)

}

export const Bandapi={

  getallBanddata:()=>requests.get("/Band"),

  createBand:(data)=>requests.post("/Band",data),

  updateBand:(data)=>requests.put("/Band",data)

}
export const AvgCTCapi={

  getallManageBilldata:()=>requests.get("/AvgCTC"),

  createManageBill:(data)=>requests.post("/AvgCTC",data),

  updateManageBill:(data)=>requests.put("/AvgCTC",data)

}



export const insuranceapi={

  getallInsurancedata:()=>requests.get("/Insurance"),

  createInsurance:(data)=>requests.post("/Insurance",data),

  updateInsurance:(data)=>requests.put("/Insurance",data)

}
export const userrolesapi={
  getalluserrolesdata:()=>requests.get(`/UserRoles`),
  createuserroles:(data)=>requests.post("/UserRoles",data),
  updateuserroles:(data)=>requests.put("/UserRoles",data)
}
export const Rolesapi={
  getallRolesdata:()=>requests.get(`/Roles`),


}
export const AdUsersapi={

  getallAdUsersdata:()=>requests.get("/AdUsers"),

  createAdUsers:(data)=>requests.post("/AdUsers",data),

  updateAdUsers:(data)=>requests.put("/AdUsers",data)

}


export const Industryapi={

  getallIndustrydata:()=>requests.get("/Industry"),

  createIndustry:(data)=>requests.post("/Industry",data),

  updateIndustry:(data)=>requests.put("/Industry",data)

}

export const jobpostactions={
  getalljobpostactiondata:(data)=>requests.post("jobpost/jobpostactionsdetails",data),
  jobpostactionssubmit:(data)=>requests.post("jobpost/jobpostactionssubmit",data),
  usersbyroles:(data)=>requests.post("jobpost/usersbyrole",data),
  createjobpost:(data)=>requests.post("jobpost/addjobpost",data),
  updatejobpost:(data)=>requests.put("jobpost/addjobpost",data),
  myjobposts:(data)=>requests.post("jobpost/myjobposts",data)
}

export const generatepdf={
  downloadpdf:(data)=>requests.post("/pdf",data),
}
export const candidateactions = {
  getallcandidatedata:(data)=>requests.post("candidate/gridcandidates",data),
  createcandidate:(data)=>requests.post("candidate/addcandidate",data),
  updatecandidate:(data)=>requests.put("candidate/addcandidate",data)

}



