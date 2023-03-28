export interface AppPropsInterface {}

export interface SignupDataInterface {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  isAdmin: boolean;
  applications: Set<number>;
}

export interface UserInterface {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  isAdmin: boolean;
  applications: number[];
}

export interface LoginDataInterface {
  username: string;
  password: string;
}

export interface UpdateDataInterface {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
}
