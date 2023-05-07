import ChangePassword from '../business-components/Settings/ChangePassword';

export function SettingPage() {
  return (
    <div className="w-full">
      <header className="mb-10 flex items-center justify-between">
        <div className="text-2xl font-medium">Настройки</div>
      </header>
      <ChangePassword onSubmit={data => console.log(data)} />
    </div>
  );
}
