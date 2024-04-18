import React from "react";
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
  const [error, setError] = React.useState({ error_message: "" });
  const [loginAuth] = useLoginMutation();
  const navigate = useNavigate();

  const HandleLoginSubmit = async (e) => {
    e.preventDefault();
    var input_data = { email, password };

    const res = await loginAuth(input_data);
    if (res.data) {
      console.log(res.data);
      // navigate("/profile");
    }
    if (res.error) {
      setError({ error_message: res.error["data"].error_message });
    }
  };

  return (
    <div className="flex flex-col items-center mt-36 justify-center">
      <Card className="w-[440px] bg-transparent border-3 border-slate-800 p-2">
        <CardBody className="overflow-hidden">
          <Tabs
            fullWidth
            size="md"
            aria-label="Tabs form"
            radius="full"
            variant="light"
            color="warning"
            className="border-0"
          >
            <Tab key="login" title="Login" className=" text-warning-400">
              {error.error_message ? (
                <Button
                  fullWidth
                  color="danger"
                  variant="flat"
                  className="my-3"
                  isDisabled
                >
                  {error.error_message}
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
                    color="warning"
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
