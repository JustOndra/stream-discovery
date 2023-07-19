import { Badge, ListItemText } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import {
  HttpError,
  useGo,
  useLink,
  useList,
  useRouterContext,
  useRouterType,
  useTitle,
} from '@refinedev/core';
import type { RefineThemedLayoutV2SiderProps } from '@refinedev/mui';
import {
  ThemedTitleV2 as DefaultTitle,
  useThemedLayoutContext,
} from '@refinedev/mui';
import React, { SyntheticEvent } from 'react';
import { ICategory } from 'src/interfaces/types';

export const ThemedSiderV2: React.FC<RefineThemedLayoutV2SiderProps> = ({
  Title: TitleFromProps,
  meta,
}) => {
  const {
    siderCollapsed,
    setSiderCollapsed,
    mobileSiderOpen,
    setMobileSiderOpen,
  } = useThemedLayoutContext();

  const drawerWidth = () => {
    if (siderCollapsed) return 56;
    return 240;
  };

  const routerType = useRouterType();
  const Link = useLink();
  const go = useGo();
  const { Link: LegacyLink } = useRouterContext();
  const ActiveLink = routerType === 'legacy' ? LegacyLink : Link;

  const { data, isLoading, isError } = useList<ICategory, HttpError>({
    resource: 'category',
    metaData: {
      select: '*, streamer(count)',
    },
  });

  const TitleFromContext = useTitle();
  const RenderToTitle = TitleFromProps ?? TitleFromContext ?? DefaultTitle;

  const renderTreeView = (tree: ICategory[]) => {
    return tree.map((item: ICategory) => {
      const { name, id, streamer } = item;

      return (
        <Tooltip
          title={name}
          key={id}
          placement="right"
          disableHoverListener={!siderCollapsed}
          arrow
        >
          <ListItemButton
            component="button"
            name={id}
            onClick={(e: SyntheticEvent<HTMLButtonElement>) =>
              go({
                query: {
                  filters: [
                    {
                      field: 'category_id',
                      operator: 'eq',
                      value: e.currentTarget.name,
                    },
                  ],
                  options: {
                    keepQuery: true,
                  },
                },
                type: 'push',
              })
            }
            sx={{
              pl: 2,
              py: 1,
              width: '100%',
              justifyContent: 'center',
              color: 'text.primary',
            }}
          >
            <ListItemText
              primary={name}
              primaryTypographyProps={{
                noWrap: true,
                fontSize: '14px',
              }}
            />
            <Badge badgeContent={streamer[0].count} color="secondary"></Badge>
          </ListItemButton>
        </Tooltip>
      );
    });
  };

  const items = isLoading ? [] : renderTreeView(data!.data);

  const renderSider = () => {
    return <>{items}</>;
  };

  const drawer = (
    <List
      disablePadding
      sx={{
        flexGrow: 1,
        paddingTop: '16px',
      }}
    >
      {renderSider()}
    </List>
  );

  return (
    <>
      <Box
        sx={{
          width: { xs: drawerWidth() },
          display: {
            xs: 'none',
            md: 'block',
          },
          transition: 'width 0.3s ease',
        }}
      />
      <Box
        component="nav"
        sx={{
          position: 'fixed',
          zIndex: 1101,
          width: { sm: drawerWidth() },
          display: 'flex',
        }}
      >
        <Drawer
          variant="temporary"
          elevation={2}
          open={mobileSiderOpen}
          onClose={() => setMobileSiderOpen(false)}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: {
              sm: 'block',
              md: 'none',
            },
          }}
        >
          <Box
            sx={{
              width: drawerWidth(),
            }}
          >
            <Box
              sx={{
                height: 64,
                display: 'flex',
                alignItems: 'center',
                paddingLeft: '16px',
                fontSize: '14px',
              }}
            >
              <RenderToTitle collapsed={false} />
            </Box>
            {drawer}
          </Box>
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              width: drawerWidth(),
              overflow: 'hidden',
              transition: 'width 200ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
            },
          }}
          open
        >
          <Paper
            elevation={0}
            sx={{
              fontSize: '14px',
              width: '100%',
              height: 64,
              display: 'flex',
              flexShrink: 0,
              alignItems: 'center',
              justifyContent: siderCollapsed ? 'center' : 'space-between',
              paddingLeft: siderCollapsed ? 0 : '16px',
              paddingRight: siderCollapsed ? 0 : '8px',
              variant: 'outlined',
              borderRadius: 0,
              borderBottom: (theme) =>
                `1px solid ${theme.palette.action.focus}`,
            }}
          >
            <RenderToTitle collapsed={siderCollapsed} />
          </Paper>
          <Box
            sx={{
              flexGrow: 1,
              overflowX: 'hidden',
              overflowY: 'auto',
            }}
          >
            {drawer}
          </Box>
        </Drawer>
      </Box>
    </>
  );
};
