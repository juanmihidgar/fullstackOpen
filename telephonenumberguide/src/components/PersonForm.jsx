import React from "react";
import personsService from "../services/persons";

export const PersonForm = ({
  newName,
  setNewName,
  newNumber,
  setNewNumber,
  handleNewName
}) => {

  return (
    <form onSubmit={handleNewName}>
      <div>
        <label htmlFor="name">Name: </label>
        <input
          id="name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="number">Number: </label>
        <input
          id="number"
          type="number"
          value={newNumber}
          onChange={(e) => setNewNumber(e.target.value)}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};
