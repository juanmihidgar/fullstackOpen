import React from "react";
import { Filter } from "./components/Filter";
import { PersonForm } from "./components/PersonForm";
import { Persons } from "./components/Persons";
import { Notification } from "./components/Notification";
import personsService from "./services/persons";

export const App = () => {
  const [persons, setPersons] = React.useState([]);
  const [newName, setNewName] = React.useState("");
  const [notification, setNotification] = React.useState("");
  const [notificationType, setNotificationType] = React.useState("");
  const [findTerm, setFindTerm] = React.useState("");
  const [foundPerson, setFoundPerson] = React.useState(undefined);
  const [newNumber, setNewNumber] = React.useState("");

  React.useEffect(() => {
    personsService.getAll().then(
      (response) => setPersons(response),
      (reject) => console.error(reject.message)
    );
  }, []);

  React.useEffect(() => {
    const findResult = persons.filter((person) =>
      person.name.toLowerCase().includes(findTerm.toLowerCase())
    );

    findResult ? setFoundPerson(findResult) : setFoundPerson(undefined);
  }, [findTerm, persons]);

  /* PersonForm handler */
  const handleNewName = (event) => {
    event.preventDefault();
    const findResult = persons.find((person) => newName === person.name);

    if (findResult) {
      setNotification(`${newName} is already updated to phonebook`);
      setNotificationType("update");
      // setModalText(true);
      personsService
        .update(findResult.id, { ...findResult, number: newNumber })
        .then((response) => {
          setPersons(
            persons.map((person) => {
              if (person.id === findResult.id) {
                person.number = newNumber;
              }
              return person;
            })
          );
        });

      setTimeout(() => {
        setNotification("");

        setNewName("");
        setNewNumber("");
      }, 3000);
    } else if (newName.length > 1) {
      personsService
        .create({ name: newName, number: newNumber })
        .then((response) => {
          setNotificationType("create");
          setNotification(`${newName} is already created`);

          setPersons([...persons, response]);
          setNewName("");
          setNewNumber("");

          setTimeout(() => {
            setNotification("");
          }, 3000);
        });
    }
  };

  /* Persons handler */
  const peopleToShow = foundPerson ? foundPerson : persons;

  const confirmDialog = (currentPerson) => () => {
    if (
      window.confirm(`Do you really wants to delete to ${currentPerson.name}`)
    ) {
      personsService
        .deletePerson(currentPerson.id)
        .then((response) => {
          setNotificationType("delete");

          setNotification(`${currentPerson.name} was deleted`);

          setTimeout(() => {
            setNotification("");
          }, 3000);

          setPersons(
            persons.filter((person) => person.id !== currentPerson.id)
          );
        })
        .catch((error) => {
          setNotificationType("error");

          setNotification(
            `User ${currentPerson.name} was already removed from server`
          );

          setTimeout(() => {
            setNotification("");
          }, 3000);
        });
    }
  };
  return (
    <>
      <div>debug: {newName}</div>
      {notification && (
        <Notification text={notification} type={notificationType} />
      )}
      <div>
        <h2>Phonebook</h2>
        <Filter findTerm={findTerm} setFindTerm={setFindTerm} />
      </div>
      <div>
        <h2>Add a new Contact</h2>
        <PersonForm
          newName={newName}
          setNewName={setNewName}
          newNumber={newNumber}
          setNewNumber={setNewNumber}
          handleNewName={handleNewName}
        />
        <h3>Numbers</h3>
        <Persons peopleToShow={peopleToShow} confirmDialog={confirmDialog} />
      </div>
    </>
  );
};

export default App;
