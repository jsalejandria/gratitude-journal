import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Filter = ({ filter, handleFilter }) => {
  return (
    <div id="searchBar">
      <input
        type="text"
        id="search"
        placeholder="Search..."
        value={filter}
        onChange={handleFilter}
      />
      <button type="submit" id="searchButton">
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </div>
  );
};

export default Filter;
