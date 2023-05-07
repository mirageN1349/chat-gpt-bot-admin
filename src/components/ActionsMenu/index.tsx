import { useEffect, useRef, useState } from 'react';
import { useClickOutside } from '../../hooks/useClickOutside';
import { HiDotsVertical } from 'react-icons/hi';
import { createPortal } from 'react-dom';
import { Action } from './types';
import { Plate } from './Plate';

type Props = {
  className?: string;
  actions: Action[];
  closeOnClick?: boolean;
};

export function ActionsMenu({ actions, className = '', closeOnClick }: Props) {
  const [opened, setOpened] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const promptRef = useRef<HTMLDivElement>(null);

  useClickOutside({
    ref: promptRef,
    handler: () => setOpened(false),
    exceptions: [buttonRef],
  });

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(({ isIntersecting }) => {
        if (!isIntersecting) {
          setOpened(false);
        }
      });
    });

    if (buttonRef.current) {
      observer.observe(buttonRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!promptRef.current || !buttonRef.current) return;

    const button = buttonRef.current.getBoundingClientRect();
    const prompt = promptRef.current.getBoundingClientRect();

    if (
      window.scrollY + button.y + button.height + prompt.height >
      window.scrollY + window.innerHeight
    ) {
      promptRef.current.style.top = `${
        window.scrollY + button.y - prompt.height
      }px`;
    } else {
      promptRef.current.style.top = `${
        window.scrollY + button.y + button.height
      }px`;
    }

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
          <Plate
            ref={promptRef}
            onClick={() => closeOnClick && setOpened(false)}
            actions={actions}
          />,
          document.body
        )}
    </div>
  );
}
