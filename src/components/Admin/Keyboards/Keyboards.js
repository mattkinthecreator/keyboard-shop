import React, { useContext, useEffect, useState } from 'react'
import { keyboardsContext } from '../../../contexts/KeyboardsContext'
import AddKeyboard from './AddKeyboard'
import EditKeyboard from './EditKeyboard'

const Keyboards = () => {
  const { keyboards, getKeyboards } = useContext(keyboardsContext)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)

  useEffect(() => {
    getKeyboards()
  }, [])

  return (
    <div>
      <h2>Keyboards</h2>
      <button onClick={() => setShowAddModal(!showAddModal)}>
        Add Keyboard
      </button>
      {keyboards &&
        keyboards.map((keyboard) => (
          <div className="keyboard">
            <p>{keyboard.name}</p>
          </div>
        ))}
      {showEditModal && <EditKeyboard setShowEditModal={setShowEditModal} />}
      {showAddModal && <AddKeyboard setShowAddModal={setShowAddModal} />}
    </div>
  )
}

export default Keyboards
