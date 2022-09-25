import { Navigate, useRoutes } from "react-router-dom";
import DefaultLayout from "../layout/DefaultLayout";
import Home from "../pages/Home";

export default function Router() {
    return useRoutes([
        {
            path: "/",
            element: <DefaultLayout />,
            // Will be in Outlet of defaultLayout Component according to path
            children: [
                { path: "/", element: <Navigate to="/home" replace /> },
                { path: "/home", element: <Home /> },
            ]
        }
    ])
}