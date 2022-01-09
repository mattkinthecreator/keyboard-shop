import React, { useContext, useState } from 'react'
import { brandsContext } from '../../../contexts/BrandsContext'

const AddBrand = ({ setShowAddModal }) => {
  const { addBrand } = useContext(brandsContext)

  const [brandName, setBrandName] = useState('')

  const handleAdd = () => {
    setShowAddModal(false)
    addBrand({ brand: brandName })
  }

  return (
    <div className="modal">
      <input
        type="text"
        value={brandName}
        onChange={(e) => setBrandName(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  )
}

export default AddBrand
