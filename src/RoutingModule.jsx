import { RouterProvider, createBrowserRouter } from "react-router-dom";
import React from 'react';
import Signup from "./components/Signup"; 
import Signin from "./components/Signin"; 
import Dashboard from "./components/Dashboard";
import Notefound from "./components/Notefound";
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
            path:"*",
            element:<Notefound/>
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
