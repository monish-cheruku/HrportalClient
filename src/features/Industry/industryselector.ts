import { createSelector } from '@reduxjs/toolkit'
import { RootState,  } from "../../app/store";
import IOptions from '../../models/Ioptions';
import { IBandoptions } from '../Band/Bandslice';
// import {store} from '../../app/store'
// var selectbands=useSelector((state:RootState)=>state.Band)

 export const getIndustry=(state)=>state.Industry
// const getbanddata=createSelector()
// console.log(getbanddata(store))
export const getactiveIndustryoptions=createSelector(
    [getIndustry],
    (Industry) => { 
   var temp:IOptions[]  =[]
   Industry.forEach((e)=>{
    // console.log(e)
    if(e.Active===true){
        temp.push({
            
        key:e.IndustryId,
        label:e.IndustryName,
        value:e.IndustryId
    
        })
    }
   })
console.log(temp)
        
        return temp
  // return [{key:"abc",label:"abc",value:"abc"},{key:"def",label:"def",value:"def"},{key:"ghi",label:"ghi",value:"ghi"},]
    }
  )
  export const getallIndustryoptions=createSelector(
    [getIndustry],
    (Industry) => { 
        var temp:IOptions[]  =[]
        Industry.forEach((e)=>{
       
             temp.push({
                 
             key:e.IndustryId,
             label:e.IndustryName,
             value:e.IndustryId
         
             })
         
        })
     
             
             return temp
        // return [{key:"qwe",label:"qwe",value:"qwe"},{key:"def",label:"def",value:"def"},{key:"ghi",label:"ghi",value:"ghi"},]

    }
  )