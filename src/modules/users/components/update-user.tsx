import { TextInput, Button, Group, Center, InputWrapper, Chips, Chip, Text } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { CloudUpload } from 'tabler-icons-react';
import { UpdateUserInput, updateUserInputSchema } from '~/modules/users/create-user-input';
import { useUpdateUser } from '../hooks';

interface UpdateUserProps {
  userToUpdate: UpdateUserInput;
  selectUserForEdit: (user: any) => void,
}

export const UpdateUser = ({ userToUpdate, selectUserForEdit }: UpdateUserProps) => {
  const { mutateAsync: updateUser } = useUpdateUser();

  const FAKE_PASSWORD = "tajnehaslo";
  const form = useForm<UpdateUserInput>({
    initialValues: {...userToUpdate, password: FAKE_PASSWORD},
    schema: zodResolver(updateUserInputSchema),
  });

  const entryStyles = { padding: '1rem' };

  const onFormSubmit = (values: UpdateUserInput) => {
    console.log('submitting...');
    console.log('haslo: ', values.password);
    
    if (values.password === FAKE_PASSWORD) {
      values.password = userToUpdate.password;
    }
    selectUserForEdit(null);
    console.log('haslo przed zapisem: ', values.password);
    
    updateUser(values);
  };

  return (
    <Center style={{ marginBottom: '2rem', flexDirection: 'column' }}>
      <Text style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>Tworzenie nowego użytkownika</Text>
      <form style={{ flexDirection: 'column' }} onSubmit={form.onSubmit(onFormSubmit)}>
        <TextInput
          style={entryStyles}
          required
          label="email"
          placeholder="uzytkownik@email.com"
          error={form.errors.email}
          {...form.getInputProps('email')}
        />
        <TextInput
          style={entryStyles}
          required
          label="hasło (zostaw puste aby pozostało bez zmian)"
          placeholder="tajnehaslo"
          type="password"
          {...form.getInputProps('password')}
        />

        <TextInput style={entryStyles} required label="imię i naziwsko" placeholder="Jan Kowalski" {...form.getInputProps('name')} />

        <InputWrapper error={form.errors.role}>
          <Chips color="green" style={entryStyles} {...form.getInputProps('role')}>
            <Chip value="USER">User</Chip>
            <Chip value="MODERATOR">Moderator</Chip>
            <Chip value="ADMIN">Admin</Chip>
          </Chips>
        </InputWrapper>

        <Group position="right" mt="md">
          <Button type="submit" rightIcon={<CloudUpload size={20} />}>
            Zapisz
          </Button>
        </Group>
      </form>
    </Center>
  );
};
