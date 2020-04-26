import React from "react";
import LoginForm from "./components/LoginForm";

import { AuthController } from "./ Controller";
import { getToken } from '@/app/infrastructures/misc/Cookies';
import history from "@/app/infrastructures/misc/BrowserHistory";

const LoginApp = () => {
  const accessToken = getToken();
  if(accessToken) {
    history.push('/')
  }
  return (
    <AuthController>
      <LoginForm />
    </AuthController>
  );
};

export default LoginApp;
