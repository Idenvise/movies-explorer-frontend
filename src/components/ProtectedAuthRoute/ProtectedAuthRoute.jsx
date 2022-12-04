import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedAuthRoute = ({component: Component, ...props}) => {
    return(
        <Route>
            {() =>
              props.loggedIn === true ? <Redirect to={props.redirectPath} /> : <Component {...props} />
            }
        </Route>
    );
};
export default ProtectedAuthRoute;