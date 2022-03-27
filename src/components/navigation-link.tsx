import { Text } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';

export type NavLinkProps = {
  path: string;
  name: string;
};

export const NavLink = ({ path, name }: NavLinkProps) => {
  const { pathname } = useRouter();
  const textDecoration = pathname === path ? 'underline' : 'none';

  return (
    <Link href={path} passHref={true}>
      <Text sx={{ cursor: 'pointer', textDecoration }} size="lg">
        {name}
      </Text>
    </Link>
  );
};
