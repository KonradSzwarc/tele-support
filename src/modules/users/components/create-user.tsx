
import { TextInput, Button, Group, Center, InputWrapper, Chips, Chip, Text } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { UserRole } from '@prisma/client';
import { CloudUpload } from 'tabler-icons-react';
import { CreateUserInput, createUserInputSchema } from '~/modules/users/create-user-input';
import { useCreateUser } from '../hooks';

interface CreateUserProps {
    setShow: (isDisplayed: boolean) => void
}

export const CreateUser = ({ setShow }: CreateUserProps) => {

    const { mutateAsync: createUser } = useCreateUser();
    const form = useForm<CreateUserInput>({
        initialValues: {
            email: '',
            password: '',
            name: '',
            language: 'Polski',
            role: UserRole.USER,
        },

        schema: zodResolver(createUserInputSchema)
    });

    const entryStyles = { padding: '1rem' }

    const onFormSubmit = (values: CreateUserInput) => {
        setShow(false);
        createUser(values);
    }

    return (
        <Center style={{ marginBottom: '2rem', flexDirection: 'column' }}>
            <Text style={{ fontWeight: 'bold', fontSize: '1.5rem'}}>Tworzenie nowego użytkownika</Text>
            <form
                style={{ flexDirection: 'column' }}
                onSubmit={form.onSubmit(onFormSubmit)}>
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
                    type='password'
                    {...form.getInputProps('password')}
                />

                <TextInput
                    style={entryStyles}
                    required
                    label="imię i naziwsko"
                    placeholder="Jan Kowalski"
                    {...form.getInputProps('name')}
                />
                {console.log(form.errors.role)}
                <InputWrapper error={form.errors.role}>
                    <Chips color="green" style={entryStyles} {...form.getInputProps('role')}>
                        <Chip value="USER" defaultChecked={true}>User</Chip>
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
}

