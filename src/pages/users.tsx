import { useGetUsersQuery } from '../api/users';
import UsersTable from '../business-components/Users/Table';

export function UsersPage() {
  const { data: users, isLoading } = useGetUsersQuery();

  return (
    <div className="w-full">
      {isLoading && <div>Загрузка...</div>}
      {users && <UsersTable users={users} />}
    </div>
  );
}
