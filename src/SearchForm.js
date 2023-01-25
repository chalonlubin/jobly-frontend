import { useState } from "react";

function SearchForm({ search }) {
  const initialFormState = {
    query: "",
  };

  const [formData, setFormData] = useState(initialFormState);

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((f) => ({ ...f, [name]: value }));
  }

  function handleSubmit(evt) {
    console.log(formData);
    evt.preventDefault();
    search(formData.query);
    setFormData(initialFormState);
  }

  return (
    <div className="SearchForm">
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Enter Search term..."
          name="query"
          value={formData.query}
          onChange={handleChange}
        ></input>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default SearchForm;
