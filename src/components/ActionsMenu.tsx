import React, { useEffect, useRef, useState } from 'react';
import { useClickOutside } from '../hooks/useClickOutside';
import { HiDotsVertical } from 'react-icons/hi';
import { createPortal } from 'react-dom';

type Action = {
  title: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
};

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

  const prompt = (
    <div
      ref={promptRef}
      className="absolute w-[200px] z-50 overflow-hidden bg-white rounded-md"
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
  );

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
      {opened && createPortal(prompt, document.body)}
    </div>
  );
}
