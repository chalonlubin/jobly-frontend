import React, { useState } from "react";
import Alert from "../Common/Alert";
import { useNavigate } from "react-router-dom";

const INITIAL_FORM_DATA = { username: "", password: "" };

/** Renders login form.
 *
 * Props: login function from parent (App)
 *
 * State: formData {username, password}
 *
 * App -> Routes -> LoginForm
 *
 */
function LoginForm({ login }) {
  const navigate = useNavigate();

  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  /** Update form data field */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((f) => ({ ...f, [name]: value }));
  }
  /** Call search in parent & clear form. */
  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await login(formData);
      navigate("/");
    } catch (e) {
      setErrors(e);
    }
  }

  return (
    <div className="LoginForm pt-5">
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <h3 className="mb-3 text-center fs-1">Log In</h3>
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  onChange={handleChange}
                  value={formData.username}
                  name="username"
                  type="text"
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  onChange={handleChange}
                  value={formData.password}
                  name="password"
                  type="password"
                  className="form-control"
                  required
                />
              </div>
              {errors.length !== 0 && (
                <div className="d-grid mt-4">
                  <Alert alerts={errors} type={"danger"} />
                </div>
              )}
              <div className="d-grid mt-2">
                <button
                  className="btn btn-outline-dark "
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
