// import * as React from 'react';
// import {
//     Route, 
//     Redirect,
//     RouteProps,
//     RouteComponentProps
// } from "react-router-dom";

// interface PrivateRouteProps extends RouteProps {
//     isAuthenticated: boolean;
// }

// export class PrivateRoute extends Route<PrivateRouteProps> {
//     render() {
//         return (
//             <Route render={(props: RouteComponentProps) => {
//                 if(!this.props.isAuthenticated) {
//                     return <Redirect to='/' />
//                 } 

//                 if(this.props.component) {
//                     return React.createElement(this.props.component);
//                 } 

//                 if(this.props.render) {
//                     return this.props.render(props);
//                 }
//             }} />
//         );
//     }
// }


import React from "react";
import { Route,Navigate, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticated,component: Component, ...rest }) => {
  //converts object to boolean ->false if null else true//
//   const isAuthenticated = !!localStorage.getItem("token");
//   const isAuthenticated = true;
  const navigate = useNavigate();
  
  if(!isAuthenticated) {
    navigate("/login");
  }
  
  return (
     <Route
    path="*"
    element={
      isAuthenticated ? (
        <Navigate to="/dashboard" />
      ) : (
        <Navigate to="/login" />
      )
    }
  />
  );
};

export default React.memo(ProtectedRoute);