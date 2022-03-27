import { TextInput, NumberInput, Select, Box } from '@mantine/core';
import { zodResolver, useForm } from '@mantine/form';
import { pipe, D, A } from '@mobily/ts-belt';
import { FieldTemplate, FieldType } from '@prisma/client';
import { z } from 'zod';
import { SaveButton } from '~/components/save-button';
import { Switch } from '~/components/switch';
import { Writeable } from '~/utils';
import { convertTypeToString } from '../utils';

export const fieldTemplateInputSchema = z.object({
  name: z.string().min(1),
  order: z.number().int().min(0),
  isRequired: z.boolean().default(true),
  type: z.nativeEnum(FieldType),
});

export type FieldTemplateInput = z.infer<typeof fieldTemplateInputSchema>;

export type FieldTemplateFormProps = {
  onSubmit: (input: FieldTemplateInput) => void;
} & Partial<Omit<FieldTemplate, 'id' | 'parentId' | 'isVisible'>>;

export const FieldTemplateForm = ({
  isRequired = true,
  name = '',
  order = 1,
  type = 'SINGLE_SELECT',
  onSubmit,
}: FieldTemplateFormProps) => {
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
    schema: zodResolver(fieldTemplateInputSchema),
  });

  return (
    <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }} onSubmit={form.onSubmit(onSubmit)}>
      <TextInput label="Nazwa" {...form.getInputProps('name')} />
      <NumberInput label="Kolejność" min={0} {...form.getInputProps('order')} />
      <Select label="Typ" data={types as Writeable<typeof types>} {...form.getInputProps('type')} />
      <Switch size="md" label="Pole jest wymagane" {...form.getInputProps('isRequired')} />
      <SaveButton type="submit" />
    </Box>
  );
};
