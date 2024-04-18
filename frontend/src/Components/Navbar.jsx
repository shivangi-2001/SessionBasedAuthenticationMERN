import React, { useCallback } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import { useLogoutMutation } from "../services/Auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { unsetUserInfo } from "../features/userSlice";
import { unsetAuth } from "../features/authSlice";

export default function HeaderTemp() {
  const isAuth = useSelector(state =>  state.auth)

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const menuItems = ["profile", "dashboard"];
  const [logout, { error }] = useLogoutMutation();



  const HandleLogout = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        await logout();
        dispatch(unsetAuth({auth:false}))
        dispatch(unsetUserInfo({ email: "", name: "" }));
        document.cookie =
          "_eid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        navigate("/login");
      } catch (error) {
        console.error("Logout error:", error);
      }
    },
    [dispatch, logout, navigate]
  );

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="bg-transparent border-b-orange-200"
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <p className="font-bold text-inherit">ACME</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex gap-4 text-pretty"
        justify="center"
      >
        <NavbarBrand>
          <Link to={"/"}>
            <img src="/vite.svg" alt="" />
          </Link>
        </NavbarBrand>

        {menuItems.map((item, index) => (
          <NavbarItem key={`${item}-${index}`}>
            <Link
              className="w-full capitalize"
              color="warning"
              href={`${item}`}
              size="lg"
            >
              {item}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="flex">
        {/* <Button
              type="button"
              className="btn"
              variant="ghost"
              color="danger"
              onClick={HandleLogout}
            >
              Logout
            </Button>
            <Link href="/login" className="text-white">
              Login
            </Link> */}
          {isAuth.auth ? (
            <Button
              type="button"
              className="btn"
              variant="ghost"
              color="danger"
              onClick={HandleLogout}
            >
              Logout
            </Button>
          ) : (
            <Link href="/login"  color="success" variant="flat" className="text-white">
              Login
            </Link>
          )}
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="warning" href="/signup" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2
                  ? "warning"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "white"
              }
              href={`${item}`}
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
