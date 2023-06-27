import { Button } from '@mui/material';
import {
  TitleProps,
  useLink,
  useRouterContext,
  useRouterType,
} from '@refinedev/core';

export const Title: React.FC<TitleProps> = ({ collapsed }) => {
  const routerType = useRouterType();
  const Link = useLink();
  const { Link: LegacyLink } = useRouterContext();

  const ActiveLink = routerType === 'legacy' ? LegacyLink : Link;

  return (
    <Button fullWidth variant="text" disableRipple>
      <ActiveLink to="/">
        {collapsed ? (
          <img
            src="https://refine.ams3.cdn.digitaloceanspaces.com/logo/refine-mini.svg"
            alt="Refine"
            width="28px"
            style={{ maxHeight: '38px' }}
          />
        ) : (
          <img
            src="https://refine.ams3.cdn.digitaloceanspaces.com/logo/refine.svg"
            alt="Refine"
            width="140px"
          />
        )}
      </ActiveLink>
    </Button>
  );
};
