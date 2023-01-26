import React, { useContext, useEffect, useState } from "react";
import userContext from "./userContext";
import { useNavigate } from "react-router-dom";

const INITIAL_FORM_DATA = { username: "test", password: "test1" };

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
    <div className="LoginForm">
      <form onSubmit={handleSubmit}>
        <div className="form-group row">
          <label htmlFor="username" className="col-sm-2 col-form-label">
            Username
          </label>
          <div className="col-sm-10">
            <input
              onChange={handleChange}
              name="username"
              type="text"
              className="form-control"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="password" className="col-sm-2 col-form-label">
            Password
          </label>
          <div className="col-sm-10">
            <input
              onChange={handleChange}
              name="password"
              type="password"
              className="form-control"
            />
          </div>
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default LoginForm;
