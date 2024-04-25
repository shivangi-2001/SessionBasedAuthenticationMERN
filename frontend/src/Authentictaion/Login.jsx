import React, { useEffect } from "react";
import {
  Tabs,
  Tab,
  Input,
  Link,
  Button,
  Card,
  CardBody,
} from "@nextui-org/react";
import { useLoginMutation } from "../services/Auth";
import { useNavigate } from "react-router-dom";


export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
 
  const [loginAuth] = useLoginMutation();
  const navigate = useNavigate();


  const HandleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginAuth({ email, password });
      if (res.data) {
        navigate("/profile");
      } else if (res.error) {
        console.log()
        setError(res.error['data'].error_message);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  


  return (
    <div className="flex flex-col items-center mt-36 justify-center">
      <Card className="w-[440px] bg-transparent border-3 border-slate-800 p-2">
        <CardBody className="overflow-hidden text-white">
          <Tabs
            fullWidth
            size="lg"
            aria-label="Tabs form"
            radius="full"
            variant="light"
            color="warning"
            className="border-0 "
          >
            <Tab key="login" title="Login" >
              {error ? (
                <Button
                  fullWidth
                  color="danger"
                  variant="flat"
                  className="my-3"
                  isDisabled
                >
                  {error}
                </Button>
              ) : (
                ""
              )}

              <form
                className="flex flex-col gap-4"
                onSubmit={HandleLoginSubmit}
              >
                <Input
                  isRequired
                  label="Email"
                  placeholder="Enter your email"
                  type="email"
                  variant="bordered"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  isRequired
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  variant="bordered"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <p className="text-center text-small">
                  Need to create an account?{" "}
                  <Link size="sm" href={"/signup"}>
                    Sign up
                  </Link>
                </p>
                <div className="flex gap-2 justify-end">
                  <Button
                    type="submit"
                    fullWidth
                    color="danger"
                    variant="ghost"
                  >
                    Login
                  </Button>
                </div>
              </form>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}
