import React from "react";

export const Persons = ({ peopleToShow }) => {
  return peopleToShow.map((person) => (
    <p key={person.name}>{`${person.name} ${person.number}`}</p>
  ));
};
