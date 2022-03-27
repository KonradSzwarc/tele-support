import { trpc } from '~/utils/trpc';

export const useTemplateFields = () => trpc.useQuery(['template.fields']);
