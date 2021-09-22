import React from "react";

export const PersonForm = ({
  persons,
  setPersons,
  newName,
  setNewName,
  newNumber,
  setNewNumber,
  setModalText,
}) => {
  const handleNewName = (event) => {
    event.preventDefault();
    const findResult = persons.find((person) => newName === person.name);

    if (findResult) {
      setModalText(true);
      setTimeout(() => {
        setModalText(false);
      }, 3000);
    } else if (newName.length > 1) {
      setPersons(persons.concat({ name: newName, number: newNumber }));
    }
  };

  return (
    <form onSubmit={handleNewName}>
      <div>
        <label for="name">Name: </label>
        <input
          id="name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
      </div>

      <div>
        <label for="number">Number: </label>
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
