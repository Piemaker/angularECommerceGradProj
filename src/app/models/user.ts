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

export interface IUserRegister {
  username: string | null;
  password: string;
  email: string | null;
}

export interface IUserRegisterDummy {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
