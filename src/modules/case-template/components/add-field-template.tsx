import { ActionIcon, Modal } from '@mantine/core';
import { useBooleanToggle } from '@mantine/hooks';
import { useNotifications } from '@mantine/notifications';
import { Plus } from 'tabler-icons-react';
import { useTemplateFieldsCreate } from '../hooks';
import { FieldTemplateForm, FieldTemplateInput } from './field-template-form';

export type AddFieldTemplateProps = {
  parentId?: string;
  order: number;
};

export const AddFieldTemplate = ({ parentId, order }: AddFieldTemplateProps) => {
  const { mutateAsync: createFieldTemplate } = useTemplateFieldsCreate();
  const notifications = useNotifications();
  const [isModalOpen, toggleIsModalOpen] = useBooleanToggle();

  const handleFormSubmission = async (fieldTemplate: FieldTemplateInput) => {
    await createFieldTemplate({ fieldTemplate, parentId });
    toggleIsModalOpen();
    notifications.showNotification({ title: 'Sukces', message: 'Utworzono nowe pole', color: 'green' });
  };

  return (
    <>
      <Modal opened={isModalOpen} withCloseButton={false} onClose={toggleIsModalOpen} title="Dodaj nowe pole">
        <FieldTemplateForm onSubmit={handleFormSubmission} order={order} />
      </Modal>
      <ActionIcon color="green" variant="light" sx={{ margin: '0 auto' }} onClick={() => toggleIsModalOpen()}>
        <Plus />
      </ActionIcon>
    </>
  );
};
