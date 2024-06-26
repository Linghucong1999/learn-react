// import logo from './logo.svg';
import './App.css';
import { useState } from "react";
// 你将从 useState 中获得两样东西：当前的 state（count），以及用于更新它的函数（setCount）。你可以给它们起任何名字，但按照惯例会像 [something, setSomething] 这样为它们命名。

function Board({ xIsNext, squars, onPlay }) {
  function handleClick(i) {
    if (calcuateWinner(squars) || squars[i]) {
      return;
    }

    const nextSquares = squars.slice();

    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }

    onPlay(nextSquares);
  }

  const winner = calcuateWinner(squars);
  let statues;
  if (winner) {
    statues = 'Winner ' + winner;
  } else {
    statues = 'Next player ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className='status'>
        {statues}
      </div>
      {Array(3).fill(null).map((_, row) => (
        <div className='board-row' key={row}>

          {Array(3).fill(null).map((_, col) => {
            const index = row * 3 + col;
            return (
              <Squares value={squars[index]} onSquareClick={() => handleClick(index)} key={index}></Squares>
            )
          })}
        </div>
      ))}
    </>
  )
}

function Squares({ value, onSquareClick }) {
  return (
    <button className='square' onClick={onSquareClick}>{value}</button>
  )
}


function App() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((_step, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    )
  })

  return (
    <>
      <div className='game'>
        <div className='game-board'>
          <Board xIsNext={xIsNext} squars={currentSquares} onPlay={handlePlay} />
        </div>
        <div className='game-info'>
          <ol>{moves}</ol>
        </div>
      </div>
    </>
  );



}


function calcuateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default App;
