import React, { useContext, useEffect, useState } from "react";
import userContext from "./userContext";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";

const INITIAL_FORM_DATA = { username: "", password: "" };

function LoginForm({ login }) {
  const navigate = useNavigate();
  const { user } = useContext(userContext);

  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  /** Update form data field */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((f) => ({ ...f, [name]: value }));
  }
  /** Call search in parent & clear form. */
  function handleSubmit(evt) {
    evt.preventDefault();
    login(formData);
    setFormData(INITIAL_FORM_DATA);
  }

  useEffect(() => {
    if (user) {
      navigate("/");
    }
    // TODO: ask about this
  }, [user, navigate]);

  return (
    <div className="LoginForm pt-5">
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <h3 className="mb-3 text-center">Log In</h3>
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
                <div className="d-grid mt-4">
                  <button className="btn btn-outline-dark " onClick={handleSubmit}>
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
