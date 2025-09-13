import React, { Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Loading from "@/component/shared-components/Loading";

import Login from "./authentication/LoginView";
import Register from "./authentication/RegisterView";
import ForgotPasswordView from "./authentication/ForgotPasswordView";
import ActivateAccountView from "./authentication/ActivateAccountView";
import Resend from "./authentication/ResendView";
import Please from "./authentication/Please";
import ErrorOne from "./errors/ErrorPage1";
import ErrorTwo from "./errors/ErrorPage2";
import { strings } from "@/res";

export const AuthViews = () => {
  return (
    <Suspense fallback={<Loading cover="page" />}>
      <Routes>
        <Route path={strings.navigation.path.login} element={<Login />} />
        <Route path={strings.navigation.path.register} element={<Register />} />
        <Route path={strings.navigation.path.forgot_password} element={<ForgotPasswordView />} />
        <Route path={strings.navigation.path.activate} element={<ActivateAccountView />} />
        <Route path="resend" element={<Resend />} />
        <Route path={strings.navigation.path.please} element={<Please />} />
        <Route path={strings.navigation.path.error_one} element={<ErrorOne />} />
        <Route path={strings.navigation.path.error_two} element={<ErrorTwo />} />

        {/* Default redirect */}
        <Route path="*" element={<Navigate to={strings.navigation.path.login} replace />} />
      </Routes>
    </Suspense>
  );
};

export default AuthViews;
