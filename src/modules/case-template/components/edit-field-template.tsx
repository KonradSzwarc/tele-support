import { ActionIcon, Modal } from '@mantine/core';
import { useBooleanToggle } from '@mantine/hooks';
import { FieldTemplate } from '@prisma/client';
import { Edit } from 'tabler-icons-react';
import { useTemplateFieldsUpdate } from '../hooks';
import { useNotifications } from '@mantine/notifications';
import { FieldTemplateForm, FieldTemplateInput } from './field-template-form';

export type EditFieldTemplateProps = {} & Omit<FieldTemplate, 'parentId' | 'isVisible'>;

export const EditFieldTemplate = ({ id, ...rest }: EditFieldTemplateProps) => {
  const { mutateAsync: updateFieldTemplate } = useTemplateFieldsUpdate();
  const notifications = useNotifications();
  const [isModalOpen, toggleIsModalOpen] = useBooleanToggle();

  const handleFormSubmission = async (fieldTemplate: FieldTemplateInput) => {
    await updateFieldTemplate({ fieldTemplate, id });
    toggleIsModalOpen();
    notifications.showNotification({ title: 'Sukces', message: 'Zmiana pola przebiegła pomyślnie', color: 'green' });
  };

  return (
    <>
      <Modal opened={isModalOpen} withCloseButton={false} onClose={toggleIsModalOpen} title="Edytuj pole">
        <FieldTemplateForm onSubmit={handleFormSubmission} {...rest} />
      </Modal>
      <ActionIcon color="yellow" variant="light" onClick={() => toggleIsModalOpen()} sx={{ margin: 'auto' }}>
        <Edit />
      </ActionIcon>
    </>
  );
};
