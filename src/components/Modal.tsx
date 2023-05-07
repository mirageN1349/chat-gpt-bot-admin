import { useState, PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import Transition from './Transition';

type Props = PropsWithChildren & {
  open: boolean;
  onClose?: () => void;
  onTransitionMount?: () => void;
  onTransitionUnmount?: () => void;
  onMount?: () => void;
  onUnmount?: () => void;
};

export function Modal({
  open,
  children,
  onClose,
  onTransitionMount,
  onTransitionUnmount,
  onMount,
  onUnmount,
}: Props) {
  const [transition, setTransition] = useState(false);
  const modal = (
    <>
      <div
        className={`${
          transition ? 'opacity-1' : 'opacity-0'
        } z-20 bg-black/40 transition-all fixed left-0 top-0 w-full h-full`}
        onClick={onClose}
      />
      {children}
    </>
  );

  return (
    <Transition
      mount={open}
      duration={150}
      onMount={onMount}
      onUnmount={onUnmount}
      onTransitionMount={() => {
        onTransitionMount?.();
        setTransition(true);
      }}
      onTransitionUnmount={() => {
        onTransitionUnmount?.();
        setTransition(false);
      }}
    >
      {createPortal(modal, document.body)}
    </Transition>
  );
}
