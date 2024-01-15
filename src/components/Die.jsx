import React from 'react'





export const Die = ({value, isHeld, holdDice}) => {

    const styles = {
        backgroundColor: isHeld ? "#59E391" : "white"
    }

  return (
    <>
        <div 
            style={styles} 
            className="h-10 w-10 ronded-lg shadow-md flex justify-center items-center font-bold text-xl cursor-pointer"
            onClick={holdDice}
            >

            <span>{value}</span>
        </div>
    </>
  )
}
