import * as React from 'react';
import DraftsIcon from '@mui/icons-material/Drafts';
import EditIcon from '@mui/icons-material/Edit';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import FiberManualRecordRoundedIcon from '@mui/icons-material/FiberManualRecordRounded';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import { css, styled } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import clsx from 'clsx';

interface ICollapsed {
  isCollapsed?: boolean;
}

type IMenuList = ICollapsed;

const ListItemButtonStyled = styled(ListItemButton)<ICollapsed>`
  &.MuiButtonBase-root {
    border-radius: 20px;
    height: 40px;
    background-color: #2d3436;

    ${({ isCollapsed }) =>
      isCollapsed &&
      css`
        padding-left: 8px;
      `}
  }
`;

const ListItemTextStyled = styled(ListItemText)`
  &.MuiListItemText-root {
    flex-shrink: 0;
    overflow-x: hidden;
  }
  .MuiTypography-root {
    font-size: 0.875rem;
  }
`;

const MenuList: React.FC<IMenuList> = ({ isCollapsed }) => {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <List
        sx={{
          width: '100%',
          bgcolor: '#2d3436',
          color: '#fff',
          '& svg': {
            fill: 'rgb(129, 133, 134)',
          },
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader" sx={{ height: 40, bgcolor: '#2d3436', color: 'white' }}>
            {isCollapsed ? '' : 'Usuários'}
          </ListSubheader>
        }
      >
        <ListItemButtonStyled className={clsx({ isCollaped: isCollapsed })}>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemTextStyled primary="Meu perfil" />
        </ListItemButtonStyled>
        <ListItemButtonStyled className={clsx({ isCollaped: isCollapsed })}>
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemTextStyled primary="Mensagens" />
        </ListItemButtonStyled>
        <ListItemButtonStyled className={clsx({ isCollaped: isCollapsed })} onClick={handleClick}>
          <ListItemIcon sx={{ fontSize: '10px' }}>
            <EditIcon />
          </ListItemIcon>
          <ListItemTextStyled primary="Editar" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButtonStyled>

        {!isCollapsed && (
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding dense>
              <ListItemButtonStyled className={clsx({ isCollaped: isCollapsed })} sx={{ pl: 4 }}>
                <ListItemIcon>
                  <FiberManualRecordRoundedIcon sx={{ fontSize: 'small' }} />
                </ListItemIcon>
                <ListItemTextStyled primary="Edita perfil" />
              </ListItemButtonStyled>

              <ListItemButtonStyled className={clsx({ isCollaped: isCollapsed })} sx={{ pl: 4 }}>
                <ListItemIcon>
                  <FiberManualRecordRoundedIcon sx={{ fontSize: 'small' }} />
                </ListItemIcon>
                <ListItemTextStyled primary="Editar bio" />
              </ListItemButtonStyled>
            </List>
          </Collapse>
        )}

        <ListItemButtonStyled className={clsx({ isCollaped: isCollapsed })}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemTextStyled primary="Sair" />
        </ListItemButtonStyled>
      </List>
    </>
  );
};

export default MenuList;
