import { Title, Text } from '@mantine/core';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useUser } from '~/hooks/use-user';

const HomePage: NextPage = () => {
  const router = useRouter();
  const user = useUser();

  if (user?.email) {
    router.push('/new-case');
  }

  return (
    <>
      <Title sx={{ fontSize: 100, fontWeight: 900, letterSpacing: -2 }} align="center" mt={100}>
        Witaj
      </Title>
      <Text color="dimmed" align="center" size="lg" sx={{ maxWidth: 580 }} mx="auto" mt="xl">
        Zaloguj się by kontynuować
      </Text>
    </>
  );
};

export default HomePage;
