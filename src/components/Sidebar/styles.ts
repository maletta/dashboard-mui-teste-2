import { css, lighten, styled } from '@mui/material';

export interface SidebarStyledProps {
  isCollapsed?: boolean;
}

const padding28 = css`
  padding-inline: 1.75rem;
  padding-left: 10px;
`;

const padding10 = css`
  padding-inline: 10px;
`;

const Aside = styled('aside')`
  position: relative;
  display: flex;
  flex-direction: column;
  grid-area: sidenav;
  background: ${({ theme }) => theme.sidebar.backgroundColor};
  background: #2d3436;

  padding-bottom: ${({ theme }) => theme.header.height};
`;

const AsideContent = styled('div')`
  height: ${({ theme: { header } }) => {
    const headerHeight = header.height;

    return `calc(100%  - ${headerHeight})`;
  }};

  padding-top: 16px;
  padding-inline: 16px;

  overflow: hidden;

  &.collapsed {
    padding-inline: 6px;
  }
`;

const AsideHeader = styled('div')<SidebarStyledProps>`
  position: relative;
  height: ${({ theme }) => theme.header.height};
  background-color: #fff;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  /* border-bottom-color: ${({ theme }) => lighten(theme.palette.grey[300], 0.2)}; */
  border-bottom-color: ${({ theme }) => theme.palette.primary.main};
  /* border-bottom-color: ${({ theme }) => theme.sidebar.backgroundColor}; */

  ${padding28}
  /* margin-right: 1rem; * para scroll-width */

  img {
    height: 100%;
    clip-path: none;
    transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
  }

  &.collapsed {
    ${padding10}

    img {
      clip-path: polygon(0 0, 30% 0, 30% 100%, 0% 100%);
      transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
    }
  }
`;

const AsideCollapseButton = styled('button')<SidebarStyledProps>`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 38px;
  height: 38px;
  border-radius: 50%;
  background-color: #2d3436;
  border: 3px solid #fff;
  /* box-shadow: ${({ theme }) => theme.shadows[2]}; */
  /* box-shadow: none; */

  bottom: calc(50% - calc(40px / 2));
  right: calc(0px - calc(40px / 2));

  transition: all 0.15s cubic-bezier(0.39, 0.575, 0.565, 1);
  cursor: pointer;

  svg {
    fill: #fff;
    transition: all 0.5s ease;
  }

  &:hover {
    transition: all 0.4s ease;
    transform: translate(-6px, 0);
  }

  &.collapsed {
    & svg {
      transform: rotate(180deg);
    }

    &:hover {
      transform: translate(4px, 0);
    }
  }
`;

export { Aside, AsideCollapseButton, AsideContent, AsideHeader };
