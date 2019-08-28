import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = props => {
  const [selected, setSelected] = useState(0);

  const [votes, setVotes] = useState(new Array(6).fill(0));

  const findMaxIndex = arr => {
    let max = 0;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] > arr[max]) {
        max = i;
      }
    }
    return max;
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]}
      <div>has {votes[selected]} votes</div>
      <div>
        <button
          onClick={() => {
            let copy = [...votes];
            copy[selected] += 1;
            setVotes(copy);
          }}
        >
          vote
        </button>

        <button
          onClick={() => {
            setSelected(Math.floor(Math.random() * 6));
          }}
        >
          next anecdote
        </button>
      </div>

      <h1>Anecdote with most votes</h1>

      {props.anecdotes[findMaxIndex(votes)]}
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
