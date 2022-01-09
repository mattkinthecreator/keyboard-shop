import React, { useContext, useEffect, useState } from 'react';
import { keyboardsContext } from '../../../contexts/KeyboardsContext';
import AddKeyboard from './AddKeyboard';
import EditKeyboard from './EditKeyboard';

import './Keyboards.css';

const Keyboards = () => {
  const { keyboards, getKeyboards, handleEditKeyboard, deleteKeyboard } =
    useContext(keyboardsContext);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    getKeyboards();
  }, []);

  const handleEditModal = (obj) => {
    setShowEditModal(!showEditModal);
    handleEditKeyboard(obj);
  };

  return (
    <div>
      <h2>Keyboards</h2>
      <button onClick={() => setShowAddModal(!showAddModal)}>
        Add Keyboard
      </button>
      {keyboards &&
        keyboards.map((keyboard) => (
          <div className="keyboard" key={keyboard.id}>
            <img
              src={keyboard.img}
              alt={keyboard.name}
              className="keyboard__img"
            />
            <p>{keyboard.name}</p>
            <button onClick={() => handleEditModal(keyboard)}>Update</button>
            <button onClick={() => deleteKeyboard(keyboard.id)}>X</button>
          </div>
        ))}
      {showEditModal && <EditKeyboard setShowEditModal={setShowEditModal} />}
      {showAddModal && <AddKeyboard setShowAddModal={setShowAddModal} />}
    </div>
  );
};

export default Keyboards;
