import { useState, ChangeEvent, FormEvent } from "react";
import { SearchFormProps } from "../Interfaces/AppInterfaces";
import "./SearchForm.css";


/** SearchForm: Form for searching for companies or jobs
 *
 * Props: searchFor (fn)
 * State: searchTerm: string
 *
 * App -> RouteList -> { CompanyList, JobList } -> SearchForm
 **/
function SearchForm({ searchFor }: SearchFormProps): JSX.Element {
  const initialFormState = {
    query: "",
  };

  const [searchTerm, setSearchTerm] = useState(initialFormState);

  /** Update form data field */
  function handleChange(evt: ChangeEvent<HTMLInputElement>) {
    const { name, value } = evt.target;
    setSearchTerm((f) => ({ ...f, [name]: value }));
  }
  /** Call search in parent & clear form. */
  function handleSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    searchFor(searchTerm.query);
    setSearchTerm(initialFormState);
  }

  return (
    <div className="SearchForm d-flex justify-content-center">
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-4 mt-5">
          <input
            type="search"
            placeholder="What're you looking for?"
            name="query"
            value={searchTerm.query}
            onChange={handleChange}
            className="SearchForm-bar rounded border-secondary py-3 px-3"
          />
          <button className="btn btn-outline-light px-3 py-3" type="submit">
            Search
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchForm;
