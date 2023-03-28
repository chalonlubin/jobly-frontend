

export interface signUpDataInterface {
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

export interface RoutePropsInterface {
  login?: Function,
  signUp?: Function,
  updateUser?: Function,
}

export interface AlertPropsInterface {
  alerts: string[];
  type: "success" | "danger";
}

export interface SearchFormProps {
  searchFor: (query: string) => void;
}

export interface CompanyListInterface {
  handle: string;
  name: string;
  description: string;
  numEmployees: number;
  logoUrl: string | null;
}

export interface CompanyPropsInterface {
  handle: string;
  name: string;
  description: string;
  numEmployees: number;
  logoUrl: string | null;
  jobs: [];
}

export interface JobInterface {
    id: number,
    title: string,
    salary: number,
    equity: string,
    companyHandle: string,
    companyName: string
}


export interface JobListStateInterface {
  jobList: JobInterface[];
  isLoading: boolean;
  query: string | undefined;
}

export interface JobPropsInterface {
  job: JobInterface
}


export interface JobsInterface {
  jobs: JobInterface[]
}