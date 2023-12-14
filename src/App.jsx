import { useState } from "react";
import GameBoard from "./components/GameBoard.jsx";
import Player from "./components/Player.jsx"
import Log from "./components/Log.jsx";
import{WINNING_COMBINATIONS} from "./winning-combinations.js"
import GameOver from "./components/GameOver.jsx";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriverActivePlayer(gameTurns){
  let currentPlayer = 'X'
  if(gameTurns.length>0 && gameTurns[0].player ==='X'){
    currentPlayer='O'
  }
  return currentPlayer
}


const App=()=> {
  // const [activePlayer,setActivePlayer] = useState('X')
  const [gameTurns,setGameTurns] = useState([])

  const activePlayer = deriverActivePlayer(gameTurns)

  let gameBoard=[...initialGameBoard.map(array=>[...array])]

  for(const turn of gameTurns){
      // const{square,player} = turn
      // const{row,col}=square
      gameBoard[turn.square.row][turn.square.col]=turn.player
  }

  let winner=null

  for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];
    if(firstSquareSymbol && firstSquareSymbol===secondSquareSymbol && firstSquareSymbol===thirdSquareSymbol){
      winner = firstSquareSymbol
    }
  }

  const hasDraw = gameTurns.length === 9 && !winner

  function handleSelectSquare(rowind,colind) {
    // setActivePlayer((currActivePlayer)=>currActivePlayer==='X'?'O':'X')
    setGameTurns((prevGameTurns)=>{
      const currentPlayer=deriverActivePlayer(prevGameTurns)
      const updatedTurns=[{square : {row:rowind,col:colind} , player:currentPlayer},...prevGameTurns]
      return updatedTurns
    })
  }

  function handleRestart(){
    setGameTurns([])
  }
debugger
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="player1" symbol = "X" isActive={activePlayer==='X'}/>
          <Player name="player2" symbol = "O" isActive={activePlayer==='O'}/>
        </ol>
        {(winner ||hasDraw) && <GameOver winner ={winner} handleRestart={handleRestart}/>}
        <GameBoard onSelectSquare = {handleSelectSquare} board = {gameBoard} />
      </div>
      <Log turns={gameTurns}/>
    </main>
  );
}

export default App;
