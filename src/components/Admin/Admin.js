import React, { useState } from 'react';
import Brands from './Brands/Brands';
import Keyboards from './Keyboards/Keyboards';

const Admin = () => {
  const [displayComp, setdisplayComp] = useState(0);

  const switchComp = () => {
    switch (displayComp) {
      case 0:
        return <Brands />;
      case 1:
        return <Keyboards />;
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
        </ul>
      </aside>
      <div className="admin-container">{switchComp()}</div>
    </div>
  );
};

export default Admin;
