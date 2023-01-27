import { useState } from "react";
import "./SearchForm.css";

/** SearchForm: Form for searching for companies or jobs
 *
 * Props: search
 * State: formData
 *
 * App -> RouteList -> { CompanyList, JobList } -> SearchForm
 **/
function SearchForm({ search }) {
  const initialFormState = {
    query: "",
  };

  const [formData, setFormData] = useState(initialFormState);

  /** Update form data field */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((f) => ({ ...f, [name]: value }));
  }
  /** Call search in parent & clear form. */
  function handleSubmit(evt) {
    evt.preventDefault();
    search(formData.query);
    setFormData(initialFormState);
  }


  return (
    <div className="SearchForm d-flex justify-content-center">
    <form onSubmit={handleSubmit}>
      <div className="input-group mb-4 mt-5">
        <input
          type="search"
          placeholder="What're you looking for?"
          name="query"
          value={formData.query}
          onChange={handleChange}
          className="SearchForm-bar rounded border-secondary py-3 px-3"
        />
        <button className="btn btn-outline-light px-3 py-3" type="submit">Search</button>
      </div>
    </form>
    </div>
  );
}

export default SearchForm;

