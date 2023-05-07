import { useState } from 'react';
import { Tabs } from '../components/Tabs';
import { UsersStatistics } from '../business-components/Statistics/UsersStatistics';
import { MessagesStatistics } from '../business-components/Statistics/MessagesStatistics';

export default function StatisticsPage() {
  const [activeTab, setActiveTab] = useState<string>('users');
  const handleChangeTab = (newTab: string) => {
    setActiveTab(newTab);
  };
  return (
    <>
      <header className="mb-10 flex items-center justify-between">
        <h3 className="text-2xl font-medium">Статистика</h3>
      </header>

      <Tabs
        className="mb-8"
        activeTab={activeTab}
        onChangeTab={handleChangeTab}
      >
        <Tabs.Tab tab="users">Пользователи</Tabs.Tab>
        <Tabs.Tab tab="messages">Сообщения</Tabs.Tab>
      </Tabs>
      <Tabs.TabContainer activeTab={activeTab} tab="users">
        <UsersStatistics />
      </Tabs.TabContainer>
      <Tabs.TabContainer activeTab={activeTab} tab="messages">
        <MessagesStatistics />
      </Tabs.TabContainer>
    </>
  );
}
