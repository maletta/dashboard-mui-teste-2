import React, { ReactNode, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'context/auth-context';

import SplashScreen from 'components/SplashScreen/SplashScreen';

interface IAuthGuard {
  children: ReactNode;
}

const AuthGuard = ({ children }: IAuthGuard) => {
  const { authState } = useAuth();
  const navigate = useNavigate();
  console.log('to no auth guard');

  // volta para o login caso user é null
  useLayoutEffect(() => {
    if (!authState.isLoading) {
      if (!authState.user) {
        navigate('/');
      }
    }
  }, [authState]);

  if (authState.isLoading && !authState.user) {
    return <SplashScreen />;
  }

  return <>{children}</>;
};

export default AuthGuard;
