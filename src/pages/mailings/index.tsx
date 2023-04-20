import { Link } from 'react-router-dom';

export function MailingsPage() {
  return (
    <div className="w-full flex gap-4">
      <h3 className="text-2xl text-white">Список рассылок</h3>
      <Link
        to="/mailings/create"
        replace
        className="w-fit bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        type="submit"
      >
        Создать
      </Link>
    </div>
  );
}
