import React from 'react';
import { createPortal } from 'react-dom';

type Props = React.PropsWithChildren & {
  open: boolean;
  onClose?: () => void;
};

export function Modal({ open, children, onClose }: Props) {
  const modal = (
    <div className="z-100 fixed left-0 top-0 w-full h-full">{children}</div>
  );

  return createPortal(modal, document.body);
}
