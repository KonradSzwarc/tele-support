import { createStateContext } from 'react-use';

const [useState, Provider] = createStateContext({});

const useForm = () => {
  const [values, setValues] = useState();

  const updateField = (id: string, value: string | null) => {
    setValues((values) => ({ ...values, [id]: value }));
  };

  const submitForm = () => {
    console.log(values);
  };

  return { values, updateField, submitForm };
};

export { Provider, useForm };
