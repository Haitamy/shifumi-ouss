import React, { useState } from "react";
import "./Shifumi.sass";

const CHOICES = [
  { id: 1, name: 'pierre', img: "./pierre.png" },
  { id: 2, name: 'papier', img: "./feuille.png" },
  { id: 3, name: 'ciseaux', img: "./ciseaux.png" },
];

function Shifumi() {
  const [player, setPlayer] = useState(null);
  const [computer, setComputer] = useState(null);
  const [round, setRound] = useState(0);
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [drawScore, setDrawScore] = useState(0);
  const [winningScore, setWinningScore] = useState(3);

  const handleChoice = (choice) => {
    const computerChoice = CHOICES[Math.floor(Math.random() * CHOICES.length)];
    setPlayer(choice);
    setComputer(computerChoice);
    setRound(round + 1);
    updateScores(choice, computerChoice);
  };

  const updateScores = (playerChoice, computerChoice) => {
    if (playerChoice.id === computerChoice.id) {
      setDrawScore(drawScore + 1);
    } else if (
      (playerChoice.id === 1 && computerChoice.id === 3) ||
      (playerChoice.id === 2 && computerChoice.id === 1) ||
      (playerChoice.id === 3 && computerChoice.id === 2)
    ) {
      setPlayerScore(playerScore + 1);
    } else {
      setComputerScore(computerScore + 1);
    }
  };

  const checkWinner = () => {
    if (playerScore === winningScore) {
      return "Player";
    } else if (computerScore === winningScore) {
      return "Computer";
    } else {
      return null;
    }
  };

  const handleReset = () => {
    setRound(0);
    setPlayerScore(0);
    setComputerScore(0);
    setDrawScore(0);
    setPlayer(null);
    setComputer(null);
  };

  const handleWinningScoreChange = (event) => {
    const score = parseInt(event.target.value);
    if (score >= 1 && score <= 5) {
      setWinningScore(score);
      handleReset();
    }
  };

  const renderChoiceButton = (choice) => (
    <button key={choice.id} onClick={() => handleChoice(choice)}>
      <img src={choice.img} alt={choice.name} />
    </button>
  );

  const winner = checkWinner();

  return (
    <div>
      <h1>Shifumi</h1>
      {winner ? (
        <div>
          <h2>{winner} a gagné la partie !</h2>
          <button onClick={handleReset}>Rejouer</button>
        </div>
      ) : (
        <div>
          <div>
            <h2>Choisissez le score à atteindre:</h2>
            <div>
              <label>
                <input
                  type="radio"
                  value="1"
                  checked={winningScore === 1}
                  onChange={handleWinningScoreChange}
                  />
                  1 manche
              </label>
              <br />
              <label>
                <input
                  type="radio"
                  value="3"
                  checked={winningScore === 3}
                  onChange={handleWinningScoreChange}
                  />
                  3 manches
              </label>
              <br />
              <label>
                <input
                  type="radio"
                  value="5"
                  checked={winningScore === 5}
                  onChange={handleWinningScoreChange}
                  />
                  5 manches
              </label>
            </div>
          </div>
          <div>
            <h2>Round {round}</h2>
            {player && (
              <div>
                <h3>Joueur:</h3>
                <img src={player.img} alt={player.name} />
              </div>
            )}
            {computer && (
              <div>
                <h3>Ordinateur:</h3>
                <img src={computer.img} alt={computer.name} />
              </div>
            )}
          </div>
          <div>
            <h2>Score:</h2>
            <p>Joueur: {playerScore}</p>
            <p>Ordinateur: {computerScore}</p>
            <p>Égalité: {drawScore}</p>
          </div>
          <div>
            <h2>Choisissez votre coup:</h2>
            <div className="choices">{CHOICES.map(renderChoiceButton)}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Shifumi;
