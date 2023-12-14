import React from 'react'

export default function GameOver({winner,handleRestart}) {
  return (
    <div id="game-over">
      <h2>GAME OVER!</h2>
      {winner && <p>{winner} Won!</p>}
      {!winner && <p>It's a Draw!</p>}
      <p>
        <button onClick={handleRestart}>Re-match!</button>
      </p>
    </div>
  )
}
