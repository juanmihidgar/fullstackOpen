import React from "react";
import axios from "axios";
import Modal from "./Modal";

export const App = () => {
  const [persons, setPersons] = React.useState([]);
  const [newName, setNewName] = React.useState("");
  const [findTerm, setFindTerm] = React.useState("");
  const [foundPerson, setFoundPerson] = React.useState(undefined);
  const [newNumber, setNewNumber] = React.useState("");
  const [modalText, setModalText] = React.useState(false);

  React.useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((response) => setPersons(response.data));
  }, []);

  React.useEffect(() => {
    const findResult = persons.filter((person) =>
      person.name.toLowerCase().includes(findTerm.toLowerCase())
    );

    findResult ? setFoundPerson(findResult) : setFoundPerson(undefined);
  }, [findTerm, persons]);

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

  const handleNameFinder = (event) => {
    setFindTerm(event.target.value);
  };

  return (
    <>
      {modalText && (
        <Modal name={newName} text={" is already added to phonebook"} />
      )}
      <div>debug: {newName}</div>
      <div>
        <h2>Phonebook</h2>
        <p>Filter shown with</p>
        <input value={findTerm} onChange={handleNameFinder} />
      </div>
      <div>
        <h2>Add a new Contact</h2>
        <form onSubmit={handleNewName}>
          <div>
            {`Name: `}
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </div>

          <div>
            {`Number: `}
            <input
              type="number"
              value={newNumber}
              onChange={(e) => setNewNumber(e.target.value)}
            />
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
        <h2>Numbers</h2>
        {foundPerson &&
          foundPerson.map((person) => (
            <p key={person.name}>{`${person.name} ${person.number}`}</p>
          ))}
        {!foundPerson &&
          persons.map((person) => (
            <p key={person.name}>{`${person.name} ${person.number}`}</p>
          ))}
      </div>
    </>
  );
};

export default App;
