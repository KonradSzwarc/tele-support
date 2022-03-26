import { useNotifications } from '@mantine/notifications';
import { A, D, pipe, S } from '@mobily/ts-belt';
import { Field } from '../components/case-form';
import { useFormState } from '../contexts/form-context';
import { useCreateCase } from '../hooks';
import { getRequiredFields } from '../utils';

export const useForm = (fields: Field[]) => {
  const [values, setValues] = useFormState();
  const { mutateAsync: createCase } = useCreateCase();
  const notifications = useNotifications();
  const requiredFields = getRequiredFields(fields ?? []);

  const submitForm = async () => {
    const isLegit = pipe(
      values,
      D.toPairs,
      A.every(([key, value]) => !A.includes(requiredFields, key) || S.isNotEmpty(value))
    );

    if (isLegit) {
      await createCase(values);
      const initialValues = pipe(
        fields,
        A.map(D.getUnsafe('id')),
        A.reduce(D.makeEmpty, (acc, current) => D.set(acc, current, ''))
      );

      setValues(initialValues);

      notifications.showNotification({
        title: 'Sprawa została odnotowana',
        message: 'Możesz teraz utworzyć nową',
        color: 'green',
      });
      return;
    }

    notifications.showNotification({
      title: 'Nie uzupełnione pola',
      message: 'Upewnij się że wypełniłeś wszystkie wymagane pola',
      color: 'red',
    });
  };

  return { values, submitForm };
};
