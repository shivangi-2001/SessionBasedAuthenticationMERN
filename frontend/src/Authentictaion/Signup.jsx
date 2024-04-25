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
import { EyeFilledIcon } from "../Components/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../Components/EyeSlashFilledIcon";
import { useRegisterMutation } from "../services/Auth";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [error, setError] = React.useState({ error_message: "" });

  const navigate = useNavigate();
  const [register, { isError, isLoading, isSuccess }] = useRegisterMutation();
  const HandleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const InputData = {
      full_name: data.get("full_name"),
      email: data.get("email"),
      password: data.get("password"),
      confirm_password: data.get("confirm_password"),
    };
    if (
      !InputData.email ||
      !InputData.full_name ||
      !InputData.confirm_password ||
      !InputData.password
    )
      setError({ error_message: "All fields are required" });
    if (InputData.password !== InputData.confirm_password)
      setError({ error_message: "Password do not match" });
    const res = await register(InputData);
    if (res.data) {
      alert("Sucessfully created the Account")
      navigate("/login");
    }
    if (res.error['data']) {
      setError({ error_message: res.error['data'].error_message });
    }
  };

  useEffect(() => {
    setError("")
  }, [isSuccess])

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="flex justify-center items-center mt-36">
      <Card className="w-[460px] bg-transparent border-spacing-3 border-slate-800 border-3 p-3">
        <CardBody className="overflow-hidden">
          <Tabs
            fullWidth
            size="lg"
            aria-label="Tabs form"
            radius="full"
            variant="light"
            color="warning"
            className="border-0"
          >
            <Tab key="sign-up" title="Sign up">
              {isSuccess ? (
                <Button
                  fullWidth
                  color="success"
                  variant="flat"
                  className="my-3"
                  isDisabled
                >
                  Successfully Register
                </Button>
              ) : (
                ""
              )}
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
              <form className="flex flex-col gap-4" onSubmit={HandleSubmit}>
                <Input
                  isRequired
                  label="Name"
                  variant="bordered"
                  placeholder="Enter your name"
                  type="text"
                  name="full_name"
                  className="text-white"
                />
                <Input
                  isRequired
                  label="Email"
                  variant="bordered"
                  placeholder="Enter your email"
                  type="email"
                  name="email"
                  className="text-white"
                />
                <Input
                  isRequired
                  variant="bordered"
                  label="Password"
                  className="text-white"
                  placeholder="Enter your password"
                  type={isVisible ? "text" : "password"}
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                    >
                      {isVisible ? (
                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                  name="password"
                />
                <Input
                  isRequired
                  variant="bordered"
                  label="Password"
                  className="text-white"
                  placeholder="Enter your confirm password"
                  type={isVisible ? "text" : "password"}
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                    >
                      {isVisible ? (
                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                  name="confirm_password"
                />
                <div className="text-center text-small text-white">
                  Already have an account?{" "}
                  <Link size="sm" href={"/login"} color="primary">
                    Login
                  </Link>
                </div>
                <div className="flex gap-2 justify-end">
                  {isLoading ? (
                    <Button color="primary" isLoading>
                      Loading
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      fullWidth
                      color="danger"
                      variant="ghost"
                    >
                      Sign up
                    </Button>
                  )}
                </div>
              </form>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}
