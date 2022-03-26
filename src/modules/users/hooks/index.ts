import { trpc } from '~/utils/trpc';

export const useUsers = () => trpc.useQuery(['user.users']);
export const useCreateUser = () => trpc.useMutation(['user.create']);
