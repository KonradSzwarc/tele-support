import { createStateContext } from 'react-use';

const [useFormState, Provider] = createStateContext<Record<string, string>>({});

export { Provider, useFormState };
