import { trpc } from '~/utils/trpc';

export const useTemplateFields = () => trpc.useQuery(['template.fields']);
export const useTemplateFieldsUpdate = () => {
  const utils = trpc.useContext();

  return trpc.useMutation('template.update', {
    onSuccess() {
      utils.invalidateQueries(['template.fields']);
    },
  });
};
export const useTemplateFieldsCreate = () => {
  const utils = trpc.useContext();

  return trpc.useMutation('template.create', {
    onSuccess() {
      utils.invalidateQueries(['template.fields']);
    },
  });
};

export const useTemplateFieldsDelete = () => {
  const utils = trpc.useContext();

  return trpc.useMutation('template.delete', {
    onSuccess() {
      utils.invalidateQueries(['template.fields']);
    },
  });
};
