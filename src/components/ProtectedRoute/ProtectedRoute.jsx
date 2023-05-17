import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({component: Component, ...props}) => {
    return(
        <Route>
            {() =>
              props.loggedIn === false && props.allowRedirect === true ? <Redirect to={props.redirectPath} /> : <Component {...props} />
            }
        </Route>
    );
};
export default ProtectedRoute;