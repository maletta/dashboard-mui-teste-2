import * as React from 'react';
import ArticleIcon from '@mui/icons-material/Article';
import DraftsIcon from '@mui/icons-material/Drafts';
import EditIcon from '@mui/icons-material/Edit';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';

export default function MenuList() {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <h1 style={{ color: 'green' }}>GeeksForGeeks</h1>

      <List
        sx={{
          width: '100%',
          maxWidth: 360,
          bgcolor: 'background.paper',
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Setting
          </ListSubheader>
        }
      >
        <ListItemButton>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="My Profile" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary="My Courses" />
        </ListItemButton>
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <ListItemText primary="Edit" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <FaceRetouchingNaturalIcon />
              </ListItemIcon>
              <ListItemText primary="Edit Profile" />
            </ListItemButton>

            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <ArticleIcon />
              </ListItemIcon>
              <ListItemText primary="Edit Articles" />
            </ListItemButton>
          </List>
        </Collapse>

        <ListItemButton>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>
    </>
  );
}
