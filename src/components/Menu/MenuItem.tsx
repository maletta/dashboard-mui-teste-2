import React from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { alpha, Box, Button, darken, lighten } from '@mui/material';
import { styled } from '@mui/material';

interface INewButton {
  text: string;
  isCollapsed?: boolean;
  handleClick?: any;
}

const MenuItemStyled = styled(Button)`
  display: flex;
  justify-content: space-between;
  text-transform: capitalize;
  color: #fff;
  background-color: #2d3436;

  height: 40px;
  min-width: 0px;
  box-shadow: none;
  padding-inline: 16px;
  padding-block: 6px;
  border-radius: 18px;

  &:hover {
    background-color: ${darken('#2d3436', 0.18)};
  }
  && .MuiTouchRipple-child {
    background-color: ${darken('#2d3436', 0.55)};
  }

  svg {
    fill: ${lighten('#2d3436', 0.4)};
  }
`;

const MenuItem: React.FC<INewButton> = ({ text, isCollapsed, handleClick }) => {
  return (
    <MenuItemStyled
      onClick={() => {
        handleClick && handleClick();
      }}
    >
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
