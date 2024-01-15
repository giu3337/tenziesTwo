import { useEffect, useState } from 'react'
import { Die } from './components/Die'
import { nanoid } from 'nanoid'
import Confetti from "react-confetti"


function App() {

  
  
  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)

 
  useEffect( () => {
     const allHeld = dice.every( die => die.isHeld)
     const firstValue = dice[0].value
     const allSameValue = dice.every( die => die.value === firstValue)

     if (allHeld && allSameValue) {
      setTenzies(true)
      console.log("You won!")
     }
  },[dice])

    function generateNewDie() {
      return {
          value: Math.ceil(Math.random() * 6),
          isHeld: false,
          id: nanoid()
      }
  }
  
  function holdDice(id) {
    setDice(prevDice => prevDice.map( die => 
        die.id === id ? 
            {...die, isHeld: !die.isHeld} : die 
        )
      )
  }


  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie())
    }
    return newDice
}

function renderNewDice() {
  if(!tenzies) {
    setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? 
            die :
            generateNewDie()
    }))
} else {
    setTenzies(false)
    setDice(allNewDice())
}
}
const diceElements = dice.map((die) => (
  <Die 
    value={die.value} 
    key={die.id} 
    isHeld={die.isHeld} 
    holdDice={() => {holdDice(die.id)}}
  />
))


  
  
  return (
    <main className="w-full h-screen bg-[#0B2434] flex justify-center items-center">
      <div className="w-5/6 bg-[#F5F5F5] h-3/6 max-w-sm rounded-xl flex flex-col items-center justify-around">
      {tenzies && <Confetti />}

      <div className="text-center ">
            <h1 className="text-2xl font-bold tracking-wide">Tenzies</h1>
            <p className="pt-1 text-[#4A4E74] text-base">Roll until all dice are the same. Click <br />  each die to freeze it at its current value  <br /> between rolls.</p>
      </div>


        <div className="w-4/5 grid grid-cols-5 gap-4 ">
            {diceElements}
        </div>

        <button 
            onClick={renderNewDice}
            className="bg-[#5035FF] text-white text-bold py-2 px-8 rounded-md tracking-wide
            cursor-pointer active:shadow-2xl hover:bg-sky-300
            ">{tenzies? "New Game" : "Roll Dice"}
        </button>
          
        
      </div>
    </main>
  )
}

export default App
