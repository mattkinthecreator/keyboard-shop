import React, { useState } from 'react';
import AddAccessories from './AddAccessories/AddAccessories';
import Brands from './AddBrand/Brands';
import AddProduct from './AddProduct/AddProduct';

const Admin = () => {
  const [displayComp, setdisplayComp] = useState(0);

  const switchComp = () => {
    switch (displayComp) {
      case 0:
        return <Brands />;
      case 1:
        return <AddProduct />;
      case 2:
        return <AddAccessories />;
      default:
        return <Brands />;
    }
  };

  return (
    <div>
      <aside>
        <ul>
          <li onClick={() => setdisplayComp(0)}>Brands</li>
          <li onClick={() => setdisplayComp(1)}>Keyboards</li>
          <li onClick={() => setdisplayComp(2)}>Accessories</li>
        </ul>
      </aside>
      <div className="admin-container">{switchComp()}</div>
    </div>
  );
};

export default Admin;
