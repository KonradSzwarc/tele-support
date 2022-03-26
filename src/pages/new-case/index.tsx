import { NextPage } from 'next';
import { CaseForm } from './components/case-form';
import { Provider } from './contexts/form-context';

const NewCasePage: NextPage = () => {
  return (
    <Provider>
      <CaseForm />
    </Provider>
  );
};

export default NewCasePage;
