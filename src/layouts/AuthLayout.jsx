import React from 'react';
import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
  return (
    <div className="auth-container">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
