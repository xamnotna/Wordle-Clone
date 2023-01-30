import React from "react";

export default function Modal({ isCorrect, turn, solution }) {


    return (
        <div className="modal">
            {isCorrect && (
                <div>
                    <h1>you Won!</h1>
                    <p className="solution">{solution}</p>
                    <p>You guessed the word in {turn} guesses</p>
                    <button className="play-again" onClick={() => window.location.reload()}>Play Again</button>
                </div>
            )}
            {!isCorrect && (
                <div>
                    <h1>You Lost</h1>
                    <p className="solution">{solution}</p>
                    <p>Better luck next time</p>
                    <button className="play-again" onClick={() => window.location.reload()}>Play Again</button>
                </div>
            )}


        </div>
    )
}
