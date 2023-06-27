import StreamerCard from '@components/streamerCard';
import { Container, Grid } from '@mui/material';
import { GetListResponse, useList } from '@refinedev/core';
import { dataProvider } from '@refinedev/supabase';
import { GetServerSideProps } from 'next';
import { supabaseClient } from 'src/utility';

interface IUser {
  id: string;
  name: string;
  description: string;
  url: string;
}

export default function StreamerList(users: GetListResponse<IUser>) {
  const { data, isError, isLoading } = useList({
    resource: 'streamer',
    queryOptions: {
      initialData: users,
    },
  });

  console.log(data);

  return (
    <Container>
      <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
        <Grid item xs={4}>
          <StreamerCard />
        </Grid>
        <Grid item xs={4}>
          <StreamerCard />
        </Grid>
        <Grid item xs={4}>
          <StreamerCard />
        </Grid>
        <Grid item xs={4}>
          <StreamerCard />
        </Grid>
      </Grid>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const data = await dataProvider(supabaseClient).getList<IUser>({
    resource: 'streamer',
  });

  return {
    props: {
      users: data,
    },
  };
};
