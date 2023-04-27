/** Interfaces for Jobly Application */

/************************************************** Routes */

export interface RoutePropsInterface {
  login: Function;
  signUp: Function;
  updateUser: Function;
}

/************************************************** Common   */

export interface AlertPropsInterface {
  alerts: string[];
  type: "success" | "danger";
}

export interface SearchFormProps {
  searchFor: (query: string) => void;
}

/************************************************** User  */

export interface UserInterface {
  username: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  isAdmin?: boolean;
  applications?: Set<number>;
}

export interface UserStateInterface {
  user: UserInterface;
}

export interface UserContextInterface {
  applyToJob: Function;
  hasAppliedToJob: Function;
  setUser: Function;
  user?: UserInterface | null;
}

export interface LoginFormPropsInterface {
  login: Function;
}

export interface SignUpFormPropsInterface {
  signUp: Function;
}

/************************************************** Companies  */

export interface CompanyInterface {
  handle: string;
  name: string;
  description: string;
  numEmployees: number;
  logoUrl: string | null;
  jobs?: JobInterface[] | null;
}

/************************************************** Jobs  */

export interface JobInterface {
  id: number;
  title: string;
  salary: number;
  equity: string;
  companyHandle: string;
  companyName: string;
  applied: boolean;
}

export interface JobStateInterface {
  jobList: JobInterface[];
  isLoading: boolean;
  query: string | undefined;
}

export interface JobPropsInterface {
  job: JobInterface;
}

export interface JobsInterface {
  jobs: JobInterface[];
}
