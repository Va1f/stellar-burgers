import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { getName } from '../../services/slices/userSlice';

export const AppHeader: FC = () => {
  const userName = useSelector(getName);
  return <AppHeaderUI userName={userName} />;
};
