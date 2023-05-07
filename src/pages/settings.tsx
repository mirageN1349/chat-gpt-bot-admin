import { useState } from 'react';
import ChangePassword from '../business-components/Settings/ChangePassword';
import { Tabs } from '../components/Tabs';
import ProfileSettings from '../business-components/Settings/ProfileSettings';

export function SettingPage() {
  const [activeTab, setActiveTab] = useState<string>('profile');
  const handleChangeTab = (newTab: string) => {
    setActiveTab(newTab);
  };
  return (
    <div className="w-full">
      <header className="mb-10 flex items-center justify-between">
        <div className="text-2xl font-medium">Настройки</div>
      </header>
      <Tabs
        className="mb-8"
        activeTab={activeTab}
        onChangeTab={handleChangeTab}
      >
        <Tabs.Tab tab="profile">Профиль</Tabs.Tab>
        <Tabs.Tab tab="security">Безопасность</Tabs.Tab>
      </Tabs>
      <Tabs.TabContainer activeTab={activeTab} tab="profile">
        <ProfileSettings
          onSubmit={() => {
            console.log('change profile');
          }}
        />
      </Tabs.TabContainer>
      <Tabs.TabContainer activeTab={activeTab} tab="security">
        <ChangePassword onSubmit={data => console.log(data)} />
      </Tabs.TabContainer>
    </div>
  );
}
