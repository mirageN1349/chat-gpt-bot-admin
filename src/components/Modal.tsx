import React from 'react';
import { createPortal } from 'react-dom';
import Transition from './Transition';

type Props = React.PropsWithChildren & {
  open: boolean;
  onClose?: () => void;
};

export function Modal({ open, children, onClose }: Props) {
  const modal = (
    <>
      <div
        className="z-20 bg-black/40 fixed left-0 top-0 w-full h-full"
        onClick={onClose}
      ></div>
      {children}
    </>
  );

  return (
    <Transition mount={open}>{createPortal(modal, document.body)}</Transition>
  );
}
