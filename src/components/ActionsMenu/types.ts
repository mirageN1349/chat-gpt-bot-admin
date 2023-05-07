import { ReactNode } from 'react';

export type Action = {
  title: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
};
