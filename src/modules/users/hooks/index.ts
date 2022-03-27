import { trpc } from '~/utils/trpc';

export const useUsers = () => trpc.useQuery(['user.users']);
export const useFindUserById = (id: string) => trpc.useQuery(['user.byId', { id }]);
export const useCreateUser = () => trpc.useMutation(['user.create']);
export const useUpdateUser = () => trpc.useMutation(['user.update']);
