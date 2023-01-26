import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // Remember, the backend needs to be authorized with a token
  // We're providing a token you can use to interact with the backend API
  // DON'T MODIFY THIS TOKEN
  // static token =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
  //   "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
  //   "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

  static async request(endpoint, data = {}, method = "get", token) {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle.
   *
   * Returns { handle, name, description, numEmployees, logoUrl, jobs }
   * where jobs is [{ id, title, salary, equity }, ...]
   *
   * Throws NotFoundError if company not found.
   *
   */
  static async getCompany(handle) {
    const res = await this.request(`companies/${handle}`);

    return res.company;
  }

  /** Get all companies or search for specific company(s).
   *
   * Returns [{ handle, name, description, numEmployees, logoUrl }, ...]
   *
   * If search is provided, filters to companies whose name contains search.
   *
   * Throws NotFoundError if no companies found.
   *
   */
  static async getCompanies(search) {
    const res = await this.request(`companies/`, { nameLike: search });

    return res.companies;
  }

  /** Get all jobs or specific job(s).
   *
   * Returns [{ id, title, salary, equity, companyHandle, companyName }, ...]
   *
   * If search is provided, filters to jobs whose title contains search.
   *
   * Throws NotFoundError if no jobs found.
   *
   */
  static async getJobs(search) {
    const res = await this.request(`jobs/`, { title: search });

    return res.jobs;
  }

  /************************************** User  */

  /** Register a user. */
  static async registerUser(signupData) {
    const res = await this.request(`auth/register`, signupData, "post");
    return res.token;
  }

  /** Logs a user in.  */
  static async loginUser(loginData) {
    const res = await this.request(`auth/token`, loginData, "post");

    return res.token;
  }

  //** Get's user details. */
  static async getUser(token, username) {
    const res = await this.request(`users/${username}`, {}, "get", token);

    return res.user;
  }

  //** Update user details. */
  static async updateUser(token, username, userData) {
    const res = await this.request(`users/${username}`, userData, "patch", token);

    return res.user;
  }
}

export default JoblyApi;
