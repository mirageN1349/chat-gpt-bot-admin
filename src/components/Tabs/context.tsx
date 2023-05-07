import { createContext } from 'react';

type TabsContextType = {
  activeTab: string | null;
  onChangeTab?: (newTab: string) => void;
};

export const TabsContext = createContext<TabsContextType>({ activeTab: null });
