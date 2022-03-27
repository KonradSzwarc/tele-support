import { NextPage } from 'next';
import { CaseForm } from '~/modules/case/components/case-form';
import { Provider } from '~/modules/case/contexts/form-context';

const NewCasePage: NextPage = () => {
  return (
    <Provider>
      <CaseForm />
    </Provider>
  );
};

export default NewCasePage;
