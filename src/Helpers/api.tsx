import axios, { AxiosRequestConfig } from "axios";
import { ApplicationInterface } from "../Types/Interfaces";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 */

class JoblyApi {
  // token for interaction with the API.
  static token: string = "";

  static async request(
    endpoint: string,
    data: object = {},
    method: AxiosRequestConfig["method"] = "get"
  ): Promise<any> {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err: any) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  /***************************************************** Company  */

  /** Get details on a company by handle.
   *
   * Returns { handle, name, description, numEmployees, logoUrl, jobs }
   * where jobs is [{ id, title, salary, equity }, ...]
   **/
  static async getCompany(handle: string) {
    const res = await this.request(`companies/${handle}`);

    return res.company;
  }

  /** Get all companies (filtered by name if not undefined.).
   *
   * Returns [{ handle, name, description, numEmployees, logoUrl }, ...]
   *
   * If search is provided, filters to companies whose name contains search.
   **/
  static async getCompanies(search?: string, min?: number, max?: number) {
    const searchParams = Object.fromEntries(
      [
        ["nameLike", search],
        ["minEmployees", min],
        ["maxEmployees", max],
      ].filter(([key, value]) => value !== undefined || "")
    );

    let res = await this.request(`companies/`, searchParams);
    return res.companies;
  }

  /***************************************************** Job  */

  /** Get all jobs or specific job(s).
   *
   * Returns [{ id, title, salary, equity, companyHandle, companyName }, ...]
   *
   * If search is provided, filters to jobs whose title contains search.
   **/
  static async getJobs(search?: string, min: number = 0, hasEquity = null) {
    const res = search
      ? await this.request(`jobs/`, {
          title: search,
          minSalary: min,
          hasEquity: hasEquity,
        })
      : await this.request(`jobs/`);
    return res.jobs;
  }

  /** Apply to a job */

  static async applyToJob(username: string, id: number) {
    await this.request(`users/${username}/jobs/${id}`, {}, "post");
  }

  /**************************************************************** User  */

  /** Register a new user.
   *
   * Returns a token.
   **/
  static async registerUser(data: object) {
    const res = await this.request(`auth/register`, data, "post");
    return res.token;
  }

  /** Login a user.
   *
   * Returns a token.
   **/
  static async loginUser(data: object) {
    const res = await this.request(`auth/token`, data, "post");

    return res.token;
  }

  /** Get user data.
   *
   * Returns { username, firstName, lastName, email, isAdmin, applications }.
   * where applications is [application, ...]
   */

  static async getUser(username: string) {
    const res = await this.request(`users/${username}`);

    return res.user;
  }

  /** Updates a user.
   *
   * Returns { username, firstName, lastName, email, isAdmin }.
   **/
  static async updateUser(username: string, userData: object) {
    const res = await this.request(`users/${username}`, userData, "patch");

    return res.user;
  }

  /** Get all active applications for a user.
   *
   * Returns [{ id, title, salary, equity, companyHandle, companyName }, ...]
   * */
  static async getUserApplications(username: string): Promise<ApplicationInterface[]> {
    const res = await this.request(`users/${username}/applications`);
    return res.applications;
  }
}

export default JoblyApi;
