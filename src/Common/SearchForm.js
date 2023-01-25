import { useState } from "react";

/** SearchForm component renders a search form.
 *
 * Props:
 * - search: function to call in parent.
 *  - search(query) => undefined
 *
 * State:
 * - formData: object with keys {
 *    [name]: value
 * }
 *
 * App -> SearchForm
 *
 * */
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

  //TODO: CSS - Make the input responsive, doesn't shrink at smaller size.
  // I could make it a bit better.
  return (
    <div className="SearchForm d-flex justify-content-center">
    <form onSubmit={handleSubmit}>
      <div className="input-group mb-4 mt-4">
        <input
          type="search"
          placeholder="Search..."
          name="query"
          value={formData.query}
          onChange={handleChange}
          className="form-control border-secondary py-2"
        />
        <button className="btn btn-dark py-2" type="submit">Search</button>
      </div>
    </form>
    </div>
  );
}

export default SearchForm;

