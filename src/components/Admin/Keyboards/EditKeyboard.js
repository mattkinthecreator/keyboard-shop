import React, { useContext, useState } from 'react';
import { Select } from 'antd';
import { keyboardsContext } from '../../../contexts/KeyboardsContext';
import { brandsContext } from '../../../contexts/BrandsContext';

const EditKeyboard = ({ setShowEditModal }) => {
  const { updateKeyboard, editKeyboard } = useContext(keyboardsContext);
  const { brands } = useContext(brandsContext);
  const { Option } = Select;

  const [keyboard, setKeyboard] = useState(editKeyboard);

  const handleUpdate = () => {
    setShowEditModal(false);
    updateKeyboard(keyboard.id, keyboard);
  };

  function handleChange(e) {
    setKeyboard({
      ...keyboard,
      [e.target?.name ? e.target?.name : 'brand']: e.target?.value
        ? e.target?.value
        : e,
    });
  }

  return (
    <div className="modal">
      <input
        type="text"
        name="name"
        placeholder="Name"
        onChange={handleChange}
        value={keyboard.name}
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        onChange={handleChange}
        value={keyboard.price}
      />
      <input
        type="text"
        name="img"
        placeholder="Ссылка на картинку"
        onChange={handleChange}
        value={keyboard.img}
      />
      <input
        type="textarea"
        placeholder="Описание"
        name="about"
        onChange={handleChange}
        value={keyboard.about}
      />
      <>
        <Select
          defaultValue={keyboard.brand}
          style={{ width: 120 }}
          onChange={handleChange}
          name="brand">
          {brands.map((brand) => (
            <Option value={brand.brand} key={brand.id} name="brand">
              {brand.brand}
            </Option>
          ))}
        </Select>
      </>
      <div>
        <h3>Форма</h3>
        <label>
          <input
            type="radio"
            name="form"
            value="100%"
            onChange={handleChange}
            checked={keyboard.form === '100%' ? true : false}
          />
          100%
        </label>
        <label>
          <input
            type="radio"
            name="form"
            value="80%"
            onChange={handleChange}
            checked={keyboard.form === '80%' ? true : false}
          />
          80%
        </label>
        <label>
          <input
            type="radio"
            name="form"
            value="60%"
            onChange={handleChange}
            checked={keyboard.form === '60%' ? true : false}
          />
          60%
        </label>
        <label>
          <input
            type="radio"
            name="form"
            value="40%"
            onChange={handleChange}
            checked={keyboard.form === '40%' ? true : false}
          />
          40%
        </label>
      </div>
      <div>
        <h3>Кабель</h3>
        <label>
          <input
            type="radio"
            name="cabel"
            value="USB Type-C"
            onChange={handleChange}
            checked={keyboard.cabel === 'USB Type-C' ? true : false}
          />
          USB Type-C
        </label>
        <label>
          <input
            type="radio"
            name="cabel"
            value="USB-Mini"
            onChange={handleChange}
            checked={keyboard.cabel === 'USB-Mini' ? true : false}
          />
          USB-Mini
        </label>
      </div>
      <div>
        <h3>Тип клавиш</h3>
        <label>
          <input
            type="radio"
            name="keycaps"
            value="ABS"
            onChange={handleChange}
            checked={keyboard.keycaps === 'ABS' ? true : false}
          />
          ABS
        </label>
        <label>
          <input
            type="radio"
            name="keycaps"
            value="PBT"
            onChange={handleChange}
            checked={keyboard.keycaps === 'PBT' ? true : false}
          />
          PBT
        </label>
      </div>
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default EditKeyboard;
