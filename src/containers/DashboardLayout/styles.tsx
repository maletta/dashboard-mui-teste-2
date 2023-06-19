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

export { GridContainer, Main, Nav };
