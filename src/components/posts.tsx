import { Alert, Anchor, Box, Button, Container, Group, Paper, Textarea, TextInput, Title } from '@mantine/core';
import Link from 'next/link';
import { FormEvent } from 'react';
import { AlertCircle } from 'tabler-icons-react';
import { trpc } from '../utils/trpc';

export const Posts = () => {
  const utils = trpc.useContext();
  const postsQuery = trpc.useQuery(['post.all']);
  const addPost = trpc.useMutation('post.add', {
    async onSuccess() {
      await utils.invalidateQueries(['post.all']);
    },
  });

  return (
    <Container mt={64}>
      <Group align="flex-start">
        <Box>
          <Title order={2}>Posts {postsQuery.status === 'loading' && '(loading)'}</Title>
          <Group direction="column" mt={16}>
            {postsQuery.data?.map((item) => (
              <Paper key={item.id} shadow="sm" p="md" sx={{ width: 400 }}>
                <Title order={4}>{item.title}</Title>
                <Link href={`/post/${item.id}`} passHref>
                  <Anchor>View more</Anchor>
                </Link>
              </Paper>
            ))}
          </Group>
        </Box>

        <Box
          component="form"
          sx={{ width: 400, paddingLeft: 40 }}
          onSubmit={async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            /**
             * In a real app you probably don't want to use this manually
             * Checkout React Hook Form - it works great with tRPC
             * @link https://react-hook-form.com/
             */

            const $text: HTMLInputElement = (e as any).target.elements.text;
            const $title: HTMLInputElement = (e as any).target.elements.title;
            const input = {
              title: $title.value,
              text: $text.value,
            };
            try {
              await addPost.mutateAsync(input);

              $title.value = '';
              $text.value = '';
            } catch {}
          }}
        >
          <Title order={2}>Add Post</Title>
          <TextInput mt={16} id="title" name="title" type="text" disabled={addPost.isLoading} label="Title" />
          <Textarea id="text" name="text" disabled={addPost.isLoading} label="Text" />
          <Button type="submit" disabled={addPost.isLoading} mt={16}>
            Add post
          </Button>
          {addPost.error && (
            <Alert icon={<AlertCircle size={16} />} title="Error" color="red">
              {addPost.error.message}
            </Alert>
          )}
        </Box>
      </Group>
    </Container>
  );
};
