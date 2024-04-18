import React from "react";
import HeaderTemp from "./Components/Navbar";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useNavigate,
  redirect,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Signup from "./Authentictaion/Signup";
import Login from "./Authentictaion/Login";
import Profile from "./Authentictaion/Profile";
import { useSelector } from "react-redux";

export default function App() {
  const queryClient = new QueryClient();

  const isAuth = useSelector((state) => state.auth);

  console.log(isAuth)
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
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/signup",
          element: <Signup />,
        },
        {
          path: "/login",
          element: <Login />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
