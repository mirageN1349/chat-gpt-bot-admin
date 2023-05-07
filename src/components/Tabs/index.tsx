import { PropsWithChildren, useEffect, useMemo, useRef } from 'react';
import { Tab } from './Tab';
import { TabContainer } from './TabContainer';
import { TabsContext } from './context';

type Props = PropsWithChildren & {
  className?: string;
  activeTab: string;
  onChangeTab: (newTab: string) => void;
};

export function Tabs({ activeTab, onChangeTab, className, children }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && underlineRef.current) {
      const selectedChild = document.querySelector(
        'button[aria-checked="true"]'
      );

      if (selectedChild) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const childRect = selectedChild.getBoundingClientRect();

        underlineRef.current.style.width = `${childRect.width}px`;
        underlineRef.current.style.left = `${
          childRect.left - containerRect.left
        }px`;
      }
    }
  }, [activeTab]);

  const contextValue = useMemo(
    () => ({
      activeTab,
      onChangeTab,
    }),
    [activeTab, onChangeTab]
  );

  return (
    <TabsContext.Provider value={contextValue}>
      <div
        role="radiogroup"
        ref={containerRef}
        className={`${className} relative flex items-center gap-5`}
      >
        {children}
        <div
          ref={underlineRef}
          className="absolute bottom-0 transition-all left-0 h-[2px] rounded-full bg-indigo-600"
        />
      </div>
    </TabsContext.Provider>
  );
}

Tabs.Tab = Tab;
Tabs.TabContainer = TabContainer;
