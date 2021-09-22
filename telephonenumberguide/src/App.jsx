import React from "react";
import axios from "axios";
import { Filter } from "./components/Filter";
import { PersonForm } from "./components/PersonForm";
import { Persons } from "./components/Persons";
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

  const peopleToShow = foundPerson ? foundPerson : persons;

  return (
    <>
      <div>debug: {newName}</div>
      {modalText && (
        <Modal name={newName} text={" is already added to phonebook"} />
      )}
      <div>
        <h2>Phonebook</h2>
        <Filter findTerm={findTerm} setFindTerm={setFindTerm} />
      </div>
      <div>
        <h2>Add a new Contact</h2>
        <PersonForm
          persons={persons}
          setPersons={setPersons}
          newName={newName}
          setNewName={setNewName}
          newNumber={newNumber}
          setNewNumber={setNewNumber}
          setModalText={setModalText}
        />
        <h3>Numbers</h3>
        <Persons peopleToShow={peopleToShow} />
      </div>
    </>
  );
};

export default App;
