import React, { useEffect } from "react";
import { useLazyProfileQuery } from "../services/Auth";
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
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../features/userSlice";

export default function Profile() {
  const isAuth = useSelector(state => state.auth)
  const dispatch = useDispatch()
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
      const data = await loggedProfile();
      console.log({
        email: data['data'].email,
        full_name: data['data'].full_name,
      })
      try {
        if (data && isSuccess) {
          setUserData({
            email: data['data'].email,
            name: data['data'].full_name,
          });
          dispatch(setUserInfo({
            email: data['data'].email,
            full_name: data['data'].full_name,
          }))
        }
        if(data['status'] === 'rejected') setError(data['data'])
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    
    if(isAuth.auth){
      fetchData();
    }
    else{
      navigate("/login");
    }
  }, [loggedProfile, isSuccess, dispatch]);

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
