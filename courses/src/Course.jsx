import React from "react";

export const Course = ({ course }) => {
  return (
    <>
      <Header title={course.name} />
      <Content parts={course.parts} />
    </>
  );
};

export const Header = ({ title }) => {
  return <h1>{title}</h1>;
};

export const Content = ({ parts }) => {
  const total = parts.reduce((s, p) => s + p.exercises, 0);
  return (
    <div>
      {parts.map((part) => {
        return (
          <Part key={part.name} name={part.name} exercises={part.exercises} />
        );
      })}
      <Total total={total} />
    </div>
  );
};

export const Part = ({ name, exercises }) => {
  return <p>{`${name} ${exercises}`}</p>;
};

export const Total = ({ total }) => {
  return <p style={{ fontWeight: "bold" }}>Total of {total} exercises</p>;
};
