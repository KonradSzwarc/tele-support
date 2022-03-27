import { ActionIcon, Box, Modal, NumberInput, Select, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useBooleanToggle } from '@mantine/hooks';
import { A, D, pipe } from '@mobily/ts-belt';
import { FieldTemplate, FieldType } from '@prisma/client';
import { Edit } from 'tabler-icons-react';
import { Switch } from '~/components/switch';
import { SaveButton } from '~/components/save-button';
import { Writeable } from '~/utils';
import { convertTypeToString } from '../utils';
import { z } from 'zod';
import { useTemplateFieldsUpdate } from '../hooks';
import { useNotifications } from '@mantine/notifications';

export const updateFieldTemplateInputSchema = z.object({
  name: z.string().min(1),
  order: z.number().int().min(0),
  isRequired: z.boolean().default(true),
  type: z.nativeEnum(FieldType),
});

export type UpdateFieldTemplateInput = z.infer<typeof updateFieldTemplateInputSchema>;

export type EditFieldTemplateProps = {} & Omit<FieldTemplate, 'parentId' | 'isVisible'>;

export const EditFieldTemplate = ({ id, name, isRequired, order, type }: EditFieldTemplateProps) => {
  const { mutateAsync: updateFieldTemplate } = useTemplateFieldsUpdate();
  const notifications = useNotifications();
  const [isModalOpen, toggleIsModalOpen] = useBooleanToggle();
  const types = pipe(
    FieldType,
    D.values,
    A.map((type) => ({ value: type, label: convertTypeToString(type) }))
  );

  const form = useForm({
    initialValues: {
      name,
      order,
      type,
      isRequired,
    },
    schema: zodResolver(updateFieldTemplateInputSchema),
  });

  const handleFormSubmission = async (fieldTemplate: UpdateFieldTemplateInput) => {
    await updateFieldTemplate({ fieldTemplate, id });
    toggleIsModalOpen();
    notifications.showNotification({ title: 'Sukces', message: 'Zmiana pola przebiegła pomyślnie', color: 'green' });
  };

  return (
    <>
      <Modal opened={isModalOpen} withCloseButton={false} onClose={toggleIsModalOpen} title="Edytuj pole">
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }} onSubmit={form.onSubmit(handleFormSubmission)}>
          <TextInput label="Nazwa" {...form.getInputProps('name')} />
          <NumberInput label="Kolejność" min={0} {...form.getInputProps('order')} />
          <Select label="Typ" data={types as Writeable<typeof types>} {...form.getInputProps('type')} />
          <Switch size="md" label="Pole jest wymagane" {...form.getInputProps('isRequired')} />
          <SaveButton type="submit" />
        </Box>
      </Modal>
      <ActionIcon color="yellow" variant="light" onClick={() => toggleIsModalOpen()}>
        <Edit />
      </ActionIcon>
    </>
  );
};
