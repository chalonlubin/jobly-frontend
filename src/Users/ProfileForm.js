import React, { useState, useContext } from "react";
import userContext from "./userContext";
import Alert from "../Common/Alert";

/** ProfileForm: Form for updating user profile.
 *
 * Props: update
 * State: formData, status
 *
 * App -> RouteList -> ProfileForm
 **/
function ProfileForm({ update }) {
  const { user } = useContext(userContext);

  const [status, setStatus] = useState({
    updateMsg: [],
    errors: [],
  });

  const [formData, setFormData] = useState({
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  });

  /** Update form data field */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((f) => ({ ...f, [name]: value }));
  }

  /** Handle form submission:
   * - try to update
   *    - if update works, show success message
   *    - if update fails, show error message
   **/
  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await update(formData);
      setStatus({ updateMsg: ["Updated successfully."], errors: [] });
    } catch (e) {
      setStatus({ updateMsg: [], errors: e });
    }
  }

  return (
    <div className="SignupForm pt-5">
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <h3 className="m-3 py-3 text-center fs-1">Edit Profile</h3>
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  name="username"
                  type="text"
                  className="form-control"
                  value={user.username}
                  disabled
                />
              </div>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  First Name
                </label>
                <input
                  onChange={handleChange}
                  value={formData.firstName}
                  name="firstName"
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Last Name
                </label>
                <input
                  onChange={handleChange}
                  value={formData.lastName}
                  name="lastName"
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Email
                </label>
                <input
                  onChange={handleChange}
                  value={formData.email}
                  name="email"
                  type="email"
                  className="form-control"
                />
              </div>
              {status.updateMsg.length !== 0 && (
                <div className="d-grid mt-4">
                  <Alert alerts={status.updateMsg} type={"success"} />
                </div>
              )}
              {status.errors.length !== 0 && (
                <div className="d-grid mt-4">
                  <Alert alerts={status.errors} type={"danger"} />
                </div>
              )}
              <div className="d-grid mt-1">
                <button
                  className="btn btn-outline-dark "
                  onClick={handleSubmit}
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileForm;
