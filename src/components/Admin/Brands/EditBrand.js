import React, { useContext, useState } from 'react';
import { brandsContext } from '../../../contexts/BrandsContext';

const EditBrand = ({ setShowEditModal }) => {
  const { editBrand, updateBrand } = useContext(brandsContext);

  const [brandName, setBrandName] = useState(editBrand.brand);

  const handleUpdate = () => {
    setShowEditModal(false);
    updateBrand(editBrand.id, { ...editBrand, brand: brandName });
  };

  return (
    <div className="modal">
      <input
        type="text"
        value={brandName}
        onChange={(e) => setBrandName(e.target.value)}
      />
      <button onClick={handleUpdate}>Save</button>
    </div>
  );
};

export default EditBrand;
