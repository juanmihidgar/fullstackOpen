import React from "react";

export const Display = ({ counter }) => <div>{counter}</div>;

export const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

export const App = () => {
  const [counter, setCounter] = React.useState(0);

  const increaseByOne = () => setCounter(counter + 1);
  const setToZero = () => setCounter(0);
  const DecreaseByOne = () => setCounter(counter - 1);

  return (
    <div>
      <Display counter={counter} />
      <Button handleClick={increaseByOne} text="plus" />
      <Button handleClick={setToZero} text="zero" />
      <Button handleClick={DecreaseByOne} text="minus" />
    </div>
  );
};
