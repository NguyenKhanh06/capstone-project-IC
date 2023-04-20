import React, { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface Props {
  children: ReactNode;
}

const AuthGuard = ({ children }: Props) => {
  const token = localStorage.getItem('token');
  const location = useLocation();
  const isAuth = token ? true : false;

  return isAuth === true ? children : <Navigate to="/login" replace state={{ path: location.pathname }} />;
};

export default AuthGuard;
