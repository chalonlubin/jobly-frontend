import { useState, FormEvent, ChangeEvent } from "react";
import Alert from "../Common/Alert";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import TOAST_DEFAULTS from "../Helpers/toastSettings";
import { SignUpFormPropsInterface, UserInterface } from "../Types/Interfaces";





/** signUpForm: Form for signing up.
 *
 * Props: signUp
 * State: formData, errors
 *
 * App -> RouteList -> signUpForm
 **/
function SignUpForm({ signUp }: SignUpFormPropsInterface): JSX.Element {
  const navigate = useNavigate();

  const [errors, setErrors] = useState<string[]>([]);
  const [formData, setFormData] = useState<UserInterface>({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  /** Update form data field */
  function handleChange(evt: ChangeEvent<HTMLInputElement>): void {
    const { name, value } = evt.target;
    setFormData((f) => ({ ...f, [name]: value }));
  }

  /** Handle form submission:
   * - try to signUp
   *    - if signUp works, redirect to homepage
   *    - if signUp fails, show error message
   **/
  async function handleSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    try {
      await signUp(formData);
      navigate("/");
    } catch (e) {
      setErrors(e as string[]);
      toast("❌ Sign-up Failed!", TOAST_DEFAULTS);
    }
  }


  return (

      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <h3 className="m-3 text-center heading-minor">Sign Up</h3>
        <div className="card shadow-lg">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label text-muted">
                  Username
                </label>
                <input
                  onChange={handleChange}
                  value={formData.username}
                  name="username"
                  type="text"
                  className="form-control shadow-sm"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label text-muted">
                  Password
                </label>
                <input
                  onChange={handleChange}
                  value={formData.password}
                  name="password"
                  type="password"
                  className="form-control shadow-sm"
                  required
                />
                <small className="form-text text-muted">
                  Your password must be 5-20 characters long, contain letters
                  and numbers, and must not contain spaces, special characters,
                  or emoji.
                </small>
              </div>
              <div className="mb-3">
                <label htmlFor="username" className="form-label text-muted">
                  First Name
                </label>
                <input
                  onChange={handleChange}
                  value={formData.firstName}
                  name="firstName"
                  type="text"
                  className="form-control shadow-sm"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="username" className="form-label text-muted">
                  Last Name
                </label>
                <input
                  onChange={handleChange}
                  value={formData.lastName}
                  name="lastName"
                  type="text"
                  className="form-control shadow-sm"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="username" className="form-label text-muted">
                  Email
                </label>
                <input
                  onChange={handleChange}
                  value={formData.email}
                  name="email"
                  type="email"
                  className="form-control shadow-sm"
                  required
                />
              </div>
              {errors.length > 0 && (
                <div className="d-grid mt-4">
                  <Alert alerts={errors} type={"danger"} />
                </div>
              )}
              <div className="d-grid mt-2">
                <button
                  className="btn btn-outline-success"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

  );
}

export default SignUpForm;
