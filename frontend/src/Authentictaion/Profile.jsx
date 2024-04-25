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
import { useDispatch } from "react-redux";
import { setUserInfo, unsetUserInfo } from "../features/userSlice";
import HeaderTemp from "../Components/Navbar";
import { Navigate } from "react-router-dom";

export default function Profile() {
  const dispatch = useDispatch();
  const [fetchProfile, { data: profileData }] = useLazyProfileQuery();

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  useEffect(() => {
    if (profileData) {
      dispatch(setUserInfo({ email: profileData.email, full_name: profileData.full_name }));
    }
  }, [profileData, dispatch]);

  return (
    <>
      <HeaderTemp />
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
                {profileData && (
                  <form className="flex flex-col gap-4">
                    <Input
                      label="Name"
                      placeholder="Enter your name"
                      type="text"
                      variant="bordered"
                      className="text-white"
                      value={profileData.full_name}
                      isDisabled
                    />
                    <Input
                      label="Email"
                      placeholder="Enter your email"
                      type="email"
                      className="text-white"
                      variant="bordered"
                      value={profileData.email}
                      isDisabled
                    />
                  </form>
                )}
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
