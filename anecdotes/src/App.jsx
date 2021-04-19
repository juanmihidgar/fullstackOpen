import React from "react";

const Button = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>;
};

export const App = ({ anecdotes }) => {
  const [selected, setSelected] = React.useState(0);
  const [maxVoted, setMaxVoted] = React.useState([]);
  const [anecdotesVotes, setAnecdotesVotes] = React.useState(
    Array(anecdotes.length).fill(0)
  );

  const handleNextAnecdote = () => {
    if (selected < anecdotes.length - 1) setSelected(selected + 1);
    else setSelected(0);
  };

  const handlePreviousAnecdote = () => {
    if (selected > 0) setSelected(selected - 1);
    else setSelected(anecdotes.length - 1);
  };

  const getMaxVotedAnecdotes = (votedAnecdotes) => {
    const maxVotedResult = [];
    const maxVoted = Math.max(...votedAnecdotes);

    votedAnecdotes.forEach((el, index) => {
      if (el === maxVoted) {
        maxVotedResult.push([...anecdotes][index]);
      }
    });

    setMaxVoted(maxVotedResult);
  };

  const handleVote = (anecdoteIndex) => () => {
    let anecdotesVotesCopy = [...anecdotesVotes];

    anecdotesVotesCopy[anecdoteIndex]++;

    getMaxVotedAnecdotes(anecdotesVotesCopy);

    setAnecdotesVotes(anecdotesVotesCopy);
  };

  return (
    <>
      <div>
        <h1>Anecdote of the day</h1>
        <p>{anecdotes[selected]}</p>
        <p>{`has ${anecdotesVotes[selected]} votes`}</p>
        <Button text="Previous Anecdote" onClick={handlePreviousAnecdote} />
        <Button text="Vote Anecdote" onClick={handleVote(selected)} />
        <Button text="Next Anecdote" onClick={handleNextAnecdote} />
      </div>
      {maxVoted.length > 0 && (
        <>
          {maxVoted.length < 2 && <h1>{`Anecdote with more votes is: `}</h1>}
          {maxVoted.length > 1 && <h1>{`Anecdotes with more votes are: `}</h1>}
          {maxVoted.map((el) => (
            <div key={el}>
              <p>{el}</p>
            </div>
          ))}
          <p>{`with ${Math.max(...anecdotesVotes)} votes.`}</p>
        </>
      )}
    </>
  );
};

export default App;
