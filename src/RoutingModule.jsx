import { RouterProvider, createBrowserRouter } from "react-router-dom";
import React from 'react';
import Signup from "./components/Signup"; // Ensure the case matches the actual file name
import Signin from "./components/Signin"; // Ensure the case matches the actual file name

const RoutingModule = () => {
    const routes = createBrowserRouter([
        {
            path: "/signup",
            element: <Signup />,
        },
        {
            path: "/signin",
            element: <Signin />,
        },
    ]);

    return (
        <RouterProvider router={routes} />
    );
};

export default RoutingModule;
