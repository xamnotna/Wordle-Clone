import React, { useEffect, useState } from 'react';




export default function Keypad({ usedKeys, handleClick, handleClickButton, handleClickDelete }) {
    const [letters, setLetters] = useState(null);
    const [enter, setEnter] = useState(null);
    const [del, setDelete] = useState(null);


    // useEffect(() => {
    //     fetch('http://localhost:3001/letters')
    //         .then(res => res.json())
    //         .then(json => {
    //             setLetters(json);
    //         })
    // }, []);

    // add array of letters to state
    useEffect(() => {
        const letters = [
            { 'key': 'a' }
            , { 'key': 'b' }
            , { 'key': 'c' }
            , { 'key': 'd' }
            , { 'key': 'e' }
            , { 'key': 'f' }
            , { 'key': 'g' }
            , { 'key': 'h' }
            , { 'key': 'i' }
            , { 'key': 'j' }
            , { 'key': 'k' }
            , { 'key': 'l' }
            , { 'key': 'm' }
            , { 'key': 'n' }
            , { 'key': 'o' }
            , { 'key': 'p' }
            , { 'key': 'q' }
            , { 'key': 'r' }
            , { 'key': 's' }
            , { 'key': 't' }
            , { 'key': 'u' }
            , { 'key': 'v' }
            , { 'key': 'w' }
            , { 'key': 'x' }
            , { 'key': 'y' }
            , { 'key': 'z' }
        ];
        setLetters(letters);
    }, []);

    //update andguess word when clicking on keypad button



    // add array of enter to state

    useEffect(() => {
        const enter = [
            { 'key': 'Enter' }
        ];
        setEnter(enter);
    }, []);

    // add array of delete to state
    useEffect(() => {
        const del = [
            { 'key': 'Delete' }
        ];
        setDelete(del);
    }, []);

    return (
        <div className="keypad">
            {letters && letters.map((letter, index) => {
                const color = usedKeys[letter.key];
                return (
                    <div
                        key={index}
                        className={color}
                        onClick={() => handleClick(letter.key)}
                    >
                        {letter.key}
                    </div>
                )
            })}
            {enter && enter.map((enter, index) => {
                return (
                    <div
                        key={index}
                        className="enter"
                        onClick={() => handleClickButton(enter.key)}
                    >
                        {enter.key}
                    </div>
                )
            })}
            {del && del.map((del, index) => {
                return (
                    <div
                        key={index}
                        className="key"
                        onClick={() => handleClickDelete(del.key)}
                    >
                        ⌫



                    </div>

                )
            })}
        </div>
    )
}
