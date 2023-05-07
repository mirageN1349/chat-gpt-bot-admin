import React, { PropsWithChildren } from 'react';

type Props = PropsWithChildren & {
  tab: string;
  activeTab: string;
};

export function TabContainer({ tab, activeTab, children }: Props) {
  return (activeTab === tab ? children : null) as React.ReactElement;
}
