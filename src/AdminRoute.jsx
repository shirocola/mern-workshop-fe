import { Navigate } from "react-router-dom";
import { getUser } from "./service/authorize";
import Propstype from "prop-types";

const AdminRoute = ({ element: Element, ...rest }) => {
    if (!getUser()) {
        return <Navigate to="/login" replace />;
    }
    return typeof Element === 'function' ? <Element {...rest} /> : Element;
};

AdminRoute.propTypes = {
    element: Propstype.elementType.isRequired,
};

export default AdminRoute;
