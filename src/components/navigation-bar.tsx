import { Box, Header, Title } from '@mantine/core';
import { ColorSchemeToggle } from './color-scheme-toggle';
import { NavLink } from './navigation-link';

const Logo = () => (
  <Box sx={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
    <Title order={3}> Tele Tracker</Title>
  </Box>
);

export const NavigationBar = () => {
  return (
    <Header sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0px 20px' }} height={80}>
      <Box sx={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <Logo />
        <NavLink name="Nowa sprawa" path="/new-case" />
        <NavLink name="Użytkownicy" path="/users" />
      </Box>
      <ColorSchemeToggle />
    </Header>
  );
};
