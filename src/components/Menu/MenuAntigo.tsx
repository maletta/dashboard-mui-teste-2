import React, { useState } from 'react';
import { StackedLineChart } from '@mui/icons-material';
import DeleteForeverOutlined from '@mui/icons-material/DeleteForeverOutlined';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import { styled } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import Stack from '@mui/material/Stack';

import MenuItem from './MenuItem';
import MenuList from './MenuList';
import * as M from './styles';

interface IMenu {
  isCollapsed?: boolean;
}
const Menu: React.FC<IMenu> = ({ isCollapsed }) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <MenuList isCollapsed={isCollapsed} />
      <Stack direction={'column'} spacing={1}>
        <MenuItem text="Financeiro" isCollapsed={isCollapsed} handleClick={() => setOpen(prev => !prev)} />

        <Collapse in={open} timeout="auto" unmountOnExit>
          <MenuItem text="Usuario" isCollapsed={isCollapsed} />
        </Collapse>
      </Stack>
      <Stack direction="column" spacing={1}>
        <MenuItem text="Usuario" isCollapsed={isCollapsed} />
        <MenuItem text="Teste1" isCollapsed={isCollapsed} />
        <MenuItem text="Teste2" isCollapsed={isCollapsed} />
        <MenuItem text="Teste3" isCollapsed={isCollapsed} />
        <Button variant="contained" sx={{ minWidth: 0 }}>
          <Box display={'flex'}>
            <DeleteForeverOutlined />
          </Box>
        </Button>
      </Stack>
    </>
  );
};

export default Menu;
