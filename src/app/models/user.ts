export interface IUserRes {
  username: string | null;
  password: string;
  email: string | null;
  id: number;
  role: string;
}

export interface IUserLogin {
  password: string;
  email: string | null;
}

export interface IUserLoginRes {
  name: string;
  password: string;
  email: string;
  token: string;
}
export interface IUserRegister {
  name: string | null;
  password: string;
  email: string | null;
}

export interface IUserRegisterDummy {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
