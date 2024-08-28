import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import ProductList from "../components/ProductList";
import Login from "../auth/Login";
import SignUp from "../auth/SignUp";

export const router = createBrowserRouter([
  /* Main Root */
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
        {
            path: '/',
            element:<ProductList></ProductList>
        },
        {
            path: 'login',
            element:<Login></Login>
        },
        {
            path: 'signUp',
            element:<SignUp></SignUp>
        },

    ]
  },
]);
