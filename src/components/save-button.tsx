import { ButtonProps, Button } from '@mantine/core';
import { CloudUpload } from 'tabler-icons-react';

export const SaveButton = (props: ButtonProps<'button'>) => {
  return (
    <Button rightIcon={<CloudUpload size={20} />} {...props}>
      Zapisz
    </Button>
  );
};
