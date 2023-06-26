import React, { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'context/auth-context';

import SplashScreen from 'components/SplashScreen/SplashScreen';

interface IAuthGuard {
  children: ReactNode;
}

const AuthGuard = ({ children }: IAuthGuard) => {
  const { authState } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('state mudou auth guard', authState);
    if (!authState.isLoading) {
      if (!authState.user) {
        navigate('/');
      }
    }
  }, [authState]);

  if (authState.isLoading) {
    return <SplashScreen />;
  }

  return <>{children}</>;
};

export default AuthGuard;
