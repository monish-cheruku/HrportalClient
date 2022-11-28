import { createSelector } from "reselect";
import IOptions from "../../models/Ioptions";


export const getusersbyroles=(store)=>store.usersbyroles
export const getHrs=createSelector(
[getusersbyroles],(usersbyroles)=>{
var temp:IOptions[]=[]
    usersbyroles.forEach(element => {
        if(element.RoleName=="HR"){
           
temp.push(
    {
       key:element.UserName,
       label:element.FullName,
       value:element.UserName,
    }
)
        }
        
    });
    return temp;
}

)

export const getBusinessHeads=createSelector(
    [getusersbyroles],
    (usersbyroles)=>{

        var temp:IOptions[]=[]
        usersbyroles.forEach(element => {
            if(element.RoleName=="Business Head"){
                temp.push({
                    key:element.UserName,
                    label:element.FullName,
                    value:element.UserName,

                })}

    })
    return temp;
}
)
