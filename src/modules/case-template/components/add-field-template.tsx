import { ActionIcon, Modal } from '@mantine/core';
import { useBooleanToggle } from '@mantine/hooks';
import { useNotifications } from '@mantine/notifications';
import { Plus } from 'tabler-icons-react';
import { useTemplateFieldsCreate } from '../hooks';
import { FieldTemplateForm, FieldTemplateInput } from './field-template-form';
import { columnsInTheTable } from './row-divider';

export type AddFieldTemplateProps = {
  parentId?: string;
};

export const AddFieldTemplate = ({ parentId }: AddFieldTemplateProps) => {
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
        <FieldTemplateForm onSubmit={handleFormSubmission} />
      </Modal>
      <tr style={{ backgroundColor: 'transparent' }}>
        <td colSpan={columnsInTheTable}>
          <ActionIcon color="green" variant="light" sx={{ margin: '0 auto' }} onClick={() => toggleIsModalOpen()}>
            <Plus />
          </ActionIcon>
        </td>
      </tr>
    </>
  );
};
