import PrivateRoute from "../../routes/private-route";
import { roles } from "../index";
import { CustomerLayout, SuperAdminLayout, VendorLayout } from "../../layouts";
import { Products, Users, VendorProducts } from "../../pages";

const AdminRoutes = {
    path: "/users",
    element: <PrivateRoute navLink="/" component={SuperAdminLayout} />,
    children: [
        {
            path: "",
            element: <Users />,
        },
    ],
};

const VendorRoutes = {
    path: "/products",
    element: <PrivateRoute navLink="/" component={VendorLayout} />,
    children: [
        {
            path: "",
            element: <VendorProducts />,
        },
    ],
};

const CustomerRoutes = {
    path: "/products",
    element: <PrivateRoute navLink="/" component={CustomerLayout} />,
    children: [
        {
            path: "",
            element: <Products />,
        },
    ],
};

export const RolesRoutes = {
    [roles.admin]: AdminRoutes,
    [roles.vendor]: VendorRoutes,
    [roles.customer]: CustomerRoutes,
};
