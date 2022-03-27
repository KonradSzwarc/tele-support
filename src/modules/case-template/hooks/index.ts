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
