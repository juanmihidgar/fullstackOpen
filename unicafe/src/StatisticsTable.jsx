import React from "react";
import "./statisticsTable.css";

const Statistics = ({ text, number }) => (
  <tr>
    <td className="theaders">{text}</td>
    <td>{number}</td>
  </tr>
);

export const StatisticsTable = ({
  good,
  neutral,
  bad,
  all,
  average,
  positive,
}) => {
  if (all) {
    return (
      <table>
        <tbody>
          <Statistics text="Good" number={good} />
          <Statistics text="Neutral" number={neutral} />
          <Statistics text="Bad" number={bad} />
          <Statistics text="All" number={all} />
          <Statistics text="Average" number={Math.round(average)} />
          <Statistics text="Positive" number={Math.round(positive) + "%"} />
        </tbody>
      </table>
    );
  }
  return (
    <div>
      <p>No feedback given</p>
    </div>
  );
};
