import { createStateContext } from 'react-use';
import { useCreateCase } from '../hooks';

const [useState, Provider] = createStateContext<Record<string, string>>({});

const useForm = () => {
  const { mutate: createCase } = useCreateCase();
  const [values, setValues] = useState();

  const updateField = (id: string, value: string) => {
    setValues((values) => ({ ...values, [id]: value }));
  };

  const submitForm = () => {
    createCase(values);
  };

  return { values, updateField, submitForm };
};

export { Provider, useForm };
