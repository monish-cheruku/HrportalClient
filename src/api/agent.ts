import axios, { AxiosResponse } from "axios";
import {Company} from "../features/Company/companyslice"
import {BusinessUnit} from "../features/BusinessUnit/businessunitslice"
import {Customer} from "../features/Customer/customerslice"
import {ExperienceLevel} from "../features/ExperienceLevel/experiencelevelslice"
import {Designation} from "../features/Designation/designationslice"
import {SubBand} from "../features/SubBand/subbandslice"
import {store} from '../app/store'

import { createtoast } from '../features/ToastSlice'




// import {Band} from "../features/Band/bandslice"

axios.defaults.baseURL = 'http://10.154.155.171:8000/api';
//http://10.154.28.148:8000/api/     monish//
//http://10.154.155.152:8000/api      /dwaraka
axios.interceptors.response.use(undefined, (error) => {
  if (error.message === "Network Error" && !error.response) {
    console.log("Network error - make sure API is running!");
    store.dispatch(createtoast({

      id:34,

      status:"error",

      data:"Network error - make sure API is running!",

      endpoint:"400"

  }))

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


const quotes={
        getdataof: (id: number) => axios.get(`https://dummyjson.com/quotes/${id}`),
}

const companyapi={
  getallcompaniesdata:()=>requests.get(`/company`),
  createcompany:(data)=>requests.post("/company",data),
  updatecompany:(data)=>requests.put("/company",data)
}
const businessunitapi={
  getallbusinessunitsdata:()=>requests.get(`/businessunit`),
  createbusinessunit:(data)=>requests.post("/businessunit",data),
  updatebusinessunit:(data)=>requests.put("/businessunit",data)
}
const Customerapi={
  getallcustomersdata:()=>requests.get(`/Customer`),
  createcustomer:(data)=>requests.post("/Customer",data),
  updatecustomer:(data)=>requests.put("/Customer",data)
}
const Experienceapi={
  getallexperiencelevelsdata:()=>requests.get(`/Experience`),
  createexperiencelevel:(data)=>requests.post("/Experience",data),
  updateexperiencelevel:(data)=>requests.put("/Experience",data)
}
const Designationapi={
  getalldesignationsdata:()=>requests.get(`/Designation`),
  createdesignation:(data)=>requests.post("/Designation",data),
  updatedesignation:(data)=>requests.put("/Designation",data)
}
const SubBandapi={
  getallsubbandsdata:()=>requests.get(`/SubBand`),
  createsubband:(data)=>requests.post("/SubBand",data),
  update:(data)=>requests.put("/SubBand",data)
}
const servicelineapi={

  getallservicelinedata:()=>requests.get("/serviceline"),

  createserviceline:(data)=>requests.post("/serviceline",data),

  updateserviceline:(data)=>requests.put("/serviceline",data)

}

const Locationapi={

  getallLocationdata:()=>requests.get("/Location"),

  createLocation:(data)=>requests.post("/Location",data),

  updateLocation:(data)=>requests.put("/Location",data)

}

const Bandapi={

  getallBanddata:()=>requests.get("/Band"),

  createBand:(data)=>requests.post("/Band",data),

  updateBand:(data)=>requests.put("/Band",data)

}
const AvgCTCapi={

  getallManageBilldata:()=>requests.get("/AvgCTC"),

  createManageBill:(data)=>requests.post("/AvgCTC",data),

  updateManageBill:(data)=>requests.put("/AvgCTC",data)

}



const insuranceapi={

  getallInsurancedata:()=>requests.get("/Insurance"),

  createInsurance:(data)=>requests.post("/Insurance",data),

  updateInsurance:(data)=>requests.put("/Insurance",data)

}

const Industryapi={

  getallIndustrydata:()=>requests.get("/Industry"),

  createIndustry:(data)=>requests.post("/Industry",data),

  updateIndustry:(data)=>requests.put("/Industry",data)

}









export  {quotes,companyapi, businessunitapi, Customerapi, Experienceapi, Designationapi, SubBandapi,servicelineapi,Locationapi,Bandapi,AvgCTCapi,insuranceapi,Industryapi}