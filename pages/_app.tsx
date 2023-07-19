import { Refine } from '@refinedev/core';
import {
  DarkTheme,
  RefineSnackbarProvider,
  ThemedLayoutV2,
  notificationProvider,
} from '@refinedev/mui';
import routerProvider from '@refinedev/nextjs-router';
import type { NextPage } from 'next';
import { AppProps } from 'next/app';

import { Header } from '@components/header';
import { ThemedSiderV2 } from '@components/themedLayout/sider';

import { Title } from '@components/title';
import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import { dataProvider } from '@refinedev/supabase';
import { authProvider } from 'src/authProvider';
import { supabaseClient } from 'src/utility';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  noLayout?: boolean;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout): JSX.Element {
  const renderComponent = () => {
    if (Component.noLayout) {
      return <Component {...pageProps} />;
    }

    return (
      <ThemedLayoutV2
        Header={() => <Header sticky />}
        Sider={() => <ThemedSiderV2 Title={Title} />}
      >
        <Component {...pageProps} />
      </ThemedLayoutV2>
    );
  };

  return (
    <>
      <ThemeProvider theme={DarkTheme}>
        <CssBaseline />
        <GlobalStyles styles={{ html: { WebkitFontSmoothing: 'auto' } }} />
        <RefineSnackbarProvider>
          <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider(supabaseClient)}
            authProvider={authProvider}
            notificationProvider={notificationProvider}
            resources={[
              {
                name: 'streamers',
                list: '/streamers',
                meta: {
                  canDelete: false,
                },
              },
            ]}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: false,
            }}
          >
            {renderComponent()}
          </Refine>
        </RefineSnackbarProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
