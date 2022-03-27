import { ActionIcon } from '@mantine/core';
import { useNotifications } from '@mantine/notifications';
import { Trash } from 'tabler-icons-react';
import { useTemplateFieldsDelete } from '../hooks';

export type RemoveFieldTemplateProps = { id: string };

export const RemoveFieldTemplate = ({ id }: RemoveFieldTemplateProps) => {
  const { mutateAsync: deleteTemplateField } = useTemplateFieldsDelete();
  const notifications = useNotifications();

  const handleClick = async () => {
    await deleteTemplateField({ id });

    notifications.showNotification({ title: 'Sukces', message: 'Pole zostało usunięte', color: 'green' });
  };

  return (
    <ActionIcon color="red" variant="light" onClick={handleClick}>
      <Trash />
    </ActionIcon>
  );
};
