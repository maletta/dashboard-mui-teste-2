import { colors, lighten, styled } from '@mui/material';

interface GridContainerProps {
  isCollapsed: boolean;
}

const GridContainer = styled('div')<GridContainerProps>`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: ${({ theme: { sidebar }, isCollapsed }) => {
    const sbWidth = isCollapsed ? sidebar.widthCollapsed : sidebar.width;
    return ` ${sbWidth} auto`;
  }};
  grid-template-rows: ${({ theme }) => ` ${theme.header.height} auto`};
  grid-template-areas:
    'sidenav nav'
    'sidenav main';

  transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
`;

const Nav = styled('nav')`
  grid-area: nav;
  background: ${({ theme }) => theme.palette.common.white};
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => lighten(theme.palette.grey[300], 0.2)};
`;

const Main = styled('main')`
  grid-area: main;
  background-color: ${({ theme }) => theme.palette.common.white};
`;

const SplashScreen = styled('div')`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  .loader {
    width: 48px;
    height: 48px;
    display: block;
    margin: 15px auto;
    position: relative;
    color: ${({ theme }) => theme.palette.primary.main};
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
  }
  .loader::after,
  .loader::before {
    content: '';
    box-sizing: border-box;
    position: absolute;
    width: 24px;
    height: 24px;
    top: 50%;
    left: 50%;
    transform: scale(0.5) translate(0, 0);
    background-color: ${({ theme }) => theme.palette.primary.main};
    border-radius: 50%;
    animation: animloader 1s infinite ease-in-out;
  }
  .loader::before {
    background-color: #000;
    transform: scale(0.5) translate(-48px, -48px);
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes animloader {
    50% {
      transform: scale(1) translate(-50%, -50%);
    }
  }
`;

export { GridContainer, Main, Nav, SplashScreen };
