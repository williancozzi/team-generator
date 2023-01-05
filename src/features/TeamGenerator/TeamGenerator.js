import React from "react";
import { Box, Grid, TextField, Button } from "@mui/material";

function divideIntoTeams(players) {
  // Sort players by skill level (ascending order)
  const sortedPlayers = players.sort((a, b) => a.level - b.level);

  // Initialize teams
  const team1 = [];
  const team2 = [];

  // Alternate between adding players to team1 and team2
  for (let i = 0; i < sortedPlayers.length; i++) {
    if (i % 2 === 0) {
      team1.push(sortedPlayers[i]);
    } else {
      team2.push(sortedPlayers[i]);
    }
  }

  // Check if the total skill level of the two teams is balanced
  const team1SkillLevel = team1.reduce(
    (total, player) => total + player.level,
    0
  );
  const team2SkillLevel = team2.reduce(
    (total, player) => total + player.level,
    0
  );

  // If the teams are not balanced, try swapping the lowest skill level player from the higher skill level team with the highest skill level player from the lower skill level team
  if (Math.abs(team1SkillLevel - team2SkillLevel) > 10) {
    const highSkillTeam = team1SkillLevel > team2SkillLevel ? team1 : team2;
    const lowSkillTeam = team1SkillLevel < team2SkillLevel ? team1 : team2;
    const highestSkillPlayer = highSkillTeam.reduce(
      (bestPlayer, player) =>
        player.level > bestPlayer.level ? player : bestPlayer,
      highSkillTeam[0]
    );
    const lowestSkillPlayer = lowSkillTeam.reduce(
      (worstPlayer, player) =>
        player.level < worstPlayer.level ? player : worstPlayer,
      lowSkillTeam[0]
    );
    highSkillTeam.splice(highSkillTeam.indexOf(highestSkillPlayer), 1);
    lowSkillTeam.splice(lowSkillTeam.indexOf(lowestSkillPlayer), 1);
    highSkillTeam.push(lowestSkillPlayer);
    lowSkillTeam.push(highestSkillPlayer);
  }

  return [team1, team2];
}

function TeamGenerator() {
  const [players, setPlayers] = React.useState([
    { name: "", level: 0 },
    { name: "", level: 0 },
    { name: "", level: 0 },
    { name: "", level: 0 },
    { name: "", level: 0 },
    { name: "", level: 0 },
    { name: "", level: 0 },
    { name: "", level: 0 },
    { name: "", level: 0 },
    { name: "", level: 0 },
  ]);
  const [teams, setTeams] = React.useState([]);

  function handleSubmit(event) {
    event.preventDefault();
    setTeams(divideIntoTeams(players));
  }

  function handleNameChange(index, event) {
    const updatedPlayers = [...players];
    updatedPlayers[index].name = event.target.value;
    setPlayers(updatedPlayers);
  }

  function handleLevelChange(index, event) {
    const level = Math.min(parseInt(event.target.value), 10);
    const updatedPlayers = [...players];
    updatedPlayers[index].level = level;
    setPlayers(updatedPlayers);
  }

  return (
    <Box m={8}>
      <Grid container>
        <Grid item md={4}>
          <form onSubmit={handleSubmit}>
            {players.map((player, index) => (
              <div style={{ display: "flex" }}>
                <TextField
                  key={index}
                  onChange={handleNameChange.bind(null, index)}
                  sx={{ mt: 1, width: "75%", mr: 1 }}
                  placeholder={`Player name #${index + 1}`}
                />
                <TextField
                  key={index}
                  onChange={handleLevelChange.bind(null, index)}
                  sx={{ mt: 1, width: "25%" }}
                  placeholder="Player level"
                  type="number"
                />
              </div>
            ))}
            <Box justifyContent="end" display="flex">
              <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                Generate Teams
              </Button>
            </Box>
            {teams.length > 0 && (
              <>
                <h2>Team 1</h2>
                <ul>
                  {teams[0].map((player, index) => (
                    <li key={index}>
                      {player.name} (level {player.level})
                    </li>
                  ))}
                </ul>
                <h2>Team 2</h2>
                <ul>
                  {teams[1].map((player, index) => (
                    <li key={index}>
                      {player.name} (level {player.level})
                    </li>
                  ))}
                </ul>
              </>
            )}
          </form>
        </Grid>
      </Grid>
    </Box>
  );
}

export default TeamGenerator;