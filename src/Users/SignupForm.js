import React from "react";
import { useState } from "react";

const INITIAL_FORM_DATA = {
  username: "",
  password: "",
  firstName: "",
  lastName: "",
  email: "",
};

function SignupForm({ signUp }) {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  /** Update form data field */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((f) => ({ ...f, [name]: value }));
  }
  /** Call search in parent & clear form. */
  function handleSubmit(evt) {
    evt.preventDefault();
    signUp(formData);
    setFormData(INITIAL_FORM_DATA);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group row">
        <label forHTML="username" className="col-sm-2 col-form-label">
          Username
        </label>
        <div class="col-sm-10">
          <input onChange={handleChange} name="username" type="text" className="form-control" />
        </div>
      </div>
      <div className="form-group row">
        <label forHTML="password" className="col-sm-2 col-form-label">
          Password
        </label>
        <div class="col-sm-10">
          <input onChange={handleChange} name="password" type="password" className="form-control" />
        </div>
      </div>
      <div className="form-group row">
        <label forHTML="firstName" className="col-sm-2 col-form-label">
          First Name
        </label>
        <div class="col-sm-10">
          <input onChange={handleChange} name="firstName" type="text" className="form-control" />
        </div>
      </div>
      <div className="form-group row">
        <label forHTML="lastName" className="col-sm-2 col-form-label">
          Last Name
        </label>
        <div class="col-sm-10">
          <input onChange={handleChange} name="lastName" type="text" className="form-control" />
        </div>
      </div>
      <div className="form-group row">
        <label forHTML="email" className="col-sm-2 col-form-label">
          Email
        </label>
        <div class="col-sm-10">
          <input onChange={handleChange} name="email" type="email" className="form-control" />
        </div>
      </div>
    </form>
  );
}

export default SignupForm;
