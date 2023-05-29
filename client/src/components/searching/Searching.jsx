import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { DebounceInput } from "react-debounce-input";
import "./searching.css";

const Search = ({ handleSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    handleSearch(event.target.value);
  };

  return (

    <div className="search-form">
      <DebounceInput
        type="text"
        placeholder="Cari..."
        minLength={3}
        value={searchTerm}
        debounceTimeout={300} // Menunda permintaan pencarian selama 300ms
        onChange={handleChange}
        onDebounce={handleSearch} // Dipanggil setelah penundaan selesai
        className="form-control"
        style={{}}
      />
    </div>
  );
};

export default Search;
