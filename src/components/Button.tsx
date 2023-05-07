import { ButtonHTMLAttributes } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ className = '', children, ...props }: Props) {
  return (
    <button
      className={`${className} disabled:bg-gray-500 disabled:active:scale-100 px-4 py-2 active:scale-95 transition-all text-center gap-2 hover:bg-indigo-500 rounded-lg bg-indigo-600 text-white`}
      {...props}
    >
      {children}
    </button>
  );
}
