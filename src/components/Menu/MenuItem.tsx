import React from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { Box, Button, darken, lighten } from '@mui/material';
import { styled } from '@mui/material';

interface INewButton {
  text: string;
  isCollapsed?: boolean;
}

const MenuItemStyled = styled(Button)`
  display: flex;
  justify-content: space-between;
  color: #fff;
  background-color: #2d3436;

  box-shadow: none;
  text-transform: capitalize;
  padding-inline: 16px;
  padding-block: 6px;
  height: 40px;
  min-width: 0px;
  &:hover {
    background-color: ${lighten('#2d3436', 0.05)};
  }
  & .MuiTouchRipple-child {
    background-color: ${darken('#2d3436', 0.05)};
  }

  svg {
    fill: ${lighten('#2d3436', 0.4)};
  }
`;

const MenuItem: React.FC<INewButton> = ({ text, isCollapsed }) => {
  return (
    <MenuItemStyled>
      <Box
        sx={{
          marginRight: isCollapsed ? '0' : '16px',
          display: 'inline-flex',
          alignItems: 'center',
        }}
      >
        <PeopleAltIcon />
      </Box>
      {isCollapsed ? (
        []
      ) : (
        <Box
          sx={{
            fontSize: '0.875rem',
            flexGrow: 1,
            display: 'inline-flex',
            alignItems: 'center',
            verticalAlign: 'center',
          }}
        >
          {text}
        </Box>
      )}
      <Box
        sx={{
          display: 'inline-flex',
          flexShrink: 0,
        }}
      >
        {isCollapsed ? [] : <KeyboardArrowRightIcon />}
      </Box>
    </MenuItemStyled>
  );
};

export default MenuItem;
