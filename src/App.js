import React from 'react'
import Die from './components/Die'
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'
 


export default function App() {
    const [diceNum, setDiceNum] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false) 
    
    React.useEffect(() => {
        const allHeld = diceNum.every(die => die.isHeld)
        const firstValue = diceNum[0].value
        const allSameValue = diceNum.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
        }
    }, [diceNum])

    const diceElement = diceNum.map(die => 
        <Die 
            key = {die.id} 
            value = {die.value} 
            isHeld = {die.isHeld}
            holdDice = {() => holdDice(die.id)}
        />
    )

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6), 
            isHeld: false,
            id: nanoid()
        }
    }
    
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++){
            newDice.push(generateNewDie())
        }
        return newDice
    }
    
    function rollDice() {
        if(!tenzies) {
            setDiceNum(oldDice => oldDice.map(die => {
                return die.isHeld ?
                die :
                generateNewDie()
            }))
        }
        else {
            setTenzies(false)
            setDiceNum(allNewDice())
        }
    }
        

    function holdDice(id) {
        setDiceNum(oldDice => oldDice.map(die => {
            return die.id === id ?
            {...die, isHeld: !die.isHeld} :
            die
        }) )
    }

    return (
        <main>
            {tenzies && <Confetti />}
            <h1 className='title'>Tenzies</h1>
            <p className='instructions'>
                Roll until all dice are the same. 
                Click each die to freezeit at its 
                current value between rolls.
            </p>
            <div className='dice--container'>
                {diceElement}
            </div>
            <button className='roll--button'
                onClick={rollDice}
            >   {tenzies ? "New Game" : "Roll"}
            </button>
        </main>
    )
}