import React, { useContext, useEffect } from 'react';
import { keyboardsContext } from '../../../contexts/KeyboardsContext';

const AddProduct = () => {
  const { keyboards, getKeyboards } = useContext(keyboardsContext);

  useEffect(() => {
    getKeyboards();
  }, []);

  return (
    <div>
      <h2>Keyboards</h2>
      {keyboards &&
        keyboards.map((keyboard) => (
          <div className="keyboard">
            <p>{keyboard.name}</p>
          </div>
        ))}
    </div>
  );
};

export default AddProduct;
