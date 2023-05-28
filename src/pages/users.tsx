import React, { useState } from 'react';

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
import { useDebounce } from '../hooks/useDebounce';
import Loader from '../components/Loader';

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

const PAGE_SIZE = 10;

export function UsersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(0);

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const {
    data: users,
    isLoading: usersListLoading,
    isFetching: usersListFetching,
  } = useGetUsersQuery({
    offset: currentPage * PAGE_SIZE,
    limit: PAGE_SIZE,
    searchText: debouncedSearchQuery || '',
  });
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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(0);
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
          className="rounded-lg w-[300px] gap-2 relative py-2 px-4 placeholder:text-[#8C8E90] flex items-center border border-[#E0E0E0]"
        >
          <BsSearch className="text-[#8C8E90] shrink-0" />
          <input
            onChange={handleSearch}
            id="search-input"
            className="grow outline-none"
            placeholder="Поиск"
          />

          {usersListFetching && (
            <Loader.Spinner size={24} className="absolute right-4 shrink-0" />
          )}
        </label>
      </div>
      {usersListLoading && <div>Загрузка...</div>}
      {users && (
        <UsersTable
          pager={{
            onNext: () => {
              if (currentPage - 1 < Math.ceil(users.count / PAGE_SIZE)) {
                setCurrentPage(prev => prev + 1);
              }
            },
            onPrev: () => {
              if (currentPage !== 0) setCurrentPage(prev => prev - 1);
            },
            size: PAGE_SIZE,
            total: Math.ceil(users.count / PAGE_SIZE),
            current: currentPage + 1,
            hasNextPage: currentPage - 1 < Math.ceil(users.count / PAGE_SIZE),
          }}
          users={users.data}
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
