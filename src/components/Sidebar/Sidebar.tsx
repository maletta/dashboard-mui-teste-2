import React from 'react';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
// import logo from 'assets/logo-vipe-principal-menor.png';
import logo from 'assets/output-onlinepngtools.png';

import Menu from 'components/Menu/Menu';

import * as S from './styles';

interface SidebarProps extends S.SidebarStyledProps {
  onCollapseClick: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onCollapseClick }) => {
  function onClickCollapseButton() {
    onCollapseClick(prev => !prev);
  }

  return (
    <S.Aside>
      <S.AsideCollapseButton className={isCollapsed ? 'collapsed' : ''} onClick={onClickCollapseButton}>
        <KeyboardDoubleArrowLeftIcon />
      </S.AsideCollapseButton>
      <S.AsideHeader className={isCollapsed ? 'collapsed' : ''}>
        <img src={logo} alt={'logo da empresa'} />
      </S.AsideHeader>
      <S.AsideContent className={isCollapsed ? 'collapsed' : ''}>
        <Menu isCollapsed={isCollapsed} />
      </S.AsideContent>
    </S.Aside>
  );
};

export default Sidebar;
