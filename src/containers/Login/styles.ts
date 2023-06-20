import { styled } from '@mui/material';

const LoginContainer = styled('div')`
  position: relative;
  height: 100vh;
  width: 100vw;
  overflow: hidden;

  display: flex;
  justify-content: center;
  align-items: center;

  &:before {
    content: '';
    position: absolute;
    background-color: #222e3c;
    width: 100vw;
    height: 100vh;

    bottom: calc(50%);

    z-index: -1;
  }
`;

const LogoContainer = styled('div')`
  width: 208px;
  height: auto;
  min-height: 50px;
  position: absolute;

  /* background: #fff; */
  border-radius: 4px;

  top: -70px;
  left: 50%;
  transform: translateX(-104px);
`;

export { LoginContainer, LogoContainer };
