export type CurrentUserDTO = {
  email: string;
  roles: {
    key: string;
    value: string;
  }[];
};

export type SigninDTO = {
  email: string;
  password: string;
};

export type SignupDTO = {
  email: string;
  password: string;
};
