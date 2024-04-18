import React, { useEffect } from "react";
import { useLazyProfileQuery } from "../services/Auth";
import { useDispatch } from "react-redux";
import { setUserInfo, unsetUserInfo } from "../features/userSlice";
import {
  Tabs,
  Tab,
  Input,
  Link,
  Button,
  Card,
  CardBody,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [error, setError] = React.useState("");
  const [loggedProfile, { isError, isSuccess }] = useLazyProfileQuery();
  const navigate = useNavigate();

  const [userData, setUserData] = React.useState({
    email: "",
    name: "",
  });

  // Fetch profile data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await loggedProfile();
        if (data && isSuccess) {
          console.log(data);
          setUserData({
            email: data['data'].email,
            name: data['data'].full_name,
          });
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchData();
  }, [loggedProfile, isSuccess]);

  // Redirect to login page if authentication fails
  useEffect(() => {
    if (isError) {
      navigate("/login");
    }
  }, [isError]);

  return (
    <div className="flex flex-col items-center mt-36 justify-center">
      <Card className="w-[440px] bg-transparent border-3 border-slate-800 p-2">
        <CardBody className="overflow-hidden">
          <Tabs
            fullWidth
            size="md"
            aria-label="Tabs form"
            radius="full"
            variant="bordered"
            color="primary"
            className="border-0"
          >
            <Tab key="Profile" title="PROFILE">
              {error ? (
                <Button
                  fullWidth
                  isDisabled
                  variant="flat"
                  color="danger"
                  className="my-4 border-0"
                >
                  {error}
                </Button>
              ) : (
                ""
              )}
              <form className="flex flex-col gap-4">
                <Input
                  label="Name"
                  placeholder="Enter your name"
                  type="text"
                  variant="bordered"
                  className="text-white"
                  value={userData.email}
                  isDisabled
                />
                <Input
                  label="Email"
                  placeholder="Enter your email"
                  type="email"
                  className="text-white"
                  variant="bordered"
                  value={userData.name}
                  isDisabled
                />
              </form>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}
