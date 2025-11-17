import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import AppLocale from "@/lang";
import { jwtDecode } from "jwt-decode";
import { IntlProvider } from "react-intl";
import { ConfigProvider } from "antd";
import PrivateRoute from "@/component/PrivateRoute";
import AuthViews from "./auth-views/AuthViews";
import { AppLayout } from "@/layouts/AppLayout";
import { signOutSuccess } from "@/store/features/auth";
import { strings } from "@/res";

export const Views = () => {
  const dispatch = useDispatch();
  const { locale } = useSelector((state) => state.theme);
  const currentAppLocale = AppLocale[ locale ];

  useEffect(() => {
    try {
      if (localStorage.getItem("token")) {
        const token = localStorage.getItem("token");
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp < currentTime) {
          localStorage.clear();
          dispatch(signOutSuccess());
          window.location.href = "/auth";
        }
      } else {
        localStorage.clear();
        dispatch(signOutSuccess());
      }
    } catch (err) {
      localStorage.clear();
      dispatch(signOutSuccess());
      window.location.href = "/auth";
    }
  }, [dispatch]);

  return (
    <IntlProvider
      locale={currentAppLocale.locale}
      messages={currentAppLocale.messages}
    >
      <ConfigProvider locale={currentAppLocale.antd}>
        <Routes>
          <Route path="/" element={<Navigate to={strings.navigation.login} replace/>}/>
          <Route path="/auth/*" element={<AuthViews />}/>
          <Route
            path="/app/*"
            element={
              <PrivateRoute>
                <AppLayout/>
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/auth" replace/>}/>
        </Routes>
      </ConfigProvider>
    </IntlProvider>
  );
};

export default Views;
