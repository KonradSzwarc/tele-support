import { NextPage } from 'next';
import { Button, Center, Space, Modal } from '@mantine/core';
import { useUsers } from '../../modules/users/hooks';
import DisplayUsers from '../../modules/users/components/display-users';
import { CreateUser } from '../../modules/users/components/create-user';
import { useEffect, useState } from 'react';
import { UpdateUser } from '~/modules/users/components/update-user';
import { User } from '@prisma/client';
import { UpdateUserInput } from '~/modules/users/create-user-input';

const RegisterNewUser: NextPage = () => {
  const [showUserRegistration, setShowUserRegistration] = useState(false);

  const [selectedUserForEdit, setSelectedUserForEdit] = useState({} as UpdateUserInput);
  const [selectedUserForDeactivation, setSelectedUserForDeactivation] = useState({});

  const { data } = useUsers();
  if (!data) {
    return <Button onClick={() => setShowUserRegistration(true)}>Dodaj </Button>;
  }

  const showUserRegistrationModal = () => {
    return (
      <Modal opened={showUserRegistration} onClose={() => setShowUserRegistration(false)} centered>
        <CreateUser isCreateFormVisible={setShowUserRegistration} />
      </Modal>
    );
  };

  const showUserUpdateModal = () => {
    return (
      <Modal opened={!!selectedUserForEdit?.id} onClose={() => setSelectedUserForEdit({} as UpdateUserInput)} centered>
        <UpdateUser userToUpdate={selectedUserForEdit} selectUserForEdit={setSelectedUserForEdit} />
      </Modal>
    );
  };

  return (
    <Center style={{ flexDirection: 'column', width: '90%', marginTop: '2rem' }}>
      {showUserRegistration ? null : <Button onClick={() => setShowUserRegistration(true)}>Dodaj </Button>}
      {showUserRegistrationModal()}
      {showUserUpdateModal()}
      <Space h="md" />
      <DisplayUsers users={data} selectUserForEdit={setSelectedUserForEdit} selectUserForDeactivation={setSelectedUserForDeactivation} />
    </Center>
  );
};

export default RegisterNewUser;
