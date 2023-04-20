import React, { useEffect, useRef, useState } from 'react';
import { useClickOutside } from '../../hooks/useClickOutside';
import { HiDotsVertical } from 'react-icons/hi';
import { createPortal } from 'react-dom';
import Transition from '../Transition';
import { Action } from './types';
import { Plate } from './Plate';

type Props = {
  className?: string;
  actions: Action[];
};

export function ActionsMenu({ actions, className }: Props) {
  const [opened, setOpened] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const promptRef = useRef<HTMLDivElement>(null);

  useClickOutside({
    ref: promptRef,
    handler: () => setOpened(false),
    exceptions: [buttonRef],
  });

  useEffect(() => {
    if (!promptRef.current || !buttonRef.current) return;

    const button = buttonRef.current.getBoundingClientRect();
    const prompt = promptRef.current.getBoundingClientRect();

    promptRef.current.style.top = `${button.top + button.height}px`;
    if (button.left + prompt.width > document.body.clientWidth) {
      promptRef.current.style.left = `${button.left - prompt.width}px`;
    } else {
      promptRef.current.style.left = `${button.left}px`;
    }
  }, [opened]);

  return (
    <div>
      <button
        ref={buttonRef}
        className={`${className || ''} ${
          opened ? 'rotate-90' : ''
        } cursor-pointer w-5 h-5 transition-all`}
        onClick={() => setOpened(prev => !prev)}
      >
        <HiDotsVertical className="w-full h-wull" />
      </button>
      {opened &&
        createPortal(
          <Plate ref={promptRef} actions={actions} />,
          document.body
        )}
    </div>
  );
}
