import './TicTacToe.css';
import circleIcon from "../../Assets/circle.png";
import crossIcon from "../../Assets/cross.png";
import { useRef, useState } from 'react';

const TicTacToe = () => {
    const [board, setBoard] = useState(Array(9).fill(""));
    const [isXTurn, setIsXTurn] = useState(true);
    const [isGameLocked, setIsGameLocked] = useState(false);
    const [scores, setScores] = useState({ x: 0, o: 0 });
    const [winner, setWinner] = useState(null);
    const titleRef = useRef(null);

    const handleClick = (index) => {
        if (isGameLocked || board[index]) return;

        const newBoard = [...board];
        newBoard[index] = isXTurn ? "x" : "o";
        setBoard(newBoard);
        setIsXTurn(!isXTurn);
        checkWinner(newBoard);
    };

    const checkWinner = (board) => {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], 
            [0, 3, 6], [1, 4, 7], [2, 5, 8], 
            [0, 4, 8], [2, 4, 6] 
        ];

        for (let combination of winningCombinations) {
            const [a, b, c] = combination;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                endGame(board[a]);
                return;
            }
        }

        if (!board.includes("")) {
            titleRef.current.innerHTML = "It's a draw!";
            setIsGameLocked(true);
        }
    };

    const endGame = (winner) => {
        setIsGameLocked(true);
        setWinner(winner);
        setScores(prevScores => ({
            ...prevScores,
            [winner]: prevScores[winner] + 1
        }));

        setTimeout(() => {
            closeModal();
            resetGame();
        }, 3000);
    };

    const resetGame = () => {
        setBoard(Array(9).fill(""));
        setIsXTurn(true);
        setIsGameLocked(false);
        setWinner(null);
        titleRef.current.innerHTML = "Tic Tac Toe Game in <span>React js</span>";
    };

    const closeModal = () => {
        setWinner(null);
        resetGame();
    };

    const renderBox = (index) => (
        <div className="boxes" onClick={() => handleClick(index)}>
            {board[index] && <img src={board[index] === "x" ? crossIcon : circleIcon} alt={board[index]} />}
        </div>
    );

    return (
        <div className='container'>
            <h1 className="title" ref={titleRef}>
                Tic Tac Toe Game in <span>React js</span>
            </h1>
            <div className="scoreboard">
                <p>
                    <span className="player-x">Player X: {scores.x}</span>
                    <span className="vs"> VS </span>
                    <span className="player-o">Player O: {scores.o}</span>
                </p>
            </div>
            <div className="board">
                <div className="row">
                    {renderBox(0)}{renderBox(1)}{renderBox(2)}
                </div>
                <div className="row">
                    {renderBox(3)}{renderBox(4)}{renderBox(5)}
                </div>
                <div className="row">
                    {renderBox(6)}{renderBox(7)}{renderBox(8)}
                </div>
            </div>
            <button className="reset" onClick={resetGame}>
                Reset
            </button>

            {winner && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>{winner === "x" ? "Player X Wins!" : "Player O Wins!"}</h2>
                        <button onClick={resetGame}>Play Again</button>
                        <button onClick={closeModal}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TicTacToe;