import React, { useContext, useEffect } from 'react'
import { keyboardsContext } from '../../contexts/KeyboardsContext'

const KeyboardList = () => {
  const { keyboards, getKeyboards } = useContext(keyboardsContext)

  useEffect(() => {
    getKeyboards()
  }, [])

  return (
    <div>
      <p>Keyboard List</p>
      {keyboards.length ? (
        keyboards.map((keyboard) => (
          <div key={keyboard.id}>
            <h4>{keyboard.name}</h4>
          </div>
        ))
      ) : (
        <h1>Loading</h1>
      )}
    </div>
  )
}

export default KeyboardList
