import React, { useState } from "react";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function SearchInput({ handleSubmit }) {
  const [searchQuery, setSearchQuery] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(searchQuery);
  };

  return (
    <form onSubmit={onSubmit}>
      <TextField
        value={searchQuery}
        placeholder="Search..."
        onChange={(event) => setSearchQuery(event.target.value)}
        sx={{ width: "80vw", maxWidth: 500 }}
        size="small"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" >
              <IconButton type="submit" color="primary" aria-label="search...">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </form>
  );
}

export default SearchInput;
