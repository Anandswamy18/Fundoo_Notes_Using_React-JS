import { RouterProvider, createBrowserRouter } from "react-router-dom";
import React from 'react';
import Signup from "./components/Signup"; // Ensure the case matches the actual file name
import Signin from "./components/Signin"; // Ensure the case matches the actual file name
import Dashboard from "./components/Dashboard";
import NoteContainer from "./components/NoteContainer";
import ArchiveContainer from "./components/ArchiveContainer";
import TrashContainer from "./components/TrashContainer";
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

        {
            path:"/",
            element:<Dashboard/>,
            children:[
                
                {
                    path:"",
                    element:<NoteContainer/>
                },
                {
                    path:"/archivenotes",
                    element:<ArchiveContainer/>
                },
                {
                    path:"/trashnotes",
                    element:<TrashContainer/>
                }
            ]
        }
        
    ]);

    return (
        <RouterProvider router={routes} />
    );
};

export default RoutingModule;
