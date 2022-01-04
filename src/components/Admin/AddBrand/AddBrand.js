import React, { useContext, useEffect } from 'react';
import { brandsContext } from '../../../contexts/BrandsContext';

const AddBrand = () => {
  const { brands, getBrands } = useContext(brandsContext);

  useEffect(() => {
    getBrands();
  });

  return (
    <div>
      <h2>Brands</h2>
      <button>Add brand</button>
      <div className="brands">
        {brands &&
          brands.map((brand) => (
            <div className="brand">
              <p key={brand.id}>{brand.brand}</p>
              <button>X</button>
              <button>Update</button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AddBrand;
