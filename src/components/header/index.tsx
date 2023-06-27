import { Button } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useGetIdentity, useLink } from '@refinedev/core';
import { HamburgerMenu, RefineThemedLayoutV2HeaderProps } from '@refinedev/mui';

import React from 'react';

type IUser = {
  id: number;
  name: string;
  avatar: string;
};

export const Header: React.FC<RefineThemedLayoutV2HeaderProps> = ({
  sticky = true,
}) => {
  const { data: user } = useGetIdentity<IUser>();
  const link = useLink();
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
            justifyContent="flex-end"
            alignItems="center"
          >
            {user?.avatar || user?.name ? (
              <Stack
                direction="row"
                gap="16px"
                alignItems="center"
                justifyContent="center"
              >
                {user?.name && (
                  <Typography
                    sx={{
                      display: {
                        xs: 'none',
                        sm: 'inline-block',
                      },
                    }}
                    variant="subtitle2"
                  >
                    {user?.name}
                  </Typography>
                )}

                <Avatar src={user?.avatar} alt={user?.name} />
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
                  to="/login"
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
