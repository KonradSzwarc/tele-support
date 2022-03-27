import { TextInput, Button, Group, Center, InputWrapper, Chips, Chip, Text } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { UserRole } from '@prisma/client';
import { CloudUpload } from 'tabler-icons-react';
import { CreateUserInput, createUserInputSchema } from '~/modules/users/create-user-input';
import { useCreateUser } from '../hooks';

interface CreateUserProps {
  isCreateFormVisible: (isDisplayed: boolean) => void;
}

export const CreateUser = ({ isCreateFormVisible }: CreateUserProps) => {
  const { mutateAsync: createUser } = useCreateUser();
  const form = useForm<CreateUserInput>({
    initialValues: {
      email: '',
      password: '',
      name: '',
      language: 'Polski',
      role: UserRole.USER,
    },

    schema: zodResolver(createUserInputSchema),
  });

  const entryStyles = { padding: '1rem' };

  const onFormSubmit = (values: CreateUserInput) => {
    console.log('language: ', values.language);

    isCreateFormVisible(false);
    createUser(values);
  };

  const setLanguageStringOnForm = (languages: string[], form: any) => {
    const languageString = languages?.reduce((prev, curr) => prev + ', ' + curr, "");
    form.setFieldValue('language', languageString);
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
          label="hasło"
          placeholder="tajnehaslo"
          type="password"
          {...form.getInputProps('password')}
        />

        <TextInput style={entryStyles} required label="imię i naziwsko" placeholder="Jan Kowalski" {...form.getInputProps('name')} />

        <InputWrapper error={form.errors.language} label="Języki" style={entryStyles}>
          <Chips
            color="yellow"
            multiple
            style={entryStyles}
            {...form.getInputProps('language')}
            onChange={(val) => setLanguageStringOnForm(val, form)}
          >
            <Chip value="Polski" defaultChecked={true}>
              Polski
            </Chip>
            <Chip value="Ukraiński">Ukraiński</Chip>
            <Chip value="Angielski">Angielski</Chip>
            <Chip value="Francuski">Francuski</Chip>
            <Chip value="Niemiecki">Niemiecki</Chip>
            <Chip value="Inne">Inne</Chip>
          </Chips>
        </InputWrapper>

        <InputWrapper error={form.errors.role} label="Rola" style={entryStyles}>
          <Chips color="green" style={entryStyles} {...form.getInputProps('role')}>
            <Chip value="USER" defaultChecked={true}>
              User
            </Chip>
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
