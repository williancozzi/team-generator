import React from "react";

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function divideIntoTeams(names) {
  const shuffledNames = shuffle(names);
  const teamSize = Math.ceil(names.length / 2);
  const team1 = shuffledNames.slice(0, teamSize);
  const team2 = shuffledNames.slice(teamSize);
  return [team1, team2];
}

function TeamGenerator() {
  const [names, setNames] = React.useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [teams, setTeams] = React.useState([]);

  function handleSubmit(event) {
    event.preventDefault();
    setTeams(divideIntoTeams(names));
  }

  function handleNameChange(index, event) {
    const updatedNames = [...names];
    updatedNames[index] = event.target.value;
    setNames(updatedNames);
  }

  return (
    <form onSubmit={handleSubmit}>
      {names.map((name, index) => (
        <div style={{ display: "block" }}>
          <input key={index} onChange={handleNameChange.bind(null, index)} />
        </div>
      ))}
      <button type="submit">Generate Teams</button>
      {teams.length > 0 && (
        <>
          <h2>Team 1</h2>
          <ul>
            {teams[0].map((name, index) => (
              <li key={index}>{name}</li>
            ))}
          </ul>
          <h2>Team 2</h2>
          <ul>
            {teams[1].map((name, index) => (
              <li key={index}>{name}</li>
            ))}
          </ul>
        </>
      )}
    </form>
  );
}

export default TeamGenerator;
