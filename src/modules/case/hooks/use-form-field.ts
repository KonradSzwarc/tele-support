import { D } from '@mobily/ts-belt';
import { useEffectOnce } from 'react-use';
import { useFormState } from '../contexts/form-context';

export const useFormField = (id: string) => {
  const [values, setValues] = useFormState();
  const value = values[id] ?? '';

  const registerField = (id: string) => {
    setValues((values) => ({ ...values, [id]: '' }));
  };

  const unRegisterField = (id: string) => {
    setValues((values) => D.deleteKey(values, id));
  };

  const updateField = (id: string, value: string) => {
    setValues((values) => ({ ...values, [id]: value }));
  };

  useEffectOnce(() => {
    registerField(id);
    return () => unRegisterField(id);
  });

  return { value, updateField, registerField, unRegisterField };
};
