import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface IUserRolesoptions {


    Id: 1
    UserName: string
    Email: string
    FirstName: string
    LastName: string
    Active: true,
    key: number,
    label: string,
    value: string,
}
const initialState: IUserRolesoptions[] = [];

export const userroleoptionsSlice = createSlice({
    name: "userroleoptions",
    initialState,
    reducers: {
        userroleoptionsdata: (state, payload: any) => {
            var temp = payload.payload
            // console.log(temp)
            var temparr: IUserRolesoptions[] = []
            temp.forEach(e => {
                console.log(e)
                temparr.push({
                    Id: e.Id,
                    UserName: e.UserName,
                    Email: e.Email,
                    FirstName: e.FirstName,
                    LastName: e.LastName,
                    Active: e.Active,
                    key: e.Id,
                    label: e.FirstName + ',' + e.LastName,
                    value: e.FirstName + '_' + e.LastName,
                })
            });
            console.clear()
            console.log(temp)
            state = [...temparr]
            return state;
        },




    },
});


export const { userroleoptionsdata } = userroleoptionsSlice.actions
export default userroleoptionsSlice.reducer