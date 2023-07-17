import { useState, useEffect } from "react";
import { SearchFormProps } from "../Types/Interfaces";

import debounce from "lodash/debounce";

function SearchForm({ searchFor }: SearchFormProps): JSX.Element {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (evt: any) => {
    const  query  = evt.target.value;
    setSearchTerm(query);
  };


  useEffect(() => {
    const debouncedSearch = debounce(() => {
      searchFor(searchTerm);
    }, 500);

    if (searchTerm) {
      debouncedSearch();
    }

    return () => {
      debouncedSearch.cancel();
    };
  }, [searchTerm, searchFor]);

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
  };

  return (
    <div className="center">
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            placeholder="What're you looking for?"
            name="query"
            value={searchTerm}
            onChange={handleChange}
            className="SearchForm-bar py-2 px-2"
          />
        </div>
      </form>
    </div>
  );
}

export default SearchForm;

