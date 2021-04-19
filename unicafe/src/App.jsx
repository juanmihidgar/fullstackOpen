import React from "react";
import { StatisticsTable } from "./StatisticsTable";

const Title = ({ text }) => <h1>{text}</h1>;

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>;

export const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = React.useState(0);
  const [neutral, setNeutral] = React.useState(0);
  const [bad, setBad] = React.useState(0);

  const handleGoodClick = () => setGood(good + 1);
  const handleNeutralClick = () => setNeutral(neutral + 1);
  const handleBadClick = () => setBad(bad + 1);

  const all = good + neutral + bad;
  const average = (good + neutral + bad) / 3;
  const positive = !!all ? (good / all) * 100 : 0;

  return (
    <div>
      <Title text="Give Feedback" />
      <Button text="Good" onClick={handleGoodClick} />
      <Button text="Neural" onClick={handleNeutralClick} />
      <Button text="Bad" onClick={handleBadClick} />
      <Title text="Statistics" />
      <StatisticsTable
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        positive={positive}
      />
    </div>
  );
};

export default App;
