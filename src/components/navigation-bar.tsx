import { ActionIcon, Box, Header, Title } from '@mantine/core';
import { signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import { Login, Logout } from 'tabler-icons-react';
import { useUser } from '~/hooks/use-user';
import { ColorSchemeToggle } from './color-scheme-toggle';
import { NavLink } from './navigation-link';

const Logo = () => (
  <Link href={'/'} passHref>
    <Box sx={{ display: 'flex', gap: '12px', alignItems: 'center', cursor: 'pointer' }}>
      <Title order={3}> Tele Tracker</Title>
    </Box>
  </Link>
);

const LogoutButton = () => (
  <ActionIcon color="red" size="xl" variant="light" onClick={() => signOut({ callbackUrl: '/' })}>
    <Logout />
  </ActionIcon>
);

const LoginButton = () => (
  <ActionIcon color="green" size="xl" variant="light" onClick={() => signIn()}>
    <Login />
  </ActionIcon>
);

export const NavigationBar = () => {
  const user = useUser();
  const isAuthenticated = Boolean(user);
  const isAdmin = user?.role === 'ADMIN';

  return (
    <Header sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0px 20px' }} height={80}>
      <Box sx={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <Logo />
        {isAuthenticated && <NavLink name="Nowa sprawa" path="/new-case" />}
        {isAdmin && <NavLink name="Użytkownicy" path="/users" />}
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <ColorSchemeToggle />
        {isAuthenticated && <LogoutButton />}
        {!isAuthenticated && <LoginButton />}
      </Box>
    </Header>
  );
};
