import { HTMLAttributes, PropsWithChildren, useContext } from 'react';
import { TabsContext } from './context';

type Props = PropsWithChildren &
  HTMLAttributes<HTMLButtonElement> & {
    className?: string;
    tab: string;
  };

export function Tab({
  className = '',
  children,
  tab,
  onClick,
  ...props
}: Props) {
  const context = useContext(TabsContext);
  if (typeof context === 'undefined') {
    throw new Error('Use TabsContext');
  }

  const { activeTab, onChangeTab } = context;

  return (
    <button
      className={`${className} ${
        activeTab === tab
          ? 'text-indigo-600 hover:text-indigo-600'
          : 'text-gray-500 hover:text-gray-600'
      } transition-all pb-5 font-medium text-sm`}
      type="button"
      role="radio"
      aria-checked={activeTab === tab}
      onClick={e => {
        onClick?.(e);
        onChangeTab?.(tab);
      }}
      {...props}
    >
      {children}
    </button>
  );
}
