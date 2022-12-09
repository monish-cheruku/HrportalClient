import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Navigate } from "react-router";
export interface ILogin {
    username: string;
    first_name: string;
    last_name: boolean;
    email: string,
    groups: any
}
const initialState: ILogin = {
    username: "",
    first_name: "",
    last_name: false,
    email: "",
    groups: undefined
};
// console.log(Location)

export const LocationSlice = createSlice({
    name: "Login",
    initialState,
    reducers: {
        setlogindetails: (state, payload: any) => {
            var temp = payload.payload
            // history.push('dashboard');
            // window.location.href='dashboard'
            // Navigate({to:'dashboard'})
            // window.location.hash("#/dashboard")
            // window.history.pushState({}, "null", '#/dashboard')
            state = temp
            if (state.username != null && state.username != "") {
                // alert(state.username)
            }
            console.log(state)
            return state;
        },

        logout: () => {
            console.log("logging out")
            localStorage.clear()
            window.location.href = '/login'


            // 
        },


        //functions for sagas watching
        loginaction: (state, payload: PayloadAction<any>) => {
            // console.log(state)
        },


    },
});
export const { loginaction, setlogindetails, logout } = LocationSlice.actions
export default LocationSlice.reducer