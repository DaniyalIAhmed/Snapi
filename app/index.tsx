import { Redirect } from "expo-router";
import React from "react";

const Main = () => {
  return <Redirect href={"/(auth)/login"} />;
};

export default Main;
