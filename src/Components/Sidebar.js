import React from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';
import './Sidebar.css';

const Sidebar = (props) => {
  return (
    <div className='sidebar-root'>
      <Typography variant='h3' sx={{ color: 'white', p: '20px' }}>
        Glints
      </Typography>
      <List className='sidebar-list-container'>
        <ListItem button sx={{ width: '100%' }}>
          <ListItemText primary='Dashboard' className='sidebar-list-item' />
        </ListItem>
        <ListItem button sx={{ width: '100%' }}>
          <ListItemText primary='Profile' className='sidebar-list-item' />
        </ListItem>
      </List>
    </div>
  );
};

export default Sidebar;
