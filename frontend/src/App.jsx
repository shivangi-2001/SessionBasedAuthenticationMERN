import React from "react";
import HeaderTemp from "./Components/Navbar";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Signup from "./Authentictaion/Signup";
import Login from "./Authentictaion/Login";
import Profile from "./Authentictaion/Profile";

export default function App() {

  const queryClient = new QueryClient();
  const Layout = () => {
    return (
      <>
        <HeaderTemp />
        <QueryClientProvider client={queryClient}>
          <Outlet />
        </QueryClientProvider>
      </>
    );
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/login",
          element: <Login/>
        },
        {
          path: "/profile",
          element:<Profile />,
        }
      ],
    },
    {
      path: "/signup",
      element:<Signup />,
    }
    
  ]);

  return <RouterProvider router={router} />;
}
