import React, { useEffect, useState } from "react";
import useWordle from "../hooks/useWordle";
import Grid from "./Grid";
import Keypad from "./Keypad";
import Modal from "./Modal";

export default function Wordle({ solution }) {
    const { currentGuess, handleKeyUp, guesses, isCorrect, turn, usedKeys, handleClick, handleClickButton, handleClickDelete } = useWordle(solution);
    const [showModal, setShowModal] = useState(false);


    // clicking on keypad enter
    useEffect(() => {
        window.addEventListener('keyup', handleKeyUp);

        if (isCorrect) {
            setTimeout(() => {
                setShowModal(true);
            }, 2000);
            window.removeEventListener('keyup', handleKeyUp);
        }

        if (turn > 5) {
            setTimeout(() => {
                setShowModal(true);
            }, 2000);
            window.removeEventListener('keyup', handleKeyUp);
        }

        return () => window.removeEventListener('keyup', handleKeyUp);
    }, [handleKeyUp, isCorrect, turn]);

    // clicking on keypad en



    return (
        <div>
            {/* <div>solution - {solution}</div>
            <div>current guess - {currentGuess}</div> */}
            <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} />
            <Keypad usedKeys={usedKeys} handleClick={handleClick} handleClickButton={handleClickButton} handleClickDelete={handleClickDelete} />
            <div>press enter to submit</div>



            {showModal && <Modal isCorrect={isCorrect} turn={turn} solution={solution} />}
        </div>
    )
}
