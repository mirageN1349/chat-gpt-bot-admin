export type GetUsersDTO = GetUserDTO[];

export type GetUserDTO = {
  id: string;
  email: string | null;
  telegramId: string;
  telegramUsername: string;
  banned: boolean;
  ban_reason: string | null;
  telegramName: string;
  createdAt: string;
  updatedAt: string;
  roles: UserRoleDTO[];
};

export type UserRoleDTO = {
  id: string;
  key: string;
  value: string;
};

export type BanUserDTO = {
  id: string;
  banReason: string;
};

export type UnbanUserDTO = {
  id: string;
};
