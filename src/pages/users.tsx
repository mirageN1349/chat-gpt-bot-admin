import { useState } from 'react';

import { BsPlus, BsSearch } from 'react-icons/bs';

import {
  useBanUserMutation,
  useGetUsersQuery,
  useUnbanUserMutation,
} from '../api/users';
import UsersTable from '../business-components/Users/Table';
import { BanModal } from '../business-components/Users/BanModal';
import { UnbanModal } from '../business-components/Users/UnbanModal';
import { InfoTile } from '../components/InfoTile';
import { DeleteModal } from '../business-components/Users/DeleteModal';
import { ClearContextModal } from '../business-components/Users/ClearContextModal';
import Button from '../components/Button';

// FIXME: Мне это решение не нравится
type Modals =
  | {
      type: 'ban';
      userId: string;
    }
  | {
      type: 'clearContext';
      userId: string;
    }
  | {
      type: 'unban';
      userId: string;
    }
  | {
      type: 'delete';
      userId: string;
    };

export function UsersPage() {
  const { data: users, isLoading } = useGetUsersQuery();
  const [modal, setModal] = useState<Modals | null>(null);

  const [banUser, { isLoading: banUserLoading }] = useBanUserMutation();
  const [unbanUser, { isLoading: unbanUserLoading }] = useUnbanUserMutation();

  const onDeleteUser = (userId: string) => {
    setModal({
      type: 'delete',
      userId,
    });
  };

  const onClearUserContext = (userId: string) => {
    setModal({
      type: 'clearContext',
      userId,
    });
  };

  const onBanUser = (banData: { id: string; isBanned: boolean }) => {
    if (banData.isBanned) {
      setModal({
        type: 'unban',
        userId: banData.id,
      });
    } else {
      setModal({
        type: 'ban',
        userId: banData.id,
      });
    }
  };

  const handleDeleteUser = async () => {
    if (!modal) return;
    try {
      console.log('delete user');
    } catch (error) {
      console.log(error);
    } finally {
      setModal(null);
    }
  };

  const handleClearUserContext = async () => {
    if (!modal) return;
    try {
      console.log('clear user context');
    } catch (error) {
      console.log(error);
    } finally {
      setModal(null);
    }
  };

  const handleBanUser = async (banReason: string) => {
    if (!modal) return;
    try {
      await banUser({ id: modal?.userId, banReason }).unwrap();
    } catch (error) {
      console.log(error);
    } finally {
      setModal(null);
    }
  };

  const handleUnbanUser = async () => {
    if (!modal) return;
    try {
      await unbanUser({ id: modal?.userId }).unwrap();
    } catch (error) {
      console.log(error);
    } finally {
      setModal(null);
    }
  };

  const closeModal = () => {
    setModal(null);
  };

  return (
    <>
      <header className="mb-10 flex items-center justify-between">
        <div className="text-2xl font-medium">Пользователи</div>
        <Button type="button" className="flex items-center">
          <BsPlus className="w-6 h-6" />
          Добавить
        </Button>
      </header>
      <div className="grid gap-6 grid-cols-3">
        <InfoTile title="Новые пользователи" value={27} />
        <InfoTile title="Всего пользователей" value={1584} percentage={5} />
        <InfoTile title="Новых сообщений" value={268} percentage={-12} />
      </div>
      <div className="my-8 flex justify-end">
        <label
          htmlFor="search-input"
          className="rounded-lg w-[300px] gap-2 py-2 px-4 placeholder:text-[#8C8E90] flex items-center border border-[#E0E0E0]"
        >
          <BsSearch className="text-[#8C8E90]" />
          <input
            id="search-input"
            className="outline-none"
            placeholder="Поиск"
          />
        </label>
      </div>
      {isLoading && <div>Загрузка...</div>}
      {users && (
        <UsersTable
          users={users}
          onBanUser={onBanUser}
          onDeleteUsers={onDeleteUser}
          onClearUsersContext={onClearUserContext}
        />
      )}

      <BanModal
        open={modal?.type === 'ban'}
        onSubmit={data => handleBanUser(data)}
        onCancel={closeModal}
        isLoading={banUserLoading}
      />
      <UnbanModal
        open={modal?.type === 'unban'}
        onSubmit={handleUnbanUser}
        onCancel={closeModal}
        isLoading={unbanUserLoading}
      />
      <DeleteModal
        open={modal?.type === 'delete'}
        onSubmit={handleDeleteUser}
        onCancel={closeModal}
        isLoading={unbanUserLoading}
      />
      <ClearContextModal
        open={modal?.type === 'clearContext'}
        onSubmit={handleClearUserContext}
        onCancel={closeModal}
        isLoading={unbanUserLoading}
      />
    </>
  );
}
