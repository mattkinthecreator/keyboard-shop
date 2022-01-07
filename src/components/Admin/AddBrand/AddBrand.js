<<<<<<< HEAD
import React, { useContext, useEffect } from 'react'
import { brandsContext } from '../../../contexts/BrandsContext'

const AddBrand = () => {
  const { brands, getBrands } = useContext(brandsContext)

  useEffect(() => {
    getBrands()
  })
=======
import React, { useContext, useState } from 'react';
import { brandsContext } from '../../../contexts/BrandsContext';

const AddBrand = ({ setShowAddModal }) => {
  const { addBrand } = useContext(brandsContext);

  const [brandName, setBrandName] = useState('');

  const handleAdd = () => {
    setShowAddModal(false);
    addBrand({ brand: brandName });
  };
>>>>>>> 1553ece038310437b1e82e334e2b1512fa21227a

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
