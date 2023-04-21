import React, { useState, forwardRef } from 'react';
import Transition from '../Transition';
import { Action } from './types';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  actions: Action[];
};

function PlateComponent(
  { actions, ...props }: Props,
  forwardedRef: React.Ref<HTMLDivElement>
) {
  const [transition, setTransition] = useState(false);
  return (
    <Transition
      mount
      onTransitionMount={() => setTransition(true)}
      onTransitionUnmount={() => setTransition(false)}
    >
      <div
        ref={forwardedRef}
        className={`${
          transition ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        } absolute shadow-md w-[200px] transition-all z-50 will-change-[opacity] overflow-hidden bg-white rounded-md`}
        {...props}
      >
        {actions.map((action, index) => (
          <button
            key={index}
            className={`${
              action.className || ''
            } hover:bg-slate-200 text-black transition-all w-full py-2 mx-auto`}
            onClick={action.onClick}
            disabled={action.disabled}
          >
            {action.title}
          </button>
        ))}
      </div>
    </Transition>
  );
}

export const Plate = forwardRef(PlateComponent);
