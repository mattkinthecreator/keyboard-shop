import React, { useContext, useEffect, useState } from 'react'
import { brandsContext } from '../../../contexts/BrandsContext'
import AddBrand from './AddBrand'
import EditBrand from './EditBrand'

const Brands = () => {
  const [showEditModal, setShowEditModal] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)

  const { brands, getBrands, deleteBrand, handleEditBrand } =
    useContext(brandsContext)

  useEffect(() => {
    getBrands()
  }, [])

  const handleEditModal = (obj) => {
    setShowEditModal(!showEditModal)
    handleEditBrand(obj)
  }

  return (
    <div>
      <h2>Brands</h2>
      <button onClick={() => setShowAddModal(!showAddModal)}>Add brand</button>
      <div className="brands">
        {brands &&
          brands.map((brand) => (
            <div className="brand" key={brand.id}>
              <p>{brand.brand}</p>
              <button onClick={() => deleteBrand(brand.id)}>X</button>
              <button onClick={() => handleEditModal(brand)}>Update</button>
            </div>
          ))}
      </div>
      {showEditModal && <EditBrand setShowEditModal={setShowEditModal} />}
      {showAddModal && <AddBrand setShowAddModal={setShowAddModal} />}
    </div>
  )
}

export default Brands
