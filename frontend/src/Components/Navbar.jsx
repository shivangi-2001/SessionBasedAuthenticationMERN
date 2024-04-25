import React, { useEffect } from "react";
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
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { unsetUserInfo } from "../features/userSlice";
import Cookies from "universal-cookie";

export default function HeaderTemp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [count, setCount] = React.useState(0);
  const [cookies, setCookies] = React.useState("");
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = ["profile", "dashboard"];

  const fetchCookies = async () => {
    const cookiesID = new Cookies({ path: "/" });
    let cookie_id = cookiesID.get("_eid");
    setCookies(cookie_id);
  };
  useEffect(() => {
    setCount(count + 1);
    console.log("render", count, cookies);
    fetchCookies(); // Fetch cookies on component mount
  }, []);

  const handleLogout = () => {
    const cookiesID = new Cookies({ path: "/" });
    cookiesID.remove("_eid");
    setCookies("");
    dispatch(unsetUserInfo({ email: "", full_name: "" }));
    navigate("/login");
  };

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
          {cookies ? (
            <Button
              type="button"
              className="btn"
              variant="ghost"
              color="danger"
              onClick={handleLogout} // Call handleLogout when logout button is clicked
            >
              Logout
            </Button>
          ) : (
            <Link href="/login" className="text-white">
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
