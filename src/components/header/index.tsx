import { Logout, Search } from '@mui/icons-material';
import {
  Avatar,
  Button,
  IconButton,
  InputBase,
  ListItemIcon,
  Menu,
  MenuItem,
  Paper,
} from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useGetIdentity, useGo, useLink, useLogout } from '@refinedev/core';
import { HamburgerMenu, RefineThemedLayoutV2HeaderProps } from '@refinedev/mui';

import React, { useState } from 'react';

type IUser = {
  id: number;
  name: string;
  avatar: string;
};

export const Header: React.FC<RefineThemedLayoutV2HeaderProps> = ({
  sticky = true,
}) => {
  const { data: user } = useGetIdentity<IUser>();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [search, setSearch] = useState('');
  const open = Boolean(anchorEl);
  const { mutate: mutateLogout } = useLogout();
  const link = useLink();
  const go = useGo();

  const resetSearchAndGo = () => {
    setSearch('');
    go({
      to: '/streamers',
      type: 'push',
    });
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position={sticky ? 'sticky' : 'relative'} color="default">
      <Toolbar>
        <Stack
          direction="row"
          width="100%"
          justifyContent="flex-end"
          alignItems="center"
        >
          <HamburgerMenu />
          <Stack
            direction="row"
            width="100%"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack direction="row">
              <Paper
                component="form"
                sx={{
                  p: '2px 4px',
                  display: 'flex',
                  alignItems: 'center',
                  width: 400,
                }}
              >
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Streamers"
                  onChange={(e) => setSearch(e.currentTarget.value)}
                  inputProps={{ 'aria-label': 'search streamers' }}
                />
                <IconButton
                  type="button"
                  sx={{ p: '10px' }}
                  aria-label="search"
                  onClick={() => {
                    go({
                      to: '/streamers',
                      query: {
                        filters: [
                          {
                            field: 'name',
                            value: search,
                            operator: 'contains',
                          },
                        ],
                        options: {
                          keepQuery: true,
                        },
                      },
                      type: 'push',
                    });
                  }}
                >
                  <Search />
                </IconButton>
              </Paper>
              <Button onClick={resetSearchAndGo}>Reset</Button>
            </Stack>
            {user?.avatar || user?.name ? (
              <Stack
                direction="row"
                gap="16px"
                alignItems="center"
                justifyContent="center"
              >
                <Button
                  color="inherit"
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? 'account-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  endIcon={<Avatar sx={{ width: 32, height: 32 }} />}
                >
                  {user.name}
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <MenuItem
                    onClick={() =>
                      mutateLogout({
                        redirectPath: '/streamers',
                      })
                    }
                  >
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </Stack>
            ) : (
              <Stack
                direction="row"
                justifyContent="space-between"
                spacing={2}
                alignItems="center"
              >
                <Button
                  component={link}
                  to="/login"
                  color="info"
                  variant="outlined"
                >
                  Login
                </Button>
                <Typography
                  sx={{
                    display: {
                      xs: 'none',
                      sm: 'inline-block',
                    },
                  }}
                  variant="subtitle2"
                  color="inherit"
                >
                  OR
                </Typography>
                <Button
                  component={link}
                  to="/register"
                  variant="outlined"
                  color="info"
                >
                  Register
                </Button>
              </Stack>
            )}
            
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
