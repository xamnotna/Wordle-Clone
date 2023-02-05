import { useState } from 'react';

const useWordle = (solution) => {
    const [turn, setTurn] = useState(0);
    const [currentGuess, setCurrentGuess] = useState('');
    const [guesses, setGuesses] = useState([...Array(6)]); // each guess is an array of letter objects
    const [history, setHistory] = useState([]); // each history item is an array of letter objects
    const [isCorrect, setIsCorrect] = useState(false);
    const [usedKeys, setUsedKeys] = useState({}); // each key is a letter, each value is a boolean
    // 

    //const [dictionary, setDictionary] = useState([]);

    //fetch dictionary from https://api.dictionaryapi.dev/api/v2/entries/en/ + currentGuess  if currentGuess.length === 5  and currentGuess !== ''
    // useEffect(() => {
    //     if (currentGuess.length < 5 && currentGuess !== '') {
    //         fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${currentGuess}`)
    //             .then((response) => response.json())
    //             .then((data) => {
    //                 setDictionary(data);
    //                 console.log('word set from api: ', data);
    //             })
    //     }
    // }, [currentGuess])

    // console.log(currentGuess + ' is in the dictionary: ', dictionary);



    // format a guess into an array of letter objects
    // e.g. [{ key: 'a', color: 'yellow}]
    const formatGuess = () => {
        let solutionArray = [...solution];
        let formattedGuess = [...currentGuess].map((letter) => {
            return { key: letter, color: 'grey' }
        })

        // find and green letter, the correct letters
        formattedGuess.forEach((letter, index) => {
            if (solutionArray[index] === letter.key) {
                formattedGuess[index].color = 'green';
                solutionArray[index] = null;
            }
        })

        // find and yellow letter, the right letter in the wrong place
        formattedGuess.forEach((letter, index) => {
            if (solutionArray.includes(letter.key) && letter.color !== 'green') {
                formattedGuess[index].color = 'yellow';
                solutionArray[solutionArray.indexOf(letter.key)] = null;
            }
        })

        return formattedGuess;

    }

    // add a  new guess to the guesses state
    // update the isCorrect state if the guess is correct
    // add one to the turns state
    const addNewGuess = (formattedGuess) => {
        if (currentGuess === solution) { // if the guess is correct
            setIsCorrect(true); // update isCorrect state
        }
        setGuesses((prevGuesses) => {
            let newGuesses = [...prevGuesses]; // copy the previous guesses
            newGuesses[turn] = formattedGuess; // add the new guess
            return newGuesses; // return new array
        })
        setHistory((prevHistory) => {
            return [...prevHistory, currentGuess]; // add the current guess to the history
        })
        setTurn((prevTurn) => {
            return prevTurn + 1; // add one to the turn
        })
        setUsedKeys((prevUsedKeys) => {
            formattedGuess.forEach((letter) => { // loop through the formatted guess
                const currentColor = prevUsedKeys[letter.key]; // get the current color of the letter

                if (letter.color === 'green') { // if the letter is green
                    prevUsedKeys[letter.key] = 'green'; // set the color to green
                    return;
                }
                if (letter.color === 'yellow' && currentColor !== 'green') { // if the letter is yellow and the current color is not green
                    prevUsedKeys[letter.key] = 'yellow'; // set the color to yellow
                    return;
                }
                if (letter.color === 'grey' && currentColor !== ('green' || 'yellow')) { // if the letter is grey and the current color is not green or yellow
                    prevUsedKeys[letter.key] = 'grey'; // set the color to grey
                    return;
                }
            })
            return prevUsedKeys; // return the updated usedKeys object

        });
        setCurrentGuess(''); // reset the current guess
    }

    // click on a letter to add it to the current guess
    const handleClick = (letter) => {
        if (turn > solution.length) {
            console.log('you used all your turns');
            return;
        }
        if (currentGuess.length === solution.length) {
            console.log('guess must be 5 letters long');
            return;
        }
        setCurrentGuess((prev) => {
            return prev + letter;
        })
    }

    //if user click on button, add the new guess
    const handleClickButton = () => {
        if (turn > solution.length) {
            console.log('you used all your turns');
            return;
        }
        if (currentGuess.length !== solution.length) {
            console.log('guess must be 5 letters long');
            return;
        }
        if (history.includes(currentGuess)) {
            console.log('you already guessed that');
            return;
        }
        // if (!dictionary) {
        //     console.log('not a valid word: ', dictionary);
        //     //alert('not a valid word');
        //     return;
        // }
        const formatted = formatGuess();
        addNewGuess(formatted);
    }

    // if user click on button delete the last letter
    const handleClickDelete = () => {
        setCurrentGuess((prev) => {
            return prev.slice(0, -1);
        })
    }

    // handle keyup event and track current guess
    // if user presses enter, add the new guess
    const handleKeyUp = ({ key }) => {

        if (key === 'Enter') {
            // only add guess if turn is less than solution length
            if (turn > solution.length) {
                console.log('you used all your turns');
                return;
            }
            // do not add duplicate guesses
            if (history.includes(currentGuess)) {
                console.log('you already guessed that');
                return;

            }
            // check word is 5 letters long
            if (currentGuess.length !== solution.length) {
                console.log('guess must be 5 letters long');
                return;
            }
            // check if word is a valid word
            // if (!dictionary) {
            //     console.log('not a valid word: ', dictionary);
            //     //alert('not a valid word');
            //     return;
            // }
            const formatted = formatGuess();
            addNewGuess(formatted);
        }

        if (key === 'Backspace') {
            setCurrentGuess((prev) => {
                return prev.slice(0, -1);
            });
            return;
        }


        if (/^[A-Za-z]$/.test(key)) { // if key is a letter
            if (currentGuess.length < solution.length) { // if current guess is less than solution length
                setCurrentGuess((prev) => { // add the key to the current guess
                    return prev + key; // return the new current guess
                });
            }
        }
    }

    return { turn, currentGuess, guesses, isCorrect, usedKeys, handleKeyUp, handleClick, handleClickButton, handleClickDelete }

}

export default useWordle;