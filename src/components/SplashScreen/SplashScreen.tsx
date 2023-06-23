import React, { ReactNode } from 'react';

import * as S from './styles';

interface ISplashScreen {
  children?: ReactNode;
}

const SplashScreen = ({ children }: ISplashScreen) => {
  return (
    <S.SplashScreenStyles>
      <div className="loader">{children}</div>
    </S.SplashScreenStyles>
  );
};
export default SplashScreen;
