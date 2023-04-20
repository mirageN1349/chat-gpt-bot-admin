import { useState } from 'react';

import {
  useBanUserMutation,
  useGetUsersQuery,
  useUnbanUserMutation,
} from '../api/users';
import UsersTable from '../business-components/Users/Table';
import { BanModal } from '../business-components/Users/BanModal';
import { UnbanModal } from '../business-components/Users/UnbanModal';

type Modals =
  | {
      type: 'ban';
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

  const closeModal = () => {
    setModal(null);
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

  return (
    <div className="w-full">
      {isLoading && <div>Загрузка...</div>}
      {users && (
        <UsersTable
          users={users}
          onBanUser={onBanUser}
          onDeleteUsers={function (userIds: string): void {
            throw new Error('Function not implemented.');
          }}
          onClearUsersContext={function (userIds: string): void {
            throw new Error('Function not implemented.');
          }}
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
        onSubmit={() => handleUnbanUser()}
        onCancel={closeModal}
        isLoading={unbanUserLoading}
      />
    </div>
  );
}
