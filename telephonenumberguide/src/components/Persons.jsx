import React from "react";
import personsService from "../services/persons";

export const Persons = ({ peopleToShow, confirmDialog }) => {

  return (
    <>
      {peopleToShow.map((person) => (
        <div key={`${person.name}-container`}>
          <p key={person.name}>{`${person.name} ${person.number}`}</p>
          <button key={`button-${person.name}`} onClick={confirmDialog(person)}>delete</button>
        </div>
      ))}
    </>
  );
};
