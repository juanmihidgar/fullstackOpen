import React from "react";

export const Filter = ({ findTerm, setFindTerm }) => {
  const handleNameFinder = (event) => {
    setFindTerm(event.target.value);
  };

  return (
    <>
      <p>Filter shown with</p>
      <input value={findTerm} onChange={handleNameFinder} />
    </>
  );
};
