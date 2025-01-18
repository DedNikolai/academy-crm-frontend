import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
// import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { AuthContext } from './AuthProvider';
// import {removeCookie} from 'typescript-cookie';
import { Roles } from '../types/roles';
import {NavLink} from 'react-router-dom';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const authContext = React.useContext(AuthContext);
  const isOwner = authContext?.user?.roles.some(role => role === Roles.OWNER)
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOut = () => {
    handleClose();
    authContext?.setUser(null);
    // removeCookie("auth-token", {path: '/', domain: 'http://localhost:3000'});
    window.localStorage.removeItem("auth-token");
  }

  return (
    <React.Fragment>
      <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            textAlign: 'center', 
            width: '100%',
            justifyContent: 'space-between'
             }}>
        <Typography sx={{ minWidth: 100 }}>Кабінет Адміністратора</Typography>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {
          isOwner &&
          <NavLink to='/dashboard/profile'>
            <MenuItem onClick={handleClose}>
              <Avatar /> Профіль
            </MenuItem>
          </NavLink> 
        }
        {
          isOwner &&
          <NavLink to='/dashboard/admins'>
            <MenuItem onClick={handleClose}>
              <Avatar /> Адміністратори
            </MenuItem>
          </NavLink>  
        }
        {
          isOwner &&<Divider />
        }
        {
          isOwner &&
          <NavLink to='/dashboard/admins/create'>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <PersonAdd fontSize="small" />
                </ListItemIcon>
                Додати Адміністратора
              </MenuItem>
            </NavLink>
        }
                {
          isOwner &&
          <NavLink to='/dashboard/bills'>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <AttachMoneyIcon fontSize="small" />
                </ListItemIcon>
                 Рахунки
              </MenuItem>
            </NavLink>
        }
        {/* <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem> */}
        <MenuItem onClick={logOut}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Вийти
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
