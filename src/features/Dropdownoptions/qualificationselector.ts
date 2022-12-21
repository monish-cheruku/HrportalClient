import {createSelector} from 'reselect'
import IOptions from '../../models/Ioptions'

const getqualification=(store)=>store.qualification
// console.log(getqualification)
export const getactivequalification=createSelector(
    getqualification,(qualification)=>{
        var temp:IOptions[]=[]

        qualification.forEach(e=>{
            if(e.Active=="true"){
temp.push({
    key: e.QualificationId,
    label: e.Qualification,
    value: e.Qualification
})

            }
        })
        return temp
    }
) 
export const getallqualification=createSelector(
    getqualification,(qualification)=>{
        var temp:IOptions[]=[]

        qualification.forEach(e=>{
temp.push({
    key: e.QualificationId,
    label: e.Qualification,
    value: e.Qualification
})

            
        })
        // console.log(temp)
        return temp
    }
) 