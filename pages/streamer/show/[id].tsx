import { MuiShowInferencer } from '@refinedev/inferencer/mui';
import { GetServerSideProps } from 'next';

export default function BlogPostShow() {
  return <MuiShowInferencer />;
}

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  return {
    props: {},
  };
};
