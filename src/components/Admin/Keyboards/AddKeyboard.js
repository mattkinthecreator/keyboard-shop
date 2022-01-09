import React, { useContext, useState } from 'react'
import { keyboardsContext } from '../../../contexts/KeyboardsContext'
import { Select } from 'antd'
import { brandsContext } from '../../../contexts/BrandsContext'
import 'antd/dist/antd.css'

const AddKeyboard = ({ setShowAddModal }) => {
  const { addBrand } = useContext(keyboardsContext)
  const { brands } = useContext(brandsContext)
  const { Option } = Select

  const [keyboard, setKeyboard] = useState({
    name: '',
    brand: '',
    cabel: '',
    form: '',
    img: '',
    keycaps: '',
    price: 0,
    switches: [],
  })

  const handleAdd = () => {
    setShowAddModal(false)
    console.log(keyboard)
  }
  function handleChange(e) {
    setKeyboard({ ...keyboard, [e.target.name]: e.target.value })
  }

  return (
    <div className="modal">
      <input
        type="text"
        name="name"
        placeholder="Name"
        onChange={handleChange}
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        onChange={handleChange}
      />
      <input
        type="text"
        name="img"
        placeholder="Ссылка на картинку"
        onChange={handleChange}
      />
      <input
        type="textarea"
        placeholder="Описание"
        name="about"
        onChange={handleChange}
      />
      <>
        <Select
          defaultValue="Leopold"
          style={{ width: 120 }}
          onChange={handleChange}
        >
          {brands.map((brand) => (
            <Option value={brand.brand} key={brand.id}>
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
          />
          100%
        </label>
        <label>
          <input type="radio" name="form" value="75%" onChange={handleChange} />
          75%
        </label>
        <label>
          <input type="radio" name="form" value="60%" onChange={handleChange} />
          60%
        </label>
        <label>
          <input type="radio" name="form" value="40%" onChange={handleChange} />
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
          />
          USB Type-C
        </label>
        <label>
          <input
            type="radio"
            name="cabel"
            value="USB-Mini"
            onChange={handleChange}
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
          />
          ABS
        </label>
        <label>
          <input
            type="radio"
            name="keycaps"
            value="PBT"
            onChange={handleChange}
          />
          PBT
        </label>
      </div>
      <button onClick={handleAdd}>Add</button>
    </div>
  )
}

export default AddKeyboard
