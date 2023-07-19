import { useState, useContext, FormEvent, ChangeEvent } from "react";
import UserContext from "./userContext";
import Alert from "../Common/Alert";
import { toast } from "react-toastify";
import TOAST_DEFAULTS from "../Helpers/toastSettings";
import { UserStateInterface } from "../Types/Interfaces";

export interface ProfileFormPropInterface {
  updateUser: Function;
}
/** ProfileForm: Form for updating user profile.
 *
 * Props: update
 * State: formData, status
 *
 * App -> RouteList -> ProfileForm
 **/
function ProfileForm({ updateUser }: ProfileFormPropInterface): JSX.Element {
  const { user } = useContext<UserStateInterface>(UserContext);
  // console.log("USER", user);

  const [status, setStatus] = useState({
    updateMsg: [] as string[],
    errors: [] as string[],
  });

  const [formData, setFormData] = useState({
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  });

  /** Update form data field */
  function handleChange(evt: ChangeEvent<HTMLInputElement>): void {
    const { name, value } = evt.target;
    setFormData((f) => ({ ...f, [name]: value }));
  }

  /** Handle form submission:
   * - try to update
   *    - if update works, show success message
   *    - if update fails, show error message
   **/
  async function handleSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    try {
      await updateUser(formData);
      setStatus({ updateMsg: ["Updated successfully."], errors: [] });
    } catch (e) {
      setStatus({ updateMsg: [], errors: e as string[] });
      toast("❌ Update Failed!", TOAST_DEFAULTS);
    }
  }

  return (
    <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
      <div className="heading-minor text-center">Edit Profile</div>
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
              <button className="btn btn-outline-dark " type="submit">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProfileForm;
