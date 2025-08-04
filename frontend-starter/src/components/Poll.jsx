// src/components/Poll.jsx
import { useState } from 'react';

export default function Poll({ question, options }) {
  const [votes, setVotes] = useState(Array(options.length).fill(0));

  const handleVote = (index) => {
    const updatedVotes = [...votes];
    updatedVotes[index]++;
    setVotes(updatedVotes);
  };

  return (
    <div className="bg-gray-800 text-white p-4 rounded mt-4">
      <h3 className="text-lg font-bold mb-2">{question}</h3>
      <ul>
        {options.map((opt, i) => (
          <li key={i} className="flex justify-between items-center mb-2">
            <span>{opt}</span>
            <button
              onClick={() => handleVote(i)}
              className="bg-blue-600 px-2 py-1 rounded hover:bg-blue-500"
            >
              Vote ({votes[i]})
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
