import React from "react";

export const Display = ({ number }) => <span>{number}</span>;

export const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

export const History = ({ allClicks }) => {
  if (allClicks.length === 0) {
    return <div>the app is used by pressing the buttons</div>;
  }

  return <div>button press history: {allClicks.join(" ")}</div>;
};

export const App = () => {
  const [clicks, setClicks] = React.useState({
    left: 0,
    right: 0,
  });
  const [allClicks, setAll] = React.useState([]);

  const handleLeftClick = () => {
    let clicksCopy = [...allClicks];

    setClicks({
      ...clicks,
      left: clicks.left + 1,
    });

    clicksCopy.push("L");
    setAll(clicksCopy);
  };

  const handleRightClick = () => {
    let clicksCopy = [...allClicks];

    setClicks({
      ...clicks,
      right: clicks.right + 1,
    });

    clicksCopy.push("R");
    setAll(clicksCopy);
  };
  return (
    <div>
      <Display number={clicks.left} />
      <Button handleClick={handleLeftClick} text="Left" />
      <Button handleClick={handleRightClick} text="Right" />
      <Display number={clicks.right} />
      <History allClicks={allClicks} />
    </div>
  );
};
